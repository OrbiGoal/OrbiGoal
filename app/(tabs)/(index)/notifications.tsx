import { View, Text, Button, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Notifications = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={defaultStyles.container}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    <ScrollView>
                        <View style={defaultStyles.container2}>
                            <Text style={defaultStyles.heading1}>No notifications for now</Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Notifications