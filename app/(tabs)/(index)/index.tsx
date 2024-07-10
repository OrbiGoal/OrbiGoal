import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View, Text, Button, SafeAreaView, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Matches from '@/components/Matches';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { getClerkInstance } from '@clerk/clerk-expo/dist/singleton';

const Index = () => {
    const { signOut, isSignedIn } = useAuth();
    const router = useRouter();
    const clerk = getClerkInstance();

    const handleLogin = () => {
        router.push('/(modals)/login');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={defaultStyles.container}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    <ScrollView>
                        <View style={defaultStyles.container2}>
                            <SignedIn>
                                <Text style={defaultStyles.heading1}>Welcome!</Text>
                                <Matches />
                            </SignedIn>

                            <SignedOut>
                                <Text style={[defaultStyles.heading1]}>Welcome! You are not logged in.</Text>
                                {!isSignedIn && (
                                    <Button title="Log in" onPress={() => handleLogin()} />
                                )}
                            </SignedOut>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </GestureHandlerRootView >
    );
};

export default Index
