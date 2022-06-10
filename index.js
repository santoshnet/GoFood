/**
 * @format
 */

import {AppRegistry, LogBox,Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import  notifee  from '@notifee/react-native';

LogBox.ignoreAllLogs();
messaging()
  .subscribeToTopic('global')
  .then(() => console.log('Subscribed to topic!'));
  
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  let notification = JSON.parse(remoteMessage?.data.data);

  onDisplayNotification(notification.title,notification.message);
});


async function onDisplayNotification(title,body) {
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
// messaging().onMessage(async remoteMessage => {
//   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
// });

AppRegistry.registerComponent(appName, () => App);
