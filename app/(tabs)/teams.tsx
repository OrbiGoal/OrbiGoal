import { SafeAreaView, ImageBackground, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import axios from 'axios';
import TeamCard from '@/components/TeamCard';
import { useUser } from '@clerk/clerk-expo';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<any>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const listRef = useRef<FlatList<Team>>(null);
  const user = useUser();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get-team-names')
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTeams(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching team names:', error);
      });
  }, []);

  const filterTeams = (teams: Team[]): Team[] => {
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

  const handlePress = (teamId: string) => {
    // TODO: Navigation logic
  };

  const renderItem = ({ item }: { item: Team }) => (
    <Link href={`/teams/${item.team_id.toString()}`} asChild>
      <TeamCard team={item} onPress={() => handlePress(item.team_id.toString())} />
    </Link>
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
        <Stack.Screen
          options={{
            header: () =>
              <ExploreHeader
                searchbar={"Search for teams"}
                subtitle={"Real Madrid · Liverpool"}
                type={"team"}
                setSelectedLeague={setSelectedLeague}
                setSearchQuery={setSearchQuery}
              />
          }}
        />
        <FlatList
          ref={listRef}
          data={filterTeams(teams)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={defaultStyles.searchPage}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Teams;
