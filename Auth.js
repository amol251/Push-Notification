import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

// Calling this function will open Google for login.
export const googleLogin = () => {
  try {
    // Add any configuration settings here:
    GoogleSignin.configure();

    GoogleSignin.signIn().then((data)=>{

        // create a new firebase credential with the token
        const credential =  firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

        // login with credential
        firebase.auth().signInWithCredential(credential).then((currentUser)=>{
           console.info(JSON.stringify(currentUser.user.toJSON()));
        })
    })

  } catch (e) {
    console.error(e);
  }
}

// Calling this function will open Google for login.
export const phoneLogin = (callback) => {
  try {

    let confirmResult;

    // Add any configuration settings here:
    firebase.auth().signInWithPhoneNumber('+919767391775')
    .then(confirmResult => {
      console.log(confirmResult)
      callback(confirmResult)
    })

  } catch (e) {
    console.error(e);
  }
}