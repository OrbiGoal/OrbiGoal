import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View, Text, Button, SafeAreaView, ImageBackground } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Matches from '@/components/Matches';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';

// Below is the code to connect and fetch data from Firebase Firestore
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs } from '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDiChv05iCnt6XXP4gC7cPmqihR8GsD1cM",
    authDomain: "orbigoal-b4283.firebaseapp.com",
    projectId: "orbigoal-b4283",
    storageBucket: "orbigoal-b4283.appspot.com",
    messagingSenderId: "437387425744",
    appId: "1:437387425744:web:f4c9b3713d840aa23eabd5",
    measurementId: "G-RHP3731DSG"
  };

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp); // Initialize Firestore

// Retrieve data from Firestore
const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'your_collection'));
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

// // Example: Call fetchData when a button is clicked
// const handleClick = () => {
//     fetchData();
// };
  
// // Example: Render a button that calls fetchData when clicked
// const YourComponent = () => {
//     return (
//         <button onClick={handleClick}>Fetch Data</button>
//     );
// };


const Index = () => {
    const { signOut, isSignedIn } = useAuth();
    <Button title='Log out' onPress={() => signOut()} />
    const router = useRouter();
    const handleLogin = () => {
        router.push('/(modals)/login');
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={defaultStyles.container}>
                <ImageBackground source={require('@/assets/screen-background.jpeg')} style={defaultStyles.backgroundImageContainer} imageStyle={defaultStyles.backgroundImage}>
                    <ScrollView>
                        <View style={defaultStyles.container2}>
                            <SignedIn>
                                <Text style={defaultStyles.heading1}>Welcome!</Text>
                                <Matches />
                            </SignedIn>

                            <SignedOut>
                                <Text style={[defaultStyles.heading1, { paddingTop: 10 }]}>No user data</Text>
                                {!isSignedIn && (
                                    <Button title="Log in" onPress={() => handleLogin()} />
                                )}
                            </SignedOut>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </GestureHandlerRootView >
    );
};

export default Index
