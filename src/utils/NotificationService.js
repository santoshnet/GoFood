import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {setFirebaseToken, getFirebaseToken} from './LocalStorage';
import notifee from '@notifee/react-native';

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

const getFCMToken = async () => {
  let fcmToken = await getFirebaseToken();
  console.log('Old Token==>', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new Token==>', fcmToken);
        setFirebaseToken(fcmToken);
      }
    } catch (error) {
      console.log('error==>', error);
    }
  }
};

export const notificationListener = async navigation => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate('HomeScreen');
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Remote message==>', JSON.parse(remoteMessage?.data.data));
    let notification = JSON.parse(remoteMessage?.data.data);

    onDisplayNotification(notification.title, notification.message);
    // alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });
};

async function onDisplayNotification(title, body) {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: '100000000000000',
    name: 'Go Food',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    },
  });
}
