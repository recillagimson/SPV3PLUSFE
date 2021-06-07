/**
 * firebase integration
 */
import firebase from 'firebase/app';
import 'firebase/remote-config';
import 'firebase/analytics';

const firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: 'AIzaSyDBrRJKoJ2Xce30wNTdpSDcCczwYIQ-mes',
        authDomain: 'squidpay-e3dc0.firebaseapp.com',
        projectId: 'squidpay-e3dc0',
        storageBucket: 'squidpay-e3dc0.appspot.com',
        messagingSenderId: '352810134401',
        appId: '1:352810134401:web:48d06e7d7132f57b70d680',
        measurementId: 'G-S362YFZDXS',
      }
    : {
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
