import { GoogleLogo, KakaoLogo } from '@/src/components/common/icons/logo';
import { Text, TouchableOpacity, View } from 'react-native';

const SocialLogins = () => {
  const onGooglePress = async () => {

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
