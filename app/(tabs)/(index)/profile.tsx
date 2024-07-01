import { ScrollView, Text, Button, SafeAreaView, View, ImageBackground } from 'react-native'
import React from 'react'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';

const Profile = () => {
    const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
    const { isLoaded: isAuthLoaded, signOut } = useAuth();

    const router = useRouter();
    const handleLogin = () => {
        router.push('/(modals)/login');
    };


    // In case the user signs out while on the page.
    if (!isUserLoaded || !isSignedIn) {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={defaultStyles.container}>
                    <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                        <ScrollView>
                            <View style={defaultStyles.container2}>
                                <Text style={[defaultStyles.heading1, { paddingTop: 10 }]}>You are signed out.</Text>
                                {!isSignedIn && (
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
                    <ScrollView>
                        <View style={defaultStyles.container2}>
                            <Text style={defaultStyles.heading1}>Welcome, {user.firstName}!</Text>
                            <Button title='Log out' onPress={() => signOut()} />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Profile