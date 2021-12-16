/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
AppRegistry.registerComponent(appName, () => App);
