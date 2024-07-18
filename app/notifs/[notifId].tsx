import { View, StyleSheet, Text, ImageBackground, SafeAreaView, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const NotificationDetails: React.FC = () => {
    const local = useLocalSearchParams();
    const id = local.notifId;
    const [notification, setNotification] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://api.football-data.org/v4/matches/${id}`, {
                headers: { 'X-Auth-Token': '083c7a6bcfef42dda05c626dda61be90' }
            })
                .then(response => {
                    setNotification(response.data);
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
        return <Text style={defaultStyles.heading1}>Loading...</Text>;
    }

    if (error) {
        return <Text style={defaultStyles.heading1}>{error}</Text>;
    }

    if (!notification) {
        return <Text style={defaultStyles.heading1}>Notification not found!</Text>;
    }

    const match = notification;
    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <Animated.ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Image source={{ uri: match.competition.emblem }} style={styles.competitionEmblem} />
                        <Text style={styles.competitionName}>{match.competition.name}</Text>
                    </View>
                    <View style={styles.matchContainer}>
                        <Text style={styles.matchDetails}>{homeTeam.name} vs {awayTeam.name}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Image source={{ uri: homeTeam.crest }} style={styles.teamLogo} />
                        <Text style={styles.score}>
                            Score: {match.score.fullTime.home} - {match.score.fullTime.away}
                        </Text>
                        <Image source={{ uri: awayTeam.crest }} style={styles.teamLogo} />
                    </View>
                    <Text style={styles.date}>Date: {new Date(match.utcDate).toLocaleString()}</Text>
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
        width: '100%',
        marginVertical: 20,
    },
    teamLogo: {
        width: 70,
        height: 70,
    },
    score: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    statText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    penalties: {
        fontSize: 20,
        color: '#FFFF00',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    date: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 10,
    }
});

export default NotificationDetails;
