import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import MatchCard from './MatchCard'

const Matches = () => {
    return (
        <View style={{ gap: 5 }}>
            <Text style={defaultStyles.heading2}>Match Schedule</Text>
            <View style={{ gap: 10 }}>
                <MatchCard
                    team1={"FC Barcelona"}
                    team2={"Real Madrid"}
                    team1logo={"https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png"}
                    team2logo={"https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"}
                    date={"30 Aug 2024"}
                    time={"GMT 1140"} />

                <MatchCard
                    team1={"Manchester City"}
                    team2={"Manchester United"}
                    team1logo={"https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png"}
                    team2logo={"https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"}
                    date={"30 Aug 2024"}
                    time={"GMT 1140"}
                />
            </View>
        </View>
    )
}

export default Matches