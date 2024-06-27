import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import RNPickerSelect from 'react-native-picker-select';

interface ExploreHeaderProps {
    searchbar: string;
    subtitle: string;
    type: "team" | "player";
    setSelectedLeague: (league: string | undefined) => void;
    setSearchQuery: (query: string) => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ searchbar, subtitle, type, setSelectedLeague, setSearchQuery }) => {
    const [searchInput, setSearchInput] = useState(searchbar);
    const [isFocused, setIsFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const leagues = [
        { label: 'Ligue 1', value: 'FRA' },
        { label: 'Bundesliga', value: 'GER' },
        { label: 'La Liga', value: 'ESP' },
        { label: 'Premier League', value: 'ENG' },
        { label: 'Serie A', value: 'ITA' }];

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
                                onChangeText={text => {
                                    setSearchInput(text);
                                    setSearchQuery(text); // Update search query
                                }}
                                placeholder={searchbar}
                                placeholderTextColor="#c2c2c2"
                            />

                            {!isFocused && searchInput === searchbar && (
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible(true)}>
                        <Ionicons name='options-outline' size={24} color='white' />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <Text style={defaultStyles.heading2}>Filter Options</Text>
                            <View style={{ height: 20 }}></View>

                            {/* For teams filter */}
                            {type === "team" && (
                                <View>
                                    <Text style={defaultStyles.text}>Select League</Text>
                                    <View style={{ height: 10 }}></View>
                                    <RNPickerSelect
                                        onValueChange={(value) => setSelectedLeague(value)}
                                        items={leagues}
                                        style={pickerSelectStyles}
                                        placeholder={{ label: 'Show All', value: 'all' }}
                                    />
                                </View>
                            )}

                            {/* For players filter */}
                            {type === "player" && (
                                <View>
                                    <View>
                                        <Text style={defaultStyles.text}>Select League</Text>
                                        <View style={{ height: 10 }}></View>
                                        <RNPickerSelect
                                            onValueChange={(value) => setSelectedLeague(value)}
                                            items={leagues}
                                            style={pickerSelectStyles}
                                            placeholder={{ label: 'Show All', value: 'all' }}
                                        />
                                    </View>
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
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
    filterText: {
        ...defaultStyles.text,
        textAlign: 'left',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#222232',
        borderRadius: 10,
    },
    modalText: {
        ...defaultStyles.heading2,
        // marginBottom: 15,
        // textAlign: 'center',
        // fontSize: 18,
        // fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 13,
    },
    closeButtonText: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: 200,
    },
})

// Define custom styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 20,
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
    },
});


export default ExploreHeader