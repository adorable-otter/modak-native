import { FlatList, Image, ImageSourcePropType, Text, View } from 'react-native';
import SocialLogins from './_components/SocialLogins';
import useDotIndicator from '@/src/hooks/useDotIndicator';

interface OnBoardingItem {
  title: string;
  description: string;
  imageUrl: ImageSourcePropType;
}

const onBoardingItems: OnBoardingItem[] = [
  {
    title: '모닥모닥',
    description: '우리만의 추억 공유 플랫폼',
    imageUrl: require('../../assets/images/onboarding-fire.webp'),
  },
  {
    title: '추억을 공유해요',
    description: '친구들을 초대할 수 있어요!',
    imageUrl: require('../../assets/images/onboarding-heart.webp'),
  },
  {
    title: '일정을 관리해요',
    description: '우리 일정을 관리해보세요!',
    imageUrl: require('../../assets/images/onboarding-calendar.webp'),
  },
];

const LoginPage = () => {
  const { DotIndicator, move } = useDotIndicator({ dotCount: 3 });

  const renderItem = ({ item }: { item: OnBoardingItem }) => {
    const { title, description, imageUrl } = item;
    return (
      <View className="items-center w-screen">
        <Image source={imageUrl} width={145} height={145} className="w-[145px] h-[145px] mb-6" />
        <Text className="text-2xl font-bold mb-2 leading-[140%]">{title}</Text>
        <Text className="text-gray-700 text-xl font-normal">{description}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 pb-[112px] pt-[119px] justify-center ">
      <View className="items-center justify-center mb-[114px]">
        <FlatList
          data={onBoardingItems}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onViewableItemsChanged={(info) => {
            move(info.viewableItems[0].index!);
          }}
          className="mb-[47px]"
        />
        <DotIndicator />
      </View>
      <SocialLogins />
    </View>
  );
};

export default LoginPage;
