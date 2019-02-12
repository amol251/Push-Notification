/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase'
import {googleLogin,phoneLogin} from './Auth'
import type { RemoteMessage } from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  onPhoneAuth=(data)=>{
    console.log(data)
  }

  componentWillMount(){
    // googleLogin()

    phoneLogin(this.onPhoneAuth)

    // firebase.messaging().hasPermission()
    // .then(enabled => {
    //   if (enabled) {
    //     // user has permissions
    //     console.log('enabled',enabled)
    //   } else {
    //     // user doesn't have permission
    //     firebase.messaging().requestPermission()
    //     .then(() => {
    //       // User has authorised  
    //       console.log('authorised')
    //     })
    //     .catch(error => {
    //       console.log('error')
    //       // User has rejected permissions  
    //     });
    //   } 
    // });

    // firebase.messaging().getToken()
    // .then(fcmToken => {
    //   if (fcmToken) {
    //     console.log(fcmToken)
    //     // user has a device token
    //   } else {
    //     console.log('nots')
    //     // user doesn't have a device token yet
    //   } 
    // });
  } 

  onTokenRefreshListener=(data)=>{
    console.log('tokenrefresher',data)
  }

  messageListener=(data)=>{
    console.log(data)
  }

  componentDidMount() {
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
      console.log('token dkas '.fcmToken)
    });

    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      console.log('onmessage',message)
        // Process your message as required
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
    });
    
     this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ user: user.toJSON() });
        console.log('user',user)
      } else {
        // console.log()
        // User has been signed out, reset the state
        // this.setState({
        //   user: null,
        //   message: '',
        //   codeInput: '',
        //   phoneNumber: '+44',
        //   confirmResult: null,
        // });
      }
    });
  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.messageListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
