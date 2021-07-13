/**
 * firebase integration
 */
import firebase from 'firebase/app';
import 'firebase/remote-config';
import 'firebase/analytics';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE || '');

// initialize firebase onetime
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// enable if we will integrate the analytics
const analytics = firebase.analytics();

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 3600; // set minimum interval

export { firebase, remoteConfig, analytics };
