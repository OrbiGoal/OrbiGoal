import { DarkTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'pop-black': require('@/assets/fonts/Poppins-Black.ttf'),
    'pop-eb': require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    'pop-bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'pop-sb': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'pop-med': require('@/assets/fonts/Poppins-Medium.ttf'),
    'pop-reg': require('@/assets/fonts/Poppins-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

const RootLayoutNav = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
  }, [isLoaded]);

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen // For login interface
          name="(modals)/login"
          options={{ // Come up as a card for login page
            title: 'Log in or sign up', // Title for card pop up
            headerTitleStyle: {
              fontFamily: 'pop-bold'
            },
            headerLeft: () => ( // 'X' button to close card pop-up page
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={28} color={"white"} />
              </TouchableOpacity>
            ),
            presentation: 'modal'
          }} />

        <Stack.Screen // For card pop-up when user clicks on matches
          name="notifs/[notifId]"
          options={{
            headerTitle: '', headerTransparent: true, headerBackTitle: '', // Empty header to do parallax effect
          }}
        /> 

        <Stack.Screen // For matches card interface on home screen
          name="(modals)/match"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerLeft: () => ( // 'X' button to close card pop-up page
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={28} color={"white"} />
              </TouchableOpacity>
            ),
          }}
        />

      </Stack>
    </ThemeProvider>
  );
}
