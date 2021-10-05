/**
 * firebase integration
 */
import firebase from 'firebase/app';
import 'firebase/remote-config';
import 'firebase/analytics';

const appFirebase = process.env.REACT_APP_FIREBASE;
const firebaseConfig = appFirebase ? JSON.parse(appFirebase) : '';

// initialize firebase onetime
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// enable if we will integrate the analytics
const analytics = firebaseConfig && firebase.analytics();

const remoteConfig = firebaseConfig && firebase.remoteConfig();

if (remoteConfig) {
  remoteConfig.settings = {
    fetchTimeoutMillis: 30000,
    minimumFetchIntervalMillis: 60, // set minimum interval
  };
}

export { firebase, remoteConfig, analytics };
