import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

interface ExploreHeaderProps {
    searchbar: string;
    subtitle: string;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ searchbar, subtitle }) => {
    const [searchInput, setSearchInput] = useState(searchbar);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        if (searchInput === searchbar) {
            setSearchInput('');
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (searchInput === '') {
            setSearchInput(searchbar);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.actionRow}>

                    <Link style={styles.text} href={'/(modals)/team'} asChild>
                        <View style={styles.searchBar}>
                            <TouchableOpacity>
                                <Ionicons name='search' size={24} color='white' />
                            </TouchableOpacity>

                            <View style={styles.textInput}>
                                <TextInput
                                    style={[styles.text, { width: 220, height: 30, paddingBottom: isFocused ? 0 : 10 }]}
                                    value={searchInput}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChangeText={setSearchInput}
                                    placeholder={searchbar}
                                    placeholderTextColor="#c2c2c2"
                                />

                                {!isFocused && searchInput === searchbar && (
                                    <Text style={styles.subtitle}>{subtitle}</Text>
                                )}
                            </View>

                        </View>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name='options-outline' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181928'
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        gap: 10,
    },
    text: {
        color: 'white',
        fontFamily: 'pop-reg',
    },
    subtitle: {
        color: 'grey',
        fontFamily: 'pop-reg',
        fontSize: 10,
        position: 'absolute',
        top: 18,
    },
    textInput: {
        flexDirection: 'column',
        position: 'absolute',
        left: 55,
        top: 5.5,
    },
    searchBar: {
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: 'black',

        // Create shadow effect for search bar
        elevation: 2,
        shadowColor: 'violet',
        shadowOpacity: .12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors['dark'].tint,
        borderRadius: 24,
    },
})

export default ExploreHeader