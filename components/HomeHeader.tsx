import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const HomeHeader = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.actionRow}>

                    <Link style={styles.text} href={'/(modals)/profile'} asChild>
                        <TouchableOpacity style={styles.icon}>
                            <Ionicons name='menu' size={24} color='white' />
                        </TouchableOpacity>
                    </Link>

                    <Image source={require('@/assets/header_logo.png')} style={styles.logo} />

                    <TouchableOpacity style={styles.icon}>
                        <MaterialIcons name='notifications' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181928'
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    text: {
        color: 'white',
        fontFamily: 'pop-med',
    },
    icon: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 24,
    },
    logo: {
        resizeMode: 'contain',
        width: 80,
        height: 80,
    }
})

export default HomeHeader