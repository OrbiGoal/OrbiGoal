import React, { forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface NotificationCardProps {
    notification: Notification;
    onPress: (id: string) => void;
}

const NotificationCard = forwardRef<TouchableOpacity, NotificationCardProps>(({ notification, onPress }, ref) => {
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
        <TouchableOpacity key={notification.id} onPress={() => onPress(notification.id.toString())}>
            <View style={styles.card}>
                <View style={styles.headingContainer}>
                    <Text style={styles.competitionName}>{notification.competition.name}</Text>
                    <Image source={{ uri: notification.competition.emblem }} style={styles.competitionEmblem} />
                </View>
                <View style={styles.matchContainer}>
                    <Text style={styles.matchDetails}>{notification.homeTeam.name} vs {notification.awayTeam.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                    {renderTeamLogo(notification.homeTeam.crest)}
                    <Text style={styles.score}>
                        Score: {notification.score && notification.score.fullTime && typeof notification.score.fullTime.home !== 'undefined' && typeof notification.score.fullTime.away !== 'undefined' ?
                            `${notification.score.fullTime.home} - ${notification.score.fullTime.away}` : 'N/A'}
                    </Text>
                    {renderTeamLogo(notification.awayTeam.crest)}
                </View>
                <Text style={styles.date}>Date: {new Date(notification.utcDate).toLocaleString()}</Text>
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

export default NotificationCard;