import { SafeAreaView, ImageBackground, ScrollView, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';

const Players = () => {
  const [selectedLeague, setSelectedLeague] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader setSearchQuery={setSearchQuery} searchbar={"Search for players"} subtitle={"Neymar jr · Haaland"} type={"player"} setSelectedLeague={setSelectedLeague} />
          }}
        />

      </ImageBackground>
    </SafeAreaView>
  );
}

export default Players;