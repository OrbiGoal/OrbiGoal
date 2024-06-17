import { SafeAreaView, ImageBackground, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import { useAppContext } from '@/components/AppProvider';
import axios from 'axios';

const Players = () => {
    // const { player2223 } = useAppContext(); // Previous method of using AppContext
    const [teams, setTeams] = useState<any[]>([]);
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get-player-names')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredTeams = selectedLeague
        ? teams.filter(team => team.Country === selectedLeague)
        : teams;

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <Stack.Screen
                    options={{
                        header: () => <ExploreHeader searchbar={"Search for players"} subtitle={"Neymar jr · Haaland"} type={"player"} setSelectedLeague={setSelectedLeague} />
                    }}
                />

                <ScrollView style={defaultStyles.container2}>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Players;