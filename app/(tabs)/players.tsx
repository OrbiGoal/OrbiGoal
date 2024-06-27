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

    const filterPlayers = (teams: Team[]) => {
        let filteredTeams = teams;
    
        if (selectedLeague && selectedLeague !== 'all') {
          filteredTeams = filteredTeams.filter(team => team.Country === selectedLeague);
        }
    
        if (searchQuery) {
          filteredTeams = filteredTeams.filter(team =>
            team.full_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        return filteredTeams;
      };
    
    const renderItem = ({ item }: { item: Team }) => (
    <TeamCard team={item} />
    );

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

    return (
        <SafeAreaView style={defaultStyles.container}>
          <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
            <Stack.Screen
              options={{
                header: () =>
                  <ExploreHeader
                    searchbar={"Search for players"}
                    subtitle={"Neymar jr · Haaland"} 
                    type={"player"} 
                    setSelectedLeague={setSelectedLeague}
                    setSearchQuery={setSearchQuery}
                  />
              }}
            />
            <FlatList
              ref={listRef}
              data={filteredPlayers(teams)}
              renderItem={({ item }) => <TeamCard team={item} />}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={defaultStyles.searchPage}
            />
          </ImageBackground>
        </SafeAreaView>
      );
}

export default Players;