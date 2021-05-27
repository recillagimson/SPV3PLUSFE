/**
 * firebase integration
 */
import firebase from 'firebase/app';
import 'firebase/remote-config';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyClPmzu9EYVCcrP9gX-5Ydb4YdFIgAiVv8',
  authDomain: 'squidpay-develop.firebaseapp.com',
  projectId: 'squidpay-develop',
  storageBucket: 'squidpay-develop.appspot.com',
  messagingSenderId: '87753987041',
  appId: '1:87753987041:web:a149dbfc7f6a40e82fb8a0',
  measurementId: 'G-P7NPG9SCFK',
};

// initialize firebase onetime
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// enable if we will integrate the analytics
// firebase.analytics();

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 3600; // set minimum interval

export { firebase, remoteConfig };
