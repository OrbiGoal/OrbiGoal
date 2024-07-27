import { SafeAreaView, ImageBackground, FlatList, ActivityIndicator, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';
import PlayerCard from '@/components/PlayerCard';

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL

const Players: React.FC = () => {
  const [players, setPlayers] = useState<any>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const listRef = useRef<FlatList<Player>>(null);
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPlayers = async () => {
      try {
        // Get player data and favorited players data if user is signed in
        const [allPlayersResponse, favoritePlayersResponse] = await Promise.all([
          axios.get(`${FIREBASE_API_URL}/get-player-names`),
          isSignedIn ? axios.get(`${FIREBASE_API_URL}/api/getFavoritePlayers/${user.id}`) : Promise.resolve({ data: [] })
        ]);

        const allPlayers = allPlayersResponse.data;
        const favoritePlayers = favoritePlayersResponse.data;

        // Sort favorited players data and put favorited players data at the start of the page (if any)
        const favoritePlayerIds = new Set(favoritePlayers.map((player: Player) => player.id));
        const sortedPlayers = allPlayers.map((player: Player) => ({
          ...player,
          isFavorite: favoritePlayerIds.has(player.id),
        })).sort((a: Player, b: Player) => Number(b.isFavorite) - Number(a.isFavorite));

        setPlayers(sortedPlayers);
        setFavoritePlayers(favoritePlayers);
      } catch (error) {
        console.error('Error fetching player names or favorite players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [isSignedIn, user]);

  const filterPlayers = (players: Player[]): Player[] => {
    let filteredPlayers = players;

    if (selectedLeague && selectedLeague !== 'all') {
      filteredPlayers = filteredPlayers.filter(player => player.LeagueNation === selectedLeague);
    }

    if (searchQuery) {
      filteredPlayers = filteredPlayers.filter(player =>
        player.Player.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredPlayers;
  };

  const handlePress = (playerId: string) => { };

  const renderItem = ({ item }: { item: Player }) => (
    <Link href={`/players/${item.id.toString()}`} asChild>
      <PlayerCard player={item} favoritePlayers={favoritePlayers} onPress={() => handlePress(item.id.toString())} />
    </Link>
  );

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
        {loading ? (
          <View style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={filterPlayers(players)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={defaultStyles.searchPage}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Players;
