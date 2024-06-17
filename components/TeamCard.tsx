import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';

interface TeamCardProps {
    team: Team
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: team.Logo }} style={styles.logo} />
            <Text style={styles.text1}>{team.full_name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 5,
        backgroundColor: '#242539',
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain'
    },
    text1: {
        ...defaultStyles.text,
        fontFamily: 'pop-bold'
    }
});

export default TeamCard;
