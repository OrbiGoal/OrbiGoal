import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, ImageBackground, SafeAreaView, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import NotificationCard from '@/components/NotificationCard';

const API_URL = process.env.EXPO_PUBLIC_FOOTBALL_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY;

// League IDs for top 5 leagues
const TOP_5_LEAGUES = ['PL', 'PD', 'FL1', 'SA', 'BL1']; // Premier League, La Liga, Ligue 1, Serie A, Bundesliga

const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
}

const Notifications = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
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
                    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between requests to prevent error 429
                }

                const finishedMatches = responses.flat().reverse();  // Reverse the order of matches
                setMatches(finishedMatches);
            } catch (error) {
                console.error('Error fetching match data:', error);

                if (axios.isAxiosError(error)) {
                    console.error('Axios Error:', error.message);
                    if (error.response) {
                        console.error('Response Data:', error.response.data);
                        console.error('Response Status:', error.response.status);
                        console.error('Response Headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Request made but no response received:', error.request);
                    } else {
                        console.error('Error setting up the request:', error.message);
                    }
                } else {
                    console.error('Unexpected Error:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handlePress = (id: string) => {
        router.push(`/notifs/${id}`);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[defaultStyles.container, { backgroundColor: '#1C1C1C' }]}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loadingIndicator} />
                    ) : (
                        <FlatList
                            data={matches}
                            renderItem={({ item }) => <NotificationCard notification={item} onPress={handlePress} />}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={defaultStyles.container2}
                        />
                    )}
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
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Notifications;
