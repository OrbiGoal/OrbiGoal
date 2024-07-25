import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SvgUri } from 'react-native-svg';

const API_URL = process.env.EXPO_PUBLIC_FOOTBALL_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY;

const TOP_5_LEAGUES = ['PL', 'PD', 'FL1', 'SA', 'BL1'];
const TOP_CLUBS = [
    'Manchester City Football Club', 'Manchester United Football Club', 'Arsenal Football Club',
    'Liverpool Football Club', 'Chelsea Football Club', 'Tottenham Hotspur Football Club',
    'Paris Saint-Germain Football Club', 'Olympique de Marseille', 'Lille Olympique Sporting Club Lille Métropole',
    'FC Bayern München', 'Borussia Dortmund', 'RasenBallsport Leipzig',
    'Juventus Football Club', 'Football Club Internazionale Milano S.p.A.', 'Associazione Calcio Milan',
    'Real Madrid Club de Fútbol', 'Futbol Club Barcelona', 'Club Atlético de Madrid S.A.D.'
];

const TOP_CLUBS_ALTERNATE_NAMES = {
    'Arsenal FC': 'Arsenal Football Club',
    'Chelsea FC': 'Chelsea Football Club',
    'Liverpool FC': 'Liverpool Football Club',
    'Manchester City FC': 'Manchester City Football Club',
    'Manchester United FC': 'Manchester United Football Club',
    'Tottenham Hotspur FC': 'Tottenham Hotspur Football Club',
    'Paris Saint-Germain FC': 'Paris Saint-Germain Football Club',
    'Olympique de Marseille': 'Olympique de Marseille',
    'Lille OSC': 'Lille Olympique Sporting Club Lille Métropole',
    'FC Bayern München': 'FC Bayern München',
    'Borussia Dortmund': 'Borussia Dortmund',
    'RB Leipzig': 'RasenBallsport Leipzig',
    'Juventus FC': 'Juventus Football Club',
    'AC Milan': 'Associazione Calcio Milan',
    'FC Internazionale Milano': 'Football Club Internazionale Milano S.p.A.',
    'Real Madrid CF': 'Real Madrid Club de Fútbol',
    'FC Barcelona': 'Futbol Club Barcelona',
    'Club Atlético de Madrid': 'Club Atlético de Madrid S.A.D.'
};

const TOP_CLUBS_ALTERNATE_NAMES_INVERTED = {
    'Arsenal Football Club': 'Arsenal FC',
    'Chelsea Football Club': 'Chelsea FC',
    'Liverpool Football Club': 'Liverpool FC',
    'Manchester City Football Club': 'Manchester City FC',
    'Manchester United Football Club': 'Manchester United FC',
    'Tottenham Hotspur Football Club': 'Tottenham Hotspur FC',
    'Paris Saint-Germain Football Club': 'Paris Saint-Germain FC',
    'Olympique de Marseille': 'Olympique de Marseille',
    'Lille Olympique Sporting Club Lille Métropole': 'Lille OSC',
    'FC Bayern München': 'FC Bayern München',
    'Borussia Dortmund': 'Borussia Dortmund',
    'RasenBallsport Leipzig': 'RB Leipzig',
    'Juventus Football Club': 'Juventus FC',
    'Associazione Calcio Milan': 'AC Milan',
    'Football Club Internazionale Milano S.p.A.': 'FC Internazionale Milano',
    'Real Madrid Club de Fútbol': 'Real Madrid CF',
    'Futbol Club Barcelona': 'FC Barcelona',
    'Club Atlético de Madrid S.A.D.': 'Club Atlético de Madrid'
};

// Getting alternate names for the clubs since data is stored in the JSON file with the full club names
const getAlternateName = (clubName: string): string => {
    return TOP_CLUBS_ALTERNATE_NAMES[clubName as keyof typeof TOP_CLUBS_ALTERNATE_NAMES];
};

const getFormattedDate = (date: Date) => {
    return date.toISOString().split('T')[0];
};

const loadJSONData = () => {
    try {
        const data = require('../../assets/processed_data/processed_top_clubs_data.json');
        return data;
    } catch (error) {
        console.error('Error loading JSON data:', error);
        return [];
    }
};

const loadModels = async () => {
    try {
        await tf.ready();

        // Load the models from the assets folder
        const modelHomeJson = require('../../assets/models/home/model.json');
        const modelHomeWeights = require('../../assets/models/home/group1-shard1of1.bin');
        const modelAwayJson = require('../../assets/models/away/model.json');
        const modelAwayWeights = require('../../assets/models/away/group1-shard1of1.bin');
        
        // Load the models
        const modelHome = await tf.loadLayersModel(bundleResourceIO(modelHomeJson, modelHomeWeights));
        const modelAway = await tf.loadLayersModel(bundleResourceIO(modelAwayJson, modelAwayWeights));

        return { modelHome, modelAway };
    } catch (error : any) {
        console.error('Error loading models:', error.message);
        console.error('Stack trace:', error.stack);
        throw error; // Re-throw the error after logging it
    }
};

const loadScalerParameters = () => {
    try {
        // Load the scaler parameters from the assets folder
        const scalerParameters = require('../../assets/models/scaler_params.json');
        return scalerParameters;
    } catch (error) {
        console.error("Error loading scaler parameters: ", error);
        return null;
    }
};

const calculateAverages = (data: any[]): number[] => {
    // Keys to calculate averages for, matching the model input shape
    const keys = [
        'home_club_goals', 'away_club_goals', 'home_club_position', 'away_club_position',
        'home_club_id', 'away_club_id', 'home_n_goals', 'home_n_assists', 'home_n_yellow_cards',
        'home_n_red_cards', 'home_n_minutes_played', 'away_n_goals', 'away_n_assists',
        'away_n_yellow_cards', 'away_n_red_cards', 'away_n_minutes_played'
    ];

    // Calculate the averages for each key
    const averages = keys.map(key => data.reduce((sum, match) => sum + (match[key] || 0), 0) / data.length);
    return averages;
};

const transformData = (data: number[][], means: number[], stds: number[]): number[][] => {
    // Normalize the data
    return data.map((row, index) => {
        return row.map((value, colIndex) => {
            return (value - means[colIndex]) / stds[colIndex];
        });
    });
};

const fetchAndPredict = async (homeTeam: string, awayTeam: string, jsonData: any[],
    models: { modelHome: tf.LayersModel, modelAway: tf.LayersModel }) => {
    // Get the last 5 encounters between the two teams
    const homeEncounters = jsonData.filter(row => row.home_club_name === homeTeam && row.away_club_name === awayTeam).slice(0, 5);
    const awayEncounters = jsonData.filter(row => row.home_club_name === awayTeam && row.away_club_name === homeTeam).slice(0, 5);

    // Calculate the averages for the encounters
    const homeAverages = calculateAverages(homeEncounters);
    const awayAverages = calculateAverages(awayEncounters);

    // Load the scaler parameters
    const scalerParameters = await loadScalerParameters();
    if (scalerParameters) {
        const { means, stds } = scalerParameters;

        // Transform the data using the scaler parameters
        const transformedHomeAverages = transformData([homeAverages], means, stds);
        const transformedAwayAverages = transformData([awayAverages], means, stds);

        // Predict the scores
        const homePredictionTensor = models.modelHome.predict(tf.tensor2d(transformedHomeAverages)) as tf.Tensor;
        const awayPredictionTensor = models.modelAway.predict(tf.tensor2d(transformedAwayAverages)) as tf.Tensor;

        // Get the predicted scores
        const homeScore = homePredictionTensor.dataSync()[0];
        const awayScore = awayPredictionTensor.dataSync()[0];

        return `${Math.round(homeScore)} - ${Math.round(awayScore)}`;
    } else {
        return 'Error loading scaler parameters';
    }
};

const Predictions = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const [predictedScores, setPredictedScores] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedHomeTeam, setSelectedHomeTeam] = useState<string | null>(null);
    const [selectedAwayTeam, setSelectedAwayTeam] = useState<string | null>(null);
    const navigation = useNavigation();
    const [jsonData, setJSONData] = useState<any[]>([]);
    const [models, setModels] = useState<{ modelHome: any, modelAway: any }>({ modelHome: null, modelAway: null });

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Get the current date and the date 90 days/3 months later
                const currentDate = new Date();
                const ninetyDaysLater = new Date();
                ninetyDaysLater.setDate(currentDate.getDate() + 90);

                // Get the formatted dates
                const dateTo = getFormattedDate(ninetyDaysLater);
                const dateFrom = getFormattedDate(currentDate);

                // Fetch the matches for the top 5 leagues
                const responses: any[] = [];
                for (const leagueId of TOP_5_LEAGUES) {
                    const response = await axios.get(`${API_URL}/competitions/${leagueId}/matches`, {
                        headers: { 'X-Auth-Token': API_KEY },
                        params: {
                            dateFrom,
                            dateTo,
                            status: 'SCHEDULED',
                        }
                    });
                    responses.push(response.data.matches);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between requests
                }
                
                // Flatten the responses and sort the matches by date in chronological order
                const scheduledMatches = responses.flat().sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

                // Filter the matches to only include top clubs
                const filteredMatches = scheduledMatches.filter(match => {
                    const homeTeamName = match.homeTeam.name;
                    const awayTeamName = match.awayTeam.name;
                    const convertedHomeTeamName = getAlternateName(homeTeamName);
                    const convertedAwayTeamName = getAlternateName(awayTeamName);

                    return (TOP_CLUBS.includes(homeTeamName) || TOP_CLUBS.includes(convertedHomeTeamName)) &&
                        (TOP_CLUBS.includes(awayTeamName) || TOP_CLUBS.includes(convertedAwayTeamName));
                });
                setMatches(filteredMatches);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching match data:', error);
                setError('Error fetching match data');
                setLoading(false);
            }
        };

        const loadData = async () => {
            try {
                const data = loadJSONData();
                setJSONData(data);
            } catch (error) {
                console.error('Error loading JSON data:', error);
            }
        };
        
        const loadModel = async () => {
            try {
                const loadedModels = await loadModels();
                setModels(loadedModels);
            } catch (error) {
                console.error('Error loading models:', error);
            }
        };
        
        fetchMatches();
        loadData();
        loadModel();
        }, []);
        
        const handlePrediction = async (homeTeam: string, awayTeam: string) => {
            if (jsonData.length > 0 && models.modelHome && models.modelAway) {
                const predictedScore = await fetchAndPredict(homeTeam, awayTeam, jsonData, models);
                setPredictedScores({
                    ...predictedScores,
                    [`${homeTeam}-${awayTeam}`]: predictedScore
                });
            }
        };
        
        const renderHeaderTitle = () => {
            return <Text style={styles.headerTitle}>Predictions</Text>;
        };
        
        useEffect(() => {
            navigation.setOptions({
                headerTitle: renderHeaderTitle,
                headerStyle: styles.header,
            });
        }, [navigation]);
        
        if (error) {
            return (
                <View style={styles.centeredContainer}>
                    <Text style={[defaultStyles.heading1, { color: '#FFFFFF' }]}>{`Error: ${error}`}</Text>
                </View>
            );
        }
        
        const teams = Object.values(TOP_CLUBS_ALTERNATE_NAMES).map(team => ({ label: team, value: team }));

        // Render the team logo, either an SVG or an image
        const renderTeamLogo = (uri: string) => {
            const isSvg = uri.endsWith('.svg');
            if (isSvg) {
                return <SvgUri width="50" height="50" uri={uri} />;
            } else {
                return <Image source={{ uri }} style={styles.teamLogo} />;
            }
        };
        
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={[defaultStyles.container, { backgroundColor: '#1C1C1C' }]}>
                    <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#FFFFFF" style={styles.loadingIndicator} />
                        ) : error ? (
                            <View style={styles.centeredContainer}>
                                <Text style={[defaultStyles.heading1, { color: '#FFFFFF' }]}>{`${error}`}</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                <View style={defaultStyles.container2}>
                                    <Text style={[defaultStyles.heading1, { color: '#FFFFFF' }]}>Upcoming Match Predictions!</Text>
        
                                    <View style={styles.pickerContainer}>
                                        <View style={styles.picker}>
                                            <Text style={{ color: '#FFFFFF', marginBottom: 5 }}>Home</Text>
                                            <RNPickerSelect
                                                onValueChange={(value) => setSelectedHomeTeam(value)}
                                                items={teams}
                                                placeholder={{ label: 'Select Home Team', value: null }}
                                                style={pickerSelectStyles}
                                            />
                                        </View>
                                        <View style={styles.picker}>
                                            <Text style={{ color: '#FFFFFF', marginBottom: 5, marginTop: 15 }}>Away</Text>
                                            <RNPickerSelect
                                                onValueChange={(value) => setSelectedAwayTeam(value)}
                                                items={teams}
                                                placeholder={{ label: 'Select Away Team', value: null }}
                                                style={pickerSelectStyles}
                                            />
                                        </View>
                                    </View>
        
                                    {selectedHomeTeam && selectedAwayTeam && (
                                        <>
                                            {selectedHomeTeam === selectedAwayTeam ? (
                                                Alert.alert("Invalid Selection", "A team cannot play against itself!")
                                            ) : (
                                                matches.filter(match => 
                                                    (getAlternateName(match.homeTeam.name) === selectedHomeTeam || match.homeTeam.name === selectedHomeTeam) &&
                                                    (getAlternateName(match.awayTeam.name) === selectedAwayTeam || match.awayTeam.name === selectedAwayTeam)
                                                ).length === 0 ? (
                                                    Alert.alert("Match Not Found", "The match is not in the next 3 months")
                                                ) : (
                                                    matches.filter(match => 
                                                        (getAlternateName(match.homeTeam.name) === selectedHomeTeam || match.homeTeam.name === selectedHomeTeam) &&
                                                        (getAlternateName(match.awayTeam.name) === selectedAwayTeam || match.awayTeam.name === selectedAwayTeam)
                                                    ).map(match => (
                                                        <TouchableOpacity key={match.id} onPress={() => handlePrediction(selectedHomeTeam, selectedAwayTeam)}>
                                                            <View style={styles.card}>
                                                                <View style={styles.headingContainer}>
                                                                    <Text style={styles.competitionName}>{match.competition.name}</Text>
                                                                    <Image source={{ uri: match.competition.emblem }} style={styles.competitionEmblem} />
                                                                </View>
                                                                <View style={styles.matchContainer}>
                                                                    <Text style={styles.matchDetails}>{match.homeTeam.name} vs {match.awayTeam.name}</Text>
                                                                </View>
                                                                <View style={styles.logoContainer}>
                                                                    {renderTeamLogo(match.homeTeam.crest)}
                                                                    <Text style={styles.score}>
                                                                        {predictedScores[`${selectedHomeTeam}-${selectedAwayTeam}`] ? 
                                                                            `Predicted Score: ${predictedScores[`${selectedHomeTeam}-${selectedAwayTeam}`]}` : 
                                                                            `Click to predict`}
                                                                    </Text>
                                                                    {renderTeamLogo(match.awayTeam.crest)}
                                                                </View>
                                                                <Text style={styles.date}>Date: {new Date(match.utcDate).toLocaleString()}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))
                                                )
                                            )}
                                        </>
                                    )}
                                </View>
                            </ScrollView>
                        )}
                    </ImageBackground>
                </SafeAreaView>
            </GestureHandlerRootView>
        );
};        
        
const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222232',
    },
    header: {
        backgroundColor: '#222232',
    },
    headerTitle: {
        fontFamily: 'pop-bold',
        fontSize: 20,
        color: 'white',
    },
    pickerContainer: {
        marginBottom: 20,
    },
    picker: {
        flex: 1,
        marginHorizontal: 5,
    },
    drawerLabel: {
        fontFamily: 'pop-sb',
    },
    icon: {
        marginLeft: 15,
    },
    card: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#333333',
        borderRadius: 10,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    competitionName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginRight: 5,
    },
    competitionEmblem: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    matchDetails: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    teamLogo: {
        width: 50,
        height: 50,
    },
    score: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    date: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
        
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 24,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#222232',
        width: 320,
        height: 45,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'white',
        padding: 18,
        borderWidth: 1,
        paddingRight: 30,
        backgroundColor: '#222232',
        borderRadius: 24,
        width: 320,
        height: 45,
    },
    placeholder: {
        color: 'white',
        fontSize: 18,
    },
});

export default Predictions;
