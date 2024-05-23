import { SafeAreaView, StyleSheet, Image, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { Header } from '@/components/Header';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';

const Index = () => {
    const { signOut, isSignedIn } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <Header
                leftButton={{ child: <Image source={require('@/assets/menu.png')} />, }}
                rightButton={{ child: <Image source={require('@/assets/bell.png')} />, }}
            />

            <Text style={styles.heading1}>Welcome!</Text>

            <Link style={styles.text} href={"/(modals)/login"}>Login</Link>
            <Link style={styles.text} href={"/(modals)/matches"}>Matches</Link>
            <Link style={styles.text} href={"/matches/1337"}>Match Information</Link>
            <Link style={styles.text} href={'/(modals)/profile'}>Profile</Link>

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
        </SafeAreaView>
    )
}

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

export default Index;