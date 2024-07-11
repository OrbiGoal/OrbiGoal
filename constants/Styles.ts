import { Dimensions, StyleSheet } from "react-native";
import Colors from "./Colors";

const screenWidth = Dimensions.get("window").width;

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181928',
    },
    container2: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        gap: 10,
        flexGrow: 1,
    },
    heading1: {
        color: 'white',
        fontFamily: 'pop-eb',
        fontSize: 24,
        textAlign: 'left',
    },
    heading2: {
        color: 'white',
        fontFamily: 'pop-sb',
        fontSize: 20,
        textAlign: 'left',
    },
    text: {
        color: 'white',
        fontFamily: 'pop-reg',
    },
    backgroundImageContainer: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: screenWidth,
    },
    backgroundImage: {
        flex: 1,
        opacity: 0.3,
        resizeMode: 'cover',
        backgroundColor: '#181928',
        width: screenWidth,
    },
    btn: {
        backgroundColor: Colors['dark'].tabIconSelected,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#222232',
        fontSize: 16,
        fontFamily: 'pop-bold',
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: 'violet',
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'white',
        color: 'black',
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: Colors['dark'].tabIconDefault,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    searchPage: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        gap: 10,
        flexGrow: 1,
        padding: 10,
        backgroundColor: 'transparent',
    },
    favouriteBtn: {
        paddingVertical: 4,
        paddingRight: 8,
    }
})