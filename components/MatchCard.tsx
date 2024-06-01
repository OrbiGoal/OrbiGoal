import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Styles';

type Props = {
    team1: string;
    team2: string;
    team1logo: string;
    team2logo: string;
    date: string;
    time: string;
};

const MatchCard = ({ team1, team2, team1logo, team2logo, date, time }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.touchableContainer}>
                    <View style={styles.teamContainer}>
                        <Text style={styles.teamText} numberOfLines={2} ellipsizeMode="tail">{team1}</Text>
                        <Image style={styles.logo} source={{ uri: team1logo }} />
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={[defaultStyles.text, styles.dateText]}>{date}</Text>
                        <Text style={[defaultStyles.text, styles.dateText]}>{time}</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        <Image style={styles.logo} source={{ uri: team2logo }} />
                        <Text style={styles.teamText} numberOfLines={2} ellipsizeMode="tail">{team2}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222232',
        borderRadius: 24,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableContainer: {
        flexDirection: 'row',
        gap: 15,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '30%', // Ensure text does not exceed a certain width
    },
    teamText: {
        ...defaultStyles.text,
        flexShrink: 1,
        marginRight: 5,
    },
    dateContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    dateText: {
        textAlign: 'center',
    },
});

export default MatchCard;
