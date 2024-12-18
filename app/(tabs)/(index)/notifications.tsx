import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, SafeAreaView, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import NotificationCard from '@/components/NotificationCard';

const API_URL = process.env.EXPO_PUBLIC_FOOTBALL_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY;

const TOP_5_LEAGUES = [
    { label: 'Premier League', value: 'PL' },
    { label: 'La Liga', value: 'PD' },
    { label: 'Ligue 1', value: 'FL1' },
    { label: 'Serie A', value: 'SA' },
    { label: 'Bundesliga', value: 'BL1' }
];

const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
}

const Notifications = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
    const [previousLeague, setPreviousLeague] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            try {
                const currentDate = new Date();
                const ninetyDaysAgo = new Date();
                ninetyDaysAgo.setDate(currentDate.getDate() - 90);

                const dateTo = getFormattedDate(currentDate);
                const dateFrom = getFormattedDate(ninetyDaysAgo);

                const responses: any[] = [];

                if (selectedLeague) {
                    const response = await axios.get(`${API_URL}/competitions/${selectedLeague}/matches`, {
                        headers: { 'X-Auth-Token': API_KEY },
                        params: {
                            dateFrom,
                            dateTo,
                            status: 'FINISHED',
                        }
                    });
                    responses.push(response.data.matches);
                } else {
                    for (const league of TOP_5_LEAGUES) {
                        const response = await axios.get(`${API_URL}/competitions/${league.value}/matches`, {
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
                }

                const finishedMatches = responses.flat().sort((a: any, b: any) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());  // Sort matches by date
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
    }, [selectedLeague]);

    const handleLeagueChange = (value: string | null) => {
        if (value === null) {
            setSelectedLeague(previousLeague); // Revert to the previous league if "Select League" is chosen
        } else {
            setPreviousLeague(selectedLeague);
            setSelectedLeague(value);
        }
    };

    const handlePress = (id: string) => {
        router.push(`/notifs/${id}`);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[defaultStyles.container, { backgroundColor: '#1C1C1C' }]}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect 
                            onValueChange={handleLeagueChange}
                            items={TOP_5_LEAGUES}
                            placeholder={{ label: 'Select League', value: previousLeague }}
                            style={pickerSelectStyles}
                            value={selectedLeague}
                        />
                    </View>
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
    pickerContainer: {
        margin: 10,
        paddingTop: 10,
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
        width: 370,
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
        width: 370,
        height: 45,
    },
    placeholder: {
        color: 'white',
        fontSize: 18,
    },
});

export default Notifications;