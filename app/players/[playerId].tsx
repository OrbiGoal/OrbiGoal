import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, ImageBackground, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { defaultStyles } from '@/constants/Styles';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Stat from '@/components/Stat';

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL

const PlayerDetails: React.FC = () => {
    const local = useLocalSearchParams();
    const playerId = local.playerId;
    const [Details, setPlayerDetails] = useState<any>([]);
    const [allPlayerDetails, setAllPlayerDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [filteredDetails, setFilteredDetails] = useState<any>([]);

    console.log(playerId)

    return (
        <View>
            <Text>here</Text>
        </View>
    )

};

const styles = StyleSheet.create({
    seasonToggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    headContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
    },
    bodyContainer: {
        marginHorizontal: 30,
    },
    footContainer: {
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: 'rgba(0, 100, 255, 0.3)' // DELETE WHEN DONE
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    teamHeading: {
        ...defaultStyles.heading1,
    },
    rankHeading: {
        ...defaultStyles.heading2,
    },
    pickerInputIOS: {
        color: 'white',
        padding: 18,
        backgroundColor: '#222232',
        borderRadius: 24,
        width: 180,
        height: 55,
    },
    pickerInputAndroid: {
        color: 'white',
        padding: 18,
        backgroundColor: '#222232',
        borderRadius: 24,
        width: 180,
        height: 55,
    },
    pickerPlaceholder: {
        color: 'white',
        fontSize: 18,
    },
    pickerContainer: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 30,
    },
});

export default PlayerDetails;
