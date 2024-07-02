import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const API_URL = 'https://api.football-data.org/v4/competitions';
const API_KEY = '083c7a6bcfef42dda05c626dda61be90';

// League IDs for top 5 leagues
const TOP_5_LEAGUES = ['PL', 'PD', 'FL1', 'SA', 'BL1']; // Premier League, La Liga, Ligue 1, Serie A, Bundesliga

const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
}

const Notifications = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const currentDate = new Date();
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(currentDate.getDate() - 40);

                const dateTo = getFormattedDate(currentDate);
                const dateFrom = getFormattedDate(thirtyDaysAgo);

                const responses: any[] = [];
                for (const leagueId of TOP_5_LEAGUES) {
                    const response = await axios.get(`${API_URL}/${leagueId}/matches`, {
                        headers: { 'X-Auth-Token': API_KEY },
                        params: {
                            dateFrom,
                            dateTo,
                            status: 'FINISHED',
                        }
                    });
                    responses.push(response.data.matches);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between requests
                }

                const finishedMatches = responses.flat().reverse();  // Reverse the order of matches
                setMatches(finishedMatches);
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        };

        fetchMatches();
    }, []);

    const handlePress = (id: string) => {
        console.log(`Navigating to /notifs/${id}`);
        router.push(`/notifs/${id}`);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[defaultStyles.container, { backgroundColor: '#1C1C1C' }]}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    <ScrollView>
                        <View style={defaultStyles.container2}>
                            <Text style={[defaultStyles.heading1, { color: '#FFFFFF' }]}>Latest Game Results!</Text>
                            {matches.length > 0 ? (
                                matches.map(match => (
                                    <TouchableOpacity key={match.id} onPress={() => handlePress(match.id.toString())}>
                                        <View style={styles.card}>
                                            <View style={styles.headingContainer}>
                                                <Text style={styles.competitionName}>{match.competition.name}</Text>
                                                <Image source={{ uri: match.competition.emblem }} style={styles.competitionEmblem} />
                                            </View>
                                            <View style={styles.matchContainer}>
                                                <Text style={styles.matchDetails}>{match.homeTeam.name} vs {match.awayTeam.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                                                <Image source={{ uri: match.homeTeam.crest }} style={styles.teamLogo} />
                                                <Text style={styles.score}>
                                                    Score: {match.score && match.score.fullTime && typeof match.score.fullTime.home !== 'undefined' && typeof match.score.fullTime.away !== 'undefined' ? 
                                                            `${match.score.fullTime.home} - ${match.score.fullTime.away}` : 'N/A'}
                                                </Text>
                                                <Image source={{ uri: match.awayTeam.crest }} style={styles.teamLogo} />
                                            </View>
                                            <Text style={styles.date}>Date: {new Date(match.utcDate).toLocaleString()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={[defaultStyles.heading1, { color: '#FFFFFF' }]}>No match results available</Text>
                            )}
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
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
    }
});

export default Notifications;
