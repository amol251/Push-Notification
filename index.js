/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import bgMessaging from './bgMessaging';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
