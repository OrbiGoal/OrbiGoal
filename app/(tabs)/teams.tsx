import { SafeAreaView, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { Header } from '@/components/Header';

const Teams = () => {
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

export default Teams;