import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import Matches from '@/components/Matches';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';

const Index = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    header: () => <HomeHeader />,
                }}
            />

            <View style={styles.body}>
                <SignedIn>
                    <Text style={styles.heading1}>Welcome!</Text>
                    <Matches />
                </SignedIn>

                <SignedOut>
                    <Text style={styles.text}>You are signed out.</Text>
                    <Link href={'/(modals)/login'}>
                        <Text>Log in</Text>
                    </Link>
                </SignedOut>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181928',
    },
    body: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 10,
    },
    heading1: {
        color: 'white',
        fontFamily: 'pop-black',
        fontSize: 24,
        textAlign: 'left',
    },
    text: {
        color: 'white',
        fontFamily: 'pop-med',
    },
});

export default Index
