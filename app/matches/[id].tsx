import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const MatchInfo = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log('file: [id].tsx:7 ~ id:', id);
    return (
        <View>
            <Text>MatchInfo</Text>
        </View>
    )
}

export default MatchInfo;