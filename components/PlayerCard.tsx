import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import React, { forwardRef, useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@clerk/clerk-react';

interface PlayerCardProps {
    player: Player;
    onPress: () => void;
    favoritePlayers: Player[];
}

const FIREBASE_API_URL = process.env.EXPO_PUBLIC_FIREBASE_API_URL;
const LOCAL_URL = process.env.EXPO_PUBLIC_LOCAL_FIREBASE;

const PlayerCard = forwardRef<TouchableOpacity, PlayerCardProps>(({ player, favoritePlayers, onPress }, ref) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const isFav = favoritePlayers.some(favorite => Number(favorite.id) === player.id);
        setIsFavorite(isFav);
    }, [favoritePlayers, player.id]);

    // TODO: Handle toggle logic
    const handleFavoriteToggle = async () => {
        if (userId) {
            try {
                const token = await getToken();
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                if (isFavorite) {
                    console.log(userId + " deleting " + player.Player);
                    await fetch(`${LOCAL_URL}/api/removeFavoritePlayer`, {
                        method: 'DELETE',
                        headers,
                        body: JSON.stringify({
                            userId,
                            id: player.id,
                            Player: player.Player,
                            LeagueNation: player.LeagueNation,
                            SquadLogoURL: player.SquadLogoURL,
                            SquadFlagURL: player.SquadFlagURL,
                            SquadName: player.SquadName,
                        }),
                    });
                } else {
                    console.log(userId + " favouriting " + player.Player);
                    await fetch(`${LOCAL_URL}/api/addFavoritePlayer`, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({
                            userId,
                            id: player.id,
                            Player: player.Player,
                            LeagueNation: player.LeagueNation,
                            SquadLogoURL: player.SquadLogoURL,
                            SquadFlagURL: player.SquadFlagURL,
                            SquadName: player.SquadName,
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
                <Image source={{ uri: player.SquadLogoURL }} style={styles.logo} />
                <Image source={{ uri: player.NationalityFlagURL }} style={styles.logo} />
                <Image source={{ uri: player.PlayerFaceURL }} style={styles.logo} />
                <Text style={styles.text1}>{player.Player}</Text>
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
        resizeMode: 'contain',
    },
    text1: {
        ...defaultStyles.text,
        fontFamily: 'pop-bold',
    },
    teamDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
});

export default PlayerCard;
