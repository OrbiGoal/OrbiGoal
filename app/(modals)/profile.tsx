import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';

const Profile = () => {
    const { signOut, isSignedIn } = useAuth();

    const router = useRouter();
    const handleLogin = () => {
        router.push('/(modals)/login');
    };

    return (
        <View>
            <SignedIn>
                <Text style={defaultStyles.heading1}>Welcome!</Text>
                <Button title='Log out' onPress={() => signOut()} />
            </SignedIn>

            <SignedOut>
                <Text style={[defaultStyles.heading1, { paddingTop: 10 }]}>You are signed out.</Text>
                {!isSignedIn && (
                    <Button title="Log in" onPress={() => handleLogin()} />
                )}
            </SignedOut>
        </View>
    )
}

export default Profile