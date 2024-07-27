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
    const fetchTeams = async () => {
      try {
        // Get team data and favorited teams data if user is signed in
        const [allTeamsResponse, favoriteTeamsResponse] = await Promise.all([
          axios.get(`${FIREBASE_API_URL}/get-team-names`),
          isSignedIn ? axios.get(`${FIREBASE_API_URL}/api/getFavoriteTeams/${user.id}`) : Promise.resolve({ data: [] })
        ]);

        const allTeams = allTeamsResponse.data;
        const favoriteTeams = favoriteTeamsResponse.data;

        // Sort favorited teams data and put favorited teams data at the start of the page (if any)
        const favoriteTeamIds = new Set(favoriteTeams.map((team: Team) => team.team_id));
        const sortedTeams = allTeams.map((team: Team) => ({
          ...team,
          isFavorite: favoriteTeamIds.has(team.team_id),
        })).sort((a: Team, b: Team) => Number(b.isFavorite) - Number(a.isFavorite));

        setTeams(sortedTeams);
        setFavoriteTeams(favoriteTeams);
      } catch (error) {
        console.error('Error fetching team names or favorite teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
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
