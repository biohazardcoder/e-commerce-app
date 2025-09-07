import SplashScreen from '@/components/SplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fetch } from '@/middlewares/Fetch';
import { store } from '@/store/RootStore';
import { setError, setPending, setUser } from '@/toolkit/UserSlicer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useDispatch } from "react-redux";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 3500)); 
      setIsReady(true);
    };
    prepare();
  }, []);

  if (!loaded || !isReady) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <AppNavigator colorScheme={colorScheme || null} />
    </Provider>
  );
}

function AppNavigator({ colorScheme }: { colorScheme: string | null }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const GetMe = async () => {
      try {
        dispatch(setPending());
        const response = await (await Fetch.get("/client/me")).data;
        dispatch(setUser(response.data));
      } catch (error) {
        dispatch(setError("Error in get me")); 
      }
    };
    GetMe();
  }, [dispatch]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ToastProvider placement='top'>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  );
}
