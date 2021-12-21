import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { setFirebaseToken,getFirebaseToken } from './LocalStorage';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: false,
    sound: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken=async()=>{
    let fcmToken = await getFirebaseToken();
    console.log("Old Token==>",fcmToken);
    if(!fcmToken){
      try {
           const fcmToken = await messaging().getToken();
           if(fcmToken){
            console.log("new Token==>",fcmToken);
            setFirebaseToken(fcmToken);
           }
      } catch (error) {
        console.log("error==>",error);
      }
    }
}

export const notificationListener= async()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!',remoteMessage);
    });
      // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}