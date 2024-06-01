import { SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';

const Teams = () => {

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader searchbar={"Search for teams"} subtitle={"Real Madrid · Liverpool"} />
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Teams;