import { SafeAreaView, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';

const Players = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader searchbar={"Search for players"} subtitle={"Neymar jr · Haaland"} />
                }}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181928',
    }
});

export default Players;