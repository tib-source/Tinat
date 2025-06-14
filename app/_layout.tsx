import '~/global.css';
import '~/translation';
import {
    DarkTheme,
    DefaultTheme,
    Theme,
    ThemeProvider
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DatabaseLoader from '~/components/DatabaseLoader';
import { QueryProvider } from '~/src/providers/QueryProvider';

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';

export default function RootLayout() {
    const hasMounted = React.useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }

        if (Platform.OS === 'web') {
            // Adds the background color to the html element to prevent white background on overscroll.
            document.documentElement.classList.add('bg-background');
        }
        setAndroidNavigationBar(colorScheme);
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                <DatabaseLoader>
                    <QueryProvider>
                        <StatusBar
                            style={isDarkColorScheme ? 'light' : 'dark'}
                        />
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false
                                }}
                            />
                        </Stack>

                        <PortalHost />
                    </QueryProvider>
                </DatabaseLoader>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}

const useIsomorphicLayoutEffect =
    Platform.OS === 'web' && typeof window === 'undefined'
        ? React.useEffect
        : React.useLayoutEffect;
