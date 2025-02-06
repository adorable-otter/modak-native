import { Platform } from 'react-native';
import { isDevice } from 'expo-device';

import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';

//알림 보낼 권한을 얻고, push tocken을 리턴하는 함수
export const setPushNotificationOptions = async () => {
  //알림창이 어떤 모습일지, 소리는 날지 등등 설정
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  if (Platform.OS === 'android') {
    setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    //아직 알림을 보낼 권한을 얻지 않은 상태라면 권한을 요청함
    if (existingStatus !== 'granted') {
      await requestPermissionsAsync();
    }
  }
};

export const getPushToken = async () => {
  //push token을 얻어서 return함
  try {
    const pushTokenString = (
      await getExpoPushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_EXPO_PROJECT_ID,
      })
    ).data;
    return pushTokenString;
  } catch (e: unknown) {
    console.log(`${e}`);
  }
};
