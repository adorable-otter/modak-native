import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

// keep splash screen visible 
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      
      // pre-load
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // hide splash screen
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return <Stack />;
}

