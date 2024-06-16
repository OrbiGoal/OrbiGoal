import { SafeAreaView, ImageBackground, Text, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import { useAppContext } from '@/components/AppProvider';
import axios from 'axios';

const Teams = () => {
  // const { team2223 } = useAppContext(); // Previous method of using AppContext
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/get-teams-2223')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader searchbar={"Search for teams"} subtitle={"Real Madrid · Liverpool"} />
          }}
        />
        <ScrollView style={defaultStyles.container2}>
          {teams.map((team, index) => (
            <Text style={defaultStyles.text} key={index}>{team.Squad}</Text>
          ))}

          {/* For bottom border */}
          <View style={{ height: 40 }}></View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Teams;