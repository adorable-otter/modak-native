import { WebView } from 'react-native-webview';
import { Redirect } from 'expo-router';
import useAuthSession from '../hooks/useAuthSession';

export default function Index() {
  const { accessToken, refreshToken, isPending, isError } = useAuthSession();

  if (isPending) return null;
  if (isError) return <Redirect href={'/login'} />;

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
