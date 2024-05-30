import { SafeAreaView, ImageBackground, ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { defaultStyles } from '@/constants/Styles';
import { fetchData } from '@/hooks/firebaseConfig';

const Players = () => {
    const collection2122 = "Kaggle Football Player Stats 2021-2022";
    const [data2122, setData] = useState<any[]>([]);
    useEffect(() => {
        const fetchDataFromFirestore = async () => {
            const fetchedData = await fetchData(collection2122);
            setData(fetchedData);
        };
        fetchDataFromFirestore();
    }, []);

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <Stack.Screen
                    options={{
                        header: () => <ExploreHeader searchbar={"Search for players"} subtitle={"Neymar jr · Haaland"} />
                    }}
                />

                <ScrollView style={defaultStyles.container2}>
                    {data2122.map((player, index) => (
                        <Text key={index} style={defaultStyles.text}>{player.Player}</Text>
                    ))}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Players;