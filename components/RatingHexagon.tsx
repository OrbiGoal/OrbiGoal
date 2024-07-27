import { defaultStyles } from '@/constants/Styles';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

interface HexagonProps {
    number: number;
}

const RatingHexagon: React.FC<HexagonProps> = ({ number }) => {
    return (
        <View style={styles.container}>
            <Svg height="70" width="70" viewBox="0 0 100 100">
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#f29bf1" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#781a76" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Polygon
                    points="50 0, 95 25, 95 75, 50 100, 5 75, 5 25"
                    fill="url(#grad)"
                    stroke="#000"
                    strokeWidth="1"
                />
            </Svg>
            <Text style={styles.number}>{number}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        ...defaultStyles.heading2,
        fontSize: 23,
        position: 'absolute',
    },
});

export default RatingHexagon;
