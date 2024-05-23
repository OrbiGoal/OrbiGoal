import { View, Text, Button } from 'react-native'
import React from 'react'
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router';

const Profile = () => {
    const { signOut, isSignedIn } = useAuth();

    return (
        <View>
            <SignedIn>
                <Text>You are Signed in</Text>

                <Button title='Log out' onPress={() => signOut()} />
                {!isSignedIn && (
                    <Link style={{ color: 'white' }} href={'/(modals)/login'}>
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Link>
                )}
            </SignedIn>

            <SignedOut>
                <Text>You are Signed out</Text>
            </SignedOut>
        </View>
    )
}

export default Profile