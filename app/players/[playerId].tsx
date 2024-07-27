import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ImageBackground, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Stat from '@/components/Stat';
import RatingHexagon from '@/components/RatingHexagon';
import SpiderChart from '@/components/SpiderChart';

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL

type Position = 'FW' | 'DF' | 'MF' | 'GK';

const positionStats: Record<Position, string[][]> = {
    // (name, column)
    'FW': [
        ['Goals/Shot', 'G/Sh'],
        ['Shots on target', 'ShotsOnTarget'],
        ['Long Shots', 'ShotsFromDist']
    ],
    'DF': [
        ['Tackles Won', 'TacklesWon'],
        ['Tackles & Interceptions', 'Tkl+Int'],
        ['Blocks', 'Blocks'],
    ],
    'MF': [
        ['Aerials Won', 'AerWon'],
        ['Touches', 'Touches'],
        ['Carries', 'Carries'],
    ],
    'GK': []
};

const getStatsForPosition = (position: Position): string[][] => {
    return positionStats[position] || [];
};

const PlayerDetails: React.FC = () => {
    const local = useLocalSearchParams();
    const playerId = local.playerId;
    const [playerDetails, setPlayerDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch individual player details
    useEffect(() => {
        setLoading(true);
        axios.get(`${FIREBASE_API_URL}/get-player-details/${playerId}`)
            .then(response => {
                setPlayerDetails(response.data[0]);
            })
            .catch(error => {
                console.error(`Error fetching details for player with id ${playerId}:`, error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [playerId]);

    if (loading) {
        return <ActivityIndicator size="large" color="white" />;
    }

    if (!playerDetails) {
        return <Text style={defaultStyles.heading1}>Error 404: Player details not found!</Text>;
    }

    const statsToDisplay = getStatsForPosition(playerDetails.generalPosition);

    const spiderChartData = {
        Dribble: playerDetails.dribbling,
        Shooting: playerDetails.shooting,
        Passing: playerDetails.passing,
        Pace: playerDetails.pace,
        Defending: playerDetails.defending,
        Physical: playerDetails.physical,
    }

    return (
        <GestureHandlerRootView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <ScrollView>
                    <Stack.Screen
                        options={{
                            title: playerDetails.Player,
                            headerBackTitle: "Back",
                        }}
                    />
                    <View style={styles.headContainer}>
                        <Image source={{ uri: playerDetails.PlayerFaceURL }} style={styles.logo} />
                        <View>
                            <Text style={styles.playerHeading}>{playerDetails.Player}</Text>
                            <Text style={styles.playerSquadInfo}>{playerDetails.SquadName}</Text>
                            <Text style={styles.playerNumber}>#{playerDetails.SquadJerseyNumber}</Text>
                        </View>
                    </View>

                    <RatingHexagon number={playerDetails.PlayerRating} />

                    <View style={styles.bodyContainer}>
                        {statsToDisplay.map((stat, index) => (
                            <Stat
                                key={index} // Provide a unique key
                                name={stat[0]}
                                value={playerDetails[stat[1]]}
                            />
                        ))}
                        <Stat name='Appearances' value={playerDetails.MP} key='appearances' />
                        <Stat name="Goals" value={playerDetails.Goals} key='goals' />
                        <Stat name='Assist' value={playerDetails.Assists} key='assists' />
                    </View>

                    <View style={styles.footContainer}>
                        <SpiderChart data={spiderChartData} />
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
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    playerHeading: {
        ...defaultStyles.heading1,
    },
    playerSquadInfo: {
        ...defaultStyles.heading2,
        color: '#91ceff',
    },
    playerNumber: {
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

export default PlayerDetails;
