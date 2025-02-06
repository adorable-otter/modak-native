import { GoogleLogo, KakaoLogo } from '@/src/components/common/icons/logo';
import { Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { supabase } from '@/src/utils/supabase/client';
import { useRouter } from 'expo-router';
import { upsertPushToken } from '@/src/queries/user';

const SocialLogins = () => {
  const router = useRouter();

  const onGooglePress = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    });

    try {
      const hasService = await GoogleSignin.hasPlayServices();
      if (!hasService) throw new Error('need google service');
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        if (error) new Error('login fail');
        await upsertPushToken(data.user);
        router.replace('/');
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      // user cancelled the login flow
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // play services not available or outdated
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  return (
    <View className="flex-1 w-full px-5 leading-[140%]">
      <TouchableOpacity className="flex-row border-none outline-none bg-[#FBE850] w-full h-14 px-5 py-3 rounded-xl items-center justify-center gap-3 text-gray-900 text-base font-semibold mb-4">
        <KakaoLogo />
        <Text>카카오로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onGooglePress}
        className="flex-row border outline-none border-gray-400 w-full h-14 px-5 py-3 rounded-xl items-center justify-center gap-3 text-gray-900 text-base font-semibold"
      >
        <GoogleLogo />
        <Text className="h-[22px]">Google로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogins;
