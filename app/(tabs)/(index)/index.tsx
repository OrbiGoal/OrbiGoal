import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Matches from '@/components/Matches';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import HomeHeader from '@/components/HomeHeader';

const Index = () => {
    const { signOut, isSignedIn } = useAuth();
    <Button title='Log out' onPress={() => signOut()} />
    const router = useRouter();
    const handleLogin = () => {
        router.push('/(modals)/login');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <SignedIn>
                            <Text style={styles.heading1}>Welcome!</Text>
                            <Matches />
                        </SignedIn>

                        <SignedOut>
                            <Text style={[styles.heading1, { paddingTop: 10 }]}>You are signed out.</Text>
                            {!isSignedIn && (
                                <Button title="Log in" onPress={() => handleLogin()} />
                            )}
                        </SignedOut>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
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
