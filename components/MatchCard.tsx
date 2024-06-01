import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

interface Props {
    matches: any[];
}

const MatchCard = () => {

    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.logo}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png" }}
            />
            <Image
                style={styles.logo}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 12,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        padding: 12,
    }
})

export default MatchCard