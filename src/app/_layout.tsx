import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { setPushNotificationOptions } from '../utils/notification/register';

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});
// keep splash screen visible
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      // pre-load
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // hide splash screen
      await SplashScreen.hideAsync();
    };
    setPushNotificationOptions();
    prepare();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
