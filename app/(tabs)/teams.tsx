import { SafeAreaView, ImageBackground, Text, ScrollView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import { useAppContext } from '@/components/AppProvider';

const Teams = () => {
  const { team2223 } = useAppContext();

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader searchbar={"Search for teams"} subtitle={"Real Madrid · Liverpool"} />
          }}
        />
        <ScrollView style={defaultStyles.container2}>
          {team2223.map((team: any, index: number) => (
            <Text key={index} style={defaultStyles.text}>{team.Squad}</Text>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Teams;