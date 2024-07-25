import { View, Text, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import axios from 'axios';
import { Link, router } from 'expo-router';
import MatchCard from '@/components/MatchCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface MatchProps {
    favoriteTeams: FavoriteTeam[];
}

const API_URL = process.env.EXPO_PUBLIC_FOOTBALL_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY;

const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const Matches = ({ favoriteTeams }: MatchProps) => {
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);  // Add a state variable to track if data is loaded
    const listRef = useRef<FlatList<Match>>(null);

    useEffect(() => {
        const fetchUpcomingMatches = async () => {
            setLoading(true);
            try {
                const currentDate = new Date();
                const dateTo = getFormattedDate(currentDate);
                const dateFrom = getFormattedDate(new Date(currentDate.setDate(currentDate.getDate() + 30)));

                const responses: any[] = [];
                const leagueIds = [...new Set(favoriteTeams.map(team => team.apiLeague))];

                for (const leagueId of leagueIds) {
                    const response = await axios.get(`${API_URL}/competitions/${leagueId}/matches`, {
                        headers: { 'X-Auth-Token': API_KEY },
                        params: {
                            status: 'SCHEDULED',
                        },
                    });
                    responses.push(response.data.matches);
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limit
                }
                const upcomingMatchesData = responses.flat().sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()).slice(0, 8);
                setUpcomingMatches(upcomingMatchesData);
            } catch (error) {
                console.error('Error fetching upcoming match data:', error);
            } finally {
                setLoading(false);
                setDataLoaded(true);  // Set dataLoaded to true once the data fetching is complete
            }
        };

        fetchUpcomingMatches();
    }, [favoriteTeams]);

    const handlePress = (id: string) => {
        router.push(`/matches/${id}`);
    };

    const renderItem = ({ item }: { item: Match }) => (
        <Link href={`/matches/${item.id.toString()}`} asChild>
            <MatchCard match={item} onPress={() => handlePress(item.id.toString())} />
        </Link>
    );

    // Show loading indicator while fetching data
    if (loading) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ActivityIndicator size="large" color="white" style={{ padding: 10 }} />
            </GestureHandlerRootView>
        );
    }

    // Show "No upcoming matches" if data is loaded and there are no upcoming matches
    if (dataLoaded && !upcomingMatches.length) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Text style={[defaultStyles.heading2, { paddingHorizontal: 30 }]}>No upcoming matches</Text>
            </GestureHandlerRootView>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Text style={[defaultStyles.heading2, { paddingHorizontal: 30 }]}>Upcoming Matches</Text>
            <View style={{ height: 10 }}></View>
            <FlatList
                data={upcomingMatches}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={defaultStyles.container2}
                ref={listRef}
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    teamContainer: {
        marginVertical: 8,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    teamName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    teamLeague: {
        fontSize: 16,
        color: '#666',
    },
});

export default Matches;
