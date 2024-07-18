import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View, Text, Button, SafeAreaView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Matches from '../../../components/Matches';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL

const Index = () => {
    const { signOut, isSignedIn: isAuthSignedIn } = useAuth();
    const { isLoaded, isSignedIn: isUserSignedIn, user } = useUser();
    const [favoriteTeams, setFavoriteTeams] = useState<FavoriteTeam[]>([]);
    const router = useRouter();

    // If not logged in, push the log in page to the user
    const handleLogin = () => {
        router.push('/(modals)/login');
    };

    // Get signed in data
    useEffect(() => {
        if (isUserSignedIn) {
            const fetchFavoriteTeams = async () => {
                try {
                    const response = await fetch(`${FIREBASE_API_URL}/api/getFavoriteTeams/${user.id}`);
                    const data = await response.json();
                    setFavoriteTeams(data);
                } catch (error) {
                    console.error('Error fetching favorite teams:', error);
                }
            };
            fetchFavoriteTeams();
        }
    }, [isUserSignedIn, user]);

    // In case the user signs out while on the page.
    if (!isLoaded || !isAuthSignedIn) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={defaultStyles.container}>
                    <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                        <ScrollView>
                            <View style={defaultStyles.container2}>
                                <Text style={[defaultStyles.heading1, { paddingTop: 10 }]}>You are signed out.</Text>
                                {!isUserSignedIn && (
                                    <Button title="Log in" onPress={() => handleLogin()} />
                                )}
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </SafeAreaView>
            </GestureHandlerRootView>
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={defaultStyles.container}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    <SignedIn>
                        {user &&
                            <Text style={[defaultStyles.heading1, { paddingVertical: 20, paddingHorizontal: 30 }]}>Welcome, {user.firstName}!</Text>
                        }
                        <Matches favoriteTeams={favoriteTeams} />
                    </SignedIn>

                    <SignedOut>
                        <Text style={[defaultStyles.heading1]}>Welcome! You are not logged in.</Text>
                        {!isAuthSignedIn && (
                            <Button title="Log in" onPress={() => handleLogin()} />
                        )}
                    </SignedOut>
                </ImageBackground>
            </SafeAreaView>
        </GestureHandlerRootView >
    );
};

export default Index
