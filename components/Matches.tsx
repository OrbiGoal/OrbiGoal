import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { defaultStyles } from '@/constants/Styles'

interface MatchProps {
    favoriteTeams: any[];
}

const Matches = ({ favoriteTeams }: MatchProps) => {
    useEffect(() => {
        // Log the first team object to inspect its structure
        console.log(favoriteTeams[0]);
    }, [favoriteTeams]);

    return (
        <View>
            <Text style={defaultStyles.heading2}>Matches</Text>
            {/* TODO: DISPLAY UPCOMING MATCHES OF FAVORITED TEAMS */}
            {favoriteTeams.map((team, index) => (
                <View key={index} style={defaultStyles.container2}>
                    <Text style={defaultStyles.text}>{team.team_name}</Text>
                    <Text style={defaultStyles.text}>{team.country}</Text>
                </View>
            ))}
        </View>
    );
};

export default Matches