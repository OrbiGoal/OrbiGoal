import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import MatchCard from './MatchCard'

const Matches = () => {
    return (
        <View>
            <Text style={defaultStyles.heading2}>Match Schedule</Text>
            <MatchCard />
        </View>
    )
}

export default Matches