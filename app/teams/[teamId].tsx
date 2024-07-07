import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ImageBackground, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Stat from '@/components/Stat';

const TeamDetails: React.FC = () => {
    const local = useLocalSearchParams();
    const teamId = local.teamId;
    const [teamDetails, setTeamDetails] = useState<any>([null]);
    const [allTeamDetails, setAllTeamDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [filteredDetails, setFilteredDetails] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/get-teams-detailed`)
            .then(response => {
                setAllTeamDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching all team details:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/get-team-details/${teamId}`)
            .then(response => {
                setTeamDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching details for team of id ${teamId}:`, error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedSeason !== '' && teamDetails) {
            const filtered = teamDetails.filter((detail: any) => detail.season === selectedSeason);
            setFilteredDetails(filtered);
        } else {
            setFilteredDetails(teamDetails);
        }
    }, [selectedSeason, teamDetails]);

    if (loading) {
        return <ActivityIndicator size="large" color="white" />;
    }

    if (!teamDetails || !allTeamDetails) {
        return <Text style={defaultStyles.heading1}>Error 404: Team details not found!</Text>;
    }

    const seasonItems = teamDetails.map((season: any, index: number) => ({
        label: `${season.season} season`,
        value: season.season,
    }));

    return (
        <GestureHandlerRootView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <ScrollView>
                    <Stack.Screen
                        options={{
                            title: teamDetails[0].Squad,
                            headerBackTitle: "Back",
                        }}
                    />
                    <View style={styles.headContainer}>
                        <Image source={{ uri: teamDetails[0].Logo }} style={styles.logo} />
                        <View>
                            <Text style={styles.teamHeading}>{filteredDetails[0].full_name}</Text>
                            <Text style={styles.rankHeading}>League Finish: {filteredDetails[0].LgRk}</Text>
                        </View>
                    </View>

                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedSeason(value)}
                            items={seasonItems}
                            placeholder={{ label: 'Select a season', value: null }}
                            style={{
                                inputIOS: styles.pickerInputIOS,
                                inputAndroid: styles.pickerInputAndroid,
                                placeholder: styles.pickerPlaceholder,
                            }}
                        />
                    </View>

                    <View style={styles.bodyContainer}>
                        {filteredDetails && filteredDetails.length > 0 ? (
                            <View>
                                <Stat name={"League"} value={filteredDetails[0].Country} />
                                <Stat name={"Top Scorer"} value={filteredDetails[0]["Top Team Scorer"]} />
                                <Stat name={"Goalkeeper"} value={filteredDetails[0].Goalkeeper} />
                                <Stat name={"Point Scored"} value={filteredDetails[0].Pts} />
                                <Stat name={"Record"} value={filteredDetails[0].Record} />
                                <Stat name={"xG per 90"} value={filteredDetails[0]["xG/90"]} />
                            </View>
                        ) : (
                            <Text>No details available for the selected season.</Text>
                        )}
                    </View>

                    <View style={styles.footContainer}>

                    </View>

                </ScrollView>
            </ImageBackground>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    seasonToggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    headContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
    },
    bodyContainer: {
        marginHorizontal: 30,
    },
    footContainer: {
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: 'rgba(0, 100, 255, 0.3)' // DELETE WHEN DONE
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    teamHeading: {
        ...defaultStyles.heading1,
    },
    rankHeading: {
        ...defaultStyles.heading2,
    },
    pickerInputIOS: {
        color: 'white',
        padding: 18,
        backgroundColor: '#222232',
        borderRadius: 24,
        width: 180,
        height: 55,
    },
    pickerInputAndroid: {
        color: 'white',
        padding: 18,
        backgroundColor: '#222232',
        borderRadius: 24,
        width: 180,
        height: 55,
    },
    pickerPlaceholder: {
        color: 'white',
        fontSize: 18,
    },
    pickerContainer: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 30,
    },
});

export default TeamDetails;
