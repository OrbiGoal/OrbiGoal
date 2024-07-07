import { View, Text, FlatList, ListRenderItem, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface NotificationProps {
    notifications: any;
    category: string;
}

const Notifications = ({ notifications: items, category }: NotificationProps) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        console.log('Notifications:', items.length);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    const renderItem: ListRenderItem<Notification> = ({ item }) => (
        <Link href={`/notifs/${item.id}`}>
            <TouchableOpacity>
                <Animated.View style={styles.card} entering={FadeInRight} exiting={FadeOutLeft}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.competitionName}>{item.competition.name}</Text>
                        <Image source={{ uri: item.competition.emblem }} style={styles.competitionEmblem} />
                    </View>
                    <View style={styles.matchContainer}>
                        <Text style={styles.matchDetails}>{item.homeTeam.name} vs {item.awayTeam.name}</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        <Image source={{ uri: item.homeTeam.crest }} style={styles.teamLogo} />
                        <Text style={styles.score}>
                            Score: {item.score && item.score.fullTime && typeof item.score.fullTime.home !== 'undefined' && typeof item.score.fullTime.away !== 'undefined' ? 
                                    `${item.score.fullTime.home} - ${item.score.fullTime.away}` : 'N/A'}
                        </Text>
                        <Image source={{ uri: item.awayTeam.crest }} style={styles.teamLogo} />
                    </View>
                    <Text style={styles.date}>Date: {new Date(item.utcDate).toLocaleString()}</Text>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={defaultStyles.container}>
            <FlatList
                renderItem={renderItem}
                ref={listRef}
                data={loading ? [] : items}
            />
        </View>
    );
}

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
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
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

export default Notifications;
