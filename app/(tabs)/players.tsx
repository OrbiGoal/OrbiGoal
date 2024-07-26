import { SafeAreaView, ImageBackground, FlatList, ActivityIndicator, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';
import PlayerCard from '@/components/PlayerCard';

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL
const LOCAL_URL = process.env.EXPO_PUBLIC_LOCAL_FIREBASE

const Players: React.FC = () => {
  const [players, setPlayers] = useState<any>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const listRef = useRef<FlatList<Player>>(null);
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  // Get player data from data base
  useEffect(() => {
    setLoading(true);
    axios.get(`${LOCAL_URL}/get-player-names`)
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPlayers(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching player names:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // TODO: Get signed in data for favorited players
  // useEffect(() => {
  //   if (isSignedIn) {
  //     setLoading(true);
  //     fetch(`${FIREBASE_API_URL}/api/getFavoritePlayers/${user.id}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setFavoritePlayers(data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching favorite teams:', error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, [isSignedIn, user]);

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
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={defaultStyles.searchPage}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Players;
