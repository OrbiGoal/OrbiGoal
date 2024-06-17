import { SafeAreaView, ImageBackground, FlatList, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import axios from 'axios';
import TeamCard from '@/components/TeamCard';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
  const listRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get-team-names')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredTeams = selectedLeague != 'all'
    ? teams.filter(team => team.Country === selectedLeague)
    : teams;

  const renderItem = ({ item }: { item: Team }) => (
    <TeamCard team={item} />
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader searchbar={"Search for teams"} subtitle={"Real Madrid · Liverpool"} type={"team"} setSelectedLeague={setSelectedLeague} />
          }}
        />
        <FlatList
          ref={listRef}
          data={filteredTeams}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={defaultStyles.container2}
          ListFooterComponent={<View style={{ height: 40 }} />}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Teams;
