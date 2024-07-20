import { SafeAreaView, ImageBackground, FlatList, ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import axios from 'axios';
import TeamCard from '@/components/TeamCard';
import { useUser } from '@clerk/clerk-expo';

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<any>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const listRef = useRef<FlatList<Team>>(null);
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${FIREBASE_API_URL}/get-team-names`)
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTeams(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching team names:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get signed in data
  useEffect(() => {
    if (isSignedIn) {
      setLoading(true);
      fetch(`${FIREBASE_API_URL}/api/getFavoriteTeams/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setFavoriteTeams(data);
        })
        .catch(error => {
          console.error('Error fetching favorite teams:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isSignedIn, user]);

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

  const handlePress = (teamId: string) => { };

  const renderItem = ({ item }: { item: Team }) => (
    <Link href={`/teams/${item.team_id.toString()}`} asChild>
      <TeamCard team={item} favoriteTeams={favoriteTeams} onPress={() => handlePress(item.team_id.toString())} />
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
        {loading ? (
          <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={filterTeams(teams)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={defaultStyles.searchPage}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Teams;
