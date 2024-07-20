import { View, StyleSheet, Text, ImageBackground, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Stack, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';

const API_URL = process.env.EXPO_PUBLIC_FOOTBALL_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY;

const MatchDetails: React.FC = () => {
    const local = useLocalSearchParams();
    const id = local.matchId;
    const [match, setMatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`${API_URL}/matches/${id}`, {
                headers: { 'X-Auth-Token': `${API_KEY}` }
            })
                .then(response => {
                    setMatch(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(`Error fetching details for match of id ${id}:`, error);
                    setError(`Error fetching details for match of id ${id}`);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={defaultStyles.container}>
                <Stack.Screen
                    options={{
                        headerBackTitle: "Back",
                        title: "Match Details", // Set the correct header title here
                    }}
                />
                <ActivityIndicator size="large" color="#FFFFFF" style={styles.loadingIndicator} />
            </SafeAreaView>
        );
    }

    if (error) {
        return <Text style={defaultStyles.heading1}>{error}</Text>;
    }

    if (!match) {
        return <Text style={defaultStyles.heading1}>Match not found!</Text>;
    }

    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;
    const referee = match.referees && match.referees[0];
    const { competition, score, utcDate, venue, stage, area } = match;

    // Render the team logo, either an SVG or an image
    const renderTeamLogo = (uri: string) => {
        const isSvg = uri.endsWith('.svg');
        if (isSvg) {
            return <SvgUri width="70" height="70" uri={uri} />;
        } else {
            return <Image source={{ uri }} style={styles.teamLogo} />;
        }
    };

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <Animated.ScrollView contentContainerStyle={styles.contentContainer}>
                    <Stack.Screen
                        options={{
                            title: `${homeTeam} vs ${awayTeam}`,
                            headerBackTitle: "Back",
                        }}
                    />
                    <View style={styles.headerContainer}>
                        {renderTeamLogo(competition.emblem)}
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.competitionName}>{competition.name}</Text>
                            <Text style={styles.stage}>{stage}</Text>
                        </View>
                        {renderTeamLogo(area.flag)}
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.date}>{new Date(utcDate).toLocaleDateString()}</Text>
                        <Text style={styles.time}>{new Date(utcDate).toLocaleTimeString()}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.teamContainer}>
                            {renderTeamLogo(homeTeam.crest)}
                            <Text style={styles.teamName}>{homeTeam.name}</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.score}>
                                {score.fullTime.home} - {score.fullTime.away}
                            </Text>
                            <Text style={styles.halfTimeScore}>
                                (Half Time: {score.halfTime.home} - {score.halfTime.away})
                            </Text>
                        </View>
                        <View style={styles.teamContainer}>
                            {renderTeamLogo(awayTeam.crest)}
                            <Text style={styles.teamName}>{awayTeam.name}</Text>
                        </View>
                    </View>
                    <Text style={styles.additionalInfo}>Venue: {venue}</Text>
                    <Text style={styles.additionalInfo}>Competition Area: {area.name}</Text>
                    <Text style={styles.additionalInfo}>
                        Referee: {referee ? `${referee.name} (${referee.nationality})` : 'Not available'}
                    </Text>
                </Animated.ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    competitionEmblem: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    competitionName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    stage: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    matchDetails: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginVertical: 20,
    },
    teamContainer: {
        alignItems: 'center',
    },
    teamLogo: {
        width: 70,
        height: 70,
    },
    teamName: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 5,
    },
    score: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scoreContainer: {
        alignItems: 'center',
    },
    halfTimeScore: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    additionalInfo: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 10,
    },
    date: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginRight: 10,
    },
    time: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MatchDetails;
