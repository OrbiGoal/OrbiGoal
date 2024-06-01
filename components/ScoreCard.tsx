import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { defaultStyles } from '@/constants/Styles';

type Props = {
    team1: string;
    team2: string;
    team1logo: string;
    team2logo: string;
    date: string;
    time: string;
    score1: string;
    score2: string;
    scorers1: string[];
    scorers2: string[];
};

const ScoreCard = ({ team1, team2, team1logo, team2logo, date, time, score1, score2, scorers1, scorers2 }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <ImageBackground source={require('@/assets/score_bg.png')} style={styles.bgImageContainer} imageStyle={[styles.bgImage, { borderRadius: 24 }]}>
                    <View style={styles.touchableContainer}>
                        <View style={styles.teamContainer}>
                            <Image style={styles.logo} source={{ uri: team1logo }} />
                            <View>
                                {scorers1.map((scorer, index) => (
                                    <Text key={index} style={defaultStyles.text} numberOfLines={2} ellipsizeMode="tail">{scorer}</Text>
                                ))}
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[defaultStyles.text, styles.dateText]}>{date}</Text>
                            <Text style={[defaultStyles.text, styles.dateText]}>{time}</Text>
                            <Text></Text>
                            <Text style={styles.boldedText}>{score1} - {score2}</Text>
                        </View>
                        <View style={styles.teamContainer}>
                            <Image style={styles.logo} source={{ uri: team2logo }} />
                            <View>
                                {scorers2.map((scorer, index) => (
                                    <Text key={index} style={defaultStyles.text}>{scorer}</Text>
                                ))}
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#222232',
        borderRadius: 24,
        overflow: 'hidden', // Ensure the background image does not overflow the container
    },
    touchableContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    teamContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '30%',
        padding: 12,
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    bgImageContainer: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust background opacity here
    },
    bgImage: {
        opacity: 0.3,
        backgroundColor: '#181928',
        height: '100%',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center', // Center the text vertically within the container
        marginHorizontal: 10, // Add some horizontal margin for spacing
    },
    boldedText: {
        color: 'white',
        fontFamily: 'pop-sb'
    },
    dateText: {
        textAlign: 'center',
    },
});

export default ScoreCard;
