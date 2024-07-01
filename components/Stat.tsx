import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Stat {
    name: string;
    value: string;
}

const Stat = (stat: Stat) => {
    return (
        <View style={styles.statContainer}>
            <Text style={styles.statName}>{stat.name}: </Text>
            <Text style={styles.statValue}>{stat.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    statContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 2,
    },
    statName: {
        fontFamily: 'pop-sb',
        color: 'white',
        fontSize: 18,
        paddingVertical: 4,
    },
    statValue: {
        fontFamily: 'pop-med',
        color: 'white',
        fontSize: 18,
        paddingVertical: 4,
    },
})
export default Stat