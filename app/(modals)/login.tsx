import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import useWarmUpBrowser from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser'; // Import WebBrowser

// To fix no sessionID created: https://github.com/clerk/clerk-expo-starter/issues/19

enum Strategy {
    Apple = 'oauth_apple',
    Google = 'oauth_google',
    Facebook = 'oauth_facebook',
}

const Login = () => {
    useWarmUpBrowser();

    const router = useRouter();

    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            // Dismiss any currently open web browsers
            console.log("Dismissing open browsers");
            WebBrowser.dismissBrowser();

            console.log('Starting OAuth Flow with strategy: ', strategy);
            const { createdSessionId, setActive } = await selectedAuth();

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                console.log('Successfully logged in! Session ID: ', createdSessionId);
                router.back();
            } else {
                console.log('No session ID created. Possible issue in OAuth flow.');
            }

        } catch (err) {
            console.error('OAuth error: ', err);
        }
    }

    return (
        <View style={styles.container}>
            {/* Text input for email and continue button */}
            <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 30 }]} />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            {/* Line separator for 'or' */}
            <View style={styles.separatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />

                <Text style={styles.separator}>or</Text>

                <View style={{
                    flex: 1,
                    borderBottomColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
            </View>

            {/* Cards for other login methods */}
            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name='logo-apple' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name='logo-facebook' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181928',
        padding: 26,
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    separator: {
        fontFamily: 'pop-reg',
        color: Colors['dark'].tint,
    },
    btnOutline: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'violet',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'pop-sb',
    }
})

export default Login;
