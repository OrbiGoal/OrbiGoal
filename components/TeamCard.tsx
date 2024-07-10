import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import React, { forwardRef, useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@clerk/clerk-react';

interface TeamCardProps {
    team: Team;
    onPress: () => void;
}

const TeamCard = forwardRef<TouchableOpacity, TeamCardProps>(({ team, onPress }, ref) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/api/getFavoriteTeams/${userId}`);
                    const favorites = await response.json();
                    const isFav = favorites.some((favorite: Team) => favorite.team_id === team.team_id);
                    setIsFavorite(isFav);
                } catch (error) {
                    console.error('Error checking favorite status:', error);
                }
            }
        };

        checkFavoriteStatus();
    }, [userId, team.team_id]);

    const handleFavoriteToggle = async () => {
        if (userId) {
            try {
                const token = await getToken();
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                if (isFavorite) {
                    console.log(userId + " deleting " + team.full_name)
                    await fetch('http://127.0.0.1:5000/api/removeFavoriteTeam', {
                        method: 'DELETE',
                        headers,
                        body: JSON.stringify({
                            userId,
                            teamId: team.team_id,
                            teamName: team.full_name
                        }),
                    });
                } else {
                    console.log(userId + " favouriting " + team.full_name)
                    await fetch('http://127.0.0.1:5000/api/addFavoriteTeam', {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({
                            userId,
                            teamId: team.team_id,
                            teamName: team.full_name
                        }),
                    });
                }
                setIsFavorite(!isFavorite);
            } catch (error) {
                console.error('Error updating favorite status:', error);
            }
        }
    };

    return (
        <TouchableOpacity ref={ref} style={styles.card} onPress={onPress}>
            <View style={styles.teamDetails}>
                <Image source={{ uri: team.Logo }} style={styles.logo} />
                <Text style={styles.text1}>{team.full_name}</Text>
            </View>

            <TouchableOpacity style={defaultStyles.favouriteBtn} onPress={handleFavoriteToggle}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "red" : 'white'} />

            </TouchableOpacity>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 5,
        backgroundColor: '#242539',
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    teamDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
});

export default TeamCard;
