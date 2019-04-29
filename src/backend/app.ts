import firebase from 'firebase/app';
import { config } from './config';

export const initializeBackend = () => {
  firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
  });
};
