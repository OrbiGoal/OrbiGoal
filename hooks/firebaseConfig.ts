// Connect and fetch data from Firebase Firestore
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from '@firebase/firestore';
import { Alert } from 'react-native';

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
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching data: ", err);
        Alert.alert("Unable to fetch data");
        return [];
    }
}

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
