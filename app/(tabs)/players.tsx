import { SafeAreaView, ImageBackground, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import { useAppContext } from '@/components/AppProvider';

const Players = () => {

    const { player2223 } = useAppContext();
    return (
        <SafeAreaView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <Stack.Screen
                    options={{
                        header: () => <ExploreHeader searchbar={"Search for players"} subtitle={"Neymar jr · Haaland"} />
                    }}
                />

                <ScrollView style={defaultStyles.container2}>
                    {player2223.map((player: any, index: number) => (
                        <Text key={index} style={defaultStyles.text}>{player.Player}</Text>
                    ))}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Players;