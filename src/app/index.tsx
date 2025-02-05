import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import useAuthSession from '../hooks/useAuthSession';
import { useEffect } from 'react';

export default function Index() {
  const { accessToken, refreshToken, isPending, isError } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.replace('/login');
    }
  }, [isError, router]);

  if (isPending) return null;

  return (
    <WebView
      source={{
        uri: 'https://modak-modak.vercel.app',
        headers: {
          Authorization: accessToken + ',' + refreshToken,
        },
      }}
    />
  );
}
