import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { TabBarIcon } from '@/components/TabBarIcon'

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors['dark'].tint,
                tabBarLabelStyle: styles.tabBar,
            }}>

            <Tabs.Screen
                name='(index)'
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                    headerShown: false,
                }} />

            <Tabs.Screen
                name='teams'
                options={{
                    tabBarLabel: 'Teams',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            focused={focused}
                            focusedImageSource={require('../../assets/images/player-focused.png')}
                            unfocusedImageSource={require('../../assets/images/player.png')}
                            color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='players'
                options={{
                    tabBarLabel: 'Players',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'man' : 'man-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='predictions'
                options={{
                    tabBarLabel: 'Predictions',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        fontFamily: 'pop-sb',
    },
})

export default Layout;