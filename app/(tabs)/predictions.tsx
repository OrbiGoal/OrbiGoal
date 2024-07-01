import { SafeAreaView, ImageBackground, Text, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router';
import axios from 'axios';

const Predictions = () => {

    return (
        <SafeAreaView style={defaultStyles.container}>
            <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                <ScrollView>
                    <Stack.Screen
                        options={{
                            headerTitle: "Predictions",
                            headerTitleStyle: {
                                fontFamily: 'pop-bold',
                                fontSize: 20,
                            },
                        }}
                    />
                    <View style={defaultStyles.container2}>
                        <Text style={defaultStyles.heading1}>Predictions</Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Predictions;