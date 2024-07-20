import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { forwardRef } from 'react'
import { SvgUri } from 'react-native-svg'

interface MatchCardProps {
    match: Match;
    onPress: (id: string) => void;
}

const MatchCard = forwardRef<TouchableOpacity, MatchCardProps>(({ match, onPress }, ref) => {
    // Render the team logo, either an SVG or an image
    const renderTeamLogo = (uri: string) => {
        const isSvg = uri.endsWith('.svg');
        if (isSvg) {
            return <SvgUri width="50" height="50" uri={uri} />;
        } else {
            return <Image source={{ uri }} style={styles.teamLogo} />;
        }
    };

    return (
        <TouchableOpacity key={match.id} onPress={() => onPress(match.id.toString())}>
            <View style={styles.card}>
                <View style={styles.headingContainer}>
                    <Image source={{ uri: match.competition.emblem }} style={styles.competitionEmblem} />
                    <Text style={styles.competitionName}>{match.competition.name}</Text>
                </View>
                <View style={styles.matchContainer}>
                    <Text style={styles.matchDetails}>{match.homeTeam.name} vs {match.awayTeam.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                    {renderTeamLogo(match.homeTeam.crest)}
                    {renderTeamLogo(match.awayTeam.crest)}
                </View>
                <Text style={styles.date}>Date: {new Date(match.utcDate).toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#333333',
        borderRadius: 10,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    competitionName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginRight: 5,
    },
    competitionEmblem: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    matchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    matchDetails: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    teamLogo: {
        width: 50,
        height: 50,
    },
    score: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    date: {
        fontSize: 14,
        color: '#FFFFFF',
    }
});

export default MatchCard
