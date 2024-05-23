import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import Matches from '@/components/Matches';

const Index = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => <HomeHeader />,
                }}
            />

            <Matches />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181928',
    },
    heading1: {
        color: 'white',
        fontFamily: 'pop-black',
        fontSize: 24,
        textAlign: 'left',
    },
    text: {
        color: 'white',
    },
});

export default Index
