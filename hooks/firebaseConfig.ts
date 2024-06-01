// Connect and fetch data from Firebase Firestore
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from '@firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Retrieve data from Firestore
export const fetchData = async (collectionName: string) => {
    try {
        const statsCollection = collection(db, collectionName);
        const statsSnapShot = await getDocs(statsCollection);
        const data = statsSnapShot.docs.map(doc => doc.data());
        console.log("Successfully loaded data from Firebase: ", collectionName);

        // Save data to AsyncStorage
        await AsyncStorage.setItem(collectionName, JSON.stringify(data));
        console.log("Successfully saved data to AsyncStorage with the key: ", collectionName)

        return data;
    } catch (err) {
        console.error("Error fetching data: ", err);
        Alert.alert('Unable to fetch data')
        return [];
    }
};

// Get local data after fetching from API
export const getLocalData = async (collectionName: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(collectionName);
        if (jsonValue != null) {
            console.log(`Successfully retrieved data from AsyncStorage for collection ${collectionName}. Size of jsonValue: ${jsonValue.length} characters`);
            return JSON.parse(jsonValue);
        } else {
            console.log('Loaded null data');
            return null;
        }
    } catch (err) {
        console.error("Error retrieving data: ", err);
        return null;
    }
};

// Add data to database
export const addDocument = async (collectionName: string, data: any) => {
    try {
        const statsCollection = collection(db, collectionName);
        const docRef = await addDoc(statsCollection, data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (err) {
        console.error("Error adding document: ", err);
        Alert.alert("Unable to add document");
    }
}

// Update data in database
export const updateDocument = async (collectionName: string, docId: string, updatedData: any) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, updatedData);
        console.log("Document successfully updated!");
    } catch (err) {
        console.error("Error updating document: ", err);
        Alert.alert("Unable to update document");
    }
}