// DrawerLayout.tsx
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Header } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type HeaderLeftProps = {
    tintColor?: string;
    pressColor?: string;
    pressOpacity?: number;
    labelVisible?: boolean;
    style?: ViewStyle;
};

const HeaderLeft: React.FC<HeaderLeftProps> = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.icon}>
            <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                activeOpacity={0.5}
                style={props.style}
            >
                <Ionicons name='menu' size={24} color={'white'} />
            </TouchableOpacity>
        </View>
    );
};

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
            >
                <Drawer.Screen
                    name='index'
                    options={{
                        drawerHideStatusBarOnOpen: true,
                        drawerActiveBackgroundColor: '#bfafc9',
                        drawerActiveTintColor: 'black',
                        headerTitle: 'Home',
                        drawerLabel: 'Home',
                        headerLeft: (props) => (<HeaderLeft {...props} />),
                        headerTitleStyle: styles.headerTitle,
                        headerStyle: styles.header,
                        drawerIcon: ({ size, color }) => (<Ionicons name='home-outline' size={size} color={color} />),
                        drawerLabelStyle: styles.drawerLabel,
                    }} />

                <Drawer.Screen
                    name='profile'
                    options={{
                        headerTitle: 'Profile',
                        drawerLabel: 'Profile',
                        headerLeft: (props) => (<HeaderLeft {...props} />),
                        headerTitleStyle: styles.headerTitle,
                        headerStyle: styles.header,
                        drawerIcon: ({ size, color }) => (<Ionicons name='person-outline' size={size} color={color} />),
                        drawerLabelStyle: styles.drawerLabel,
                    }} />

                <Drawer.Screen
                    name='notifications'
                    options={{
                        headerTitle: 'Notifications',
                        drawerLabel: 'Notifications',
                        headerLeft: (props) => (<HeaderLeft {...props} />),
                        headerTitleStyle: styles.headerTitle,
                        headerStyle: styles.header,
                        drawerIcon: ({ size, color }) => (<Ionicons name='notifications' size={size} color={color} />),
                        drawerLabelStyle: styles.drawerLabel,
                    }} />
            </Drawer>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#222232',
    },
    headerTitle: {
        fontFamily: 'pop-bold',
        fontSize: 20,
    },
    drawerLabel: {
        fontFamily: 'pop-sb',
    },
    icon: {
        marginLeft: 30,
    },
    logo: {
        resizeMode: 'contain',
        width: 75,
        height: 75,
    }
});

export default DrawerLayout;
