import firebase from 'firebase/app';

export const initializeBackend = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyD7LaZQLhvTbWkElonT_MmYFpWRTczsxKc',
    authDomain: 'friendlychat3-b33bb.firebaseapp.com',
    databaseURL: 'https://friendlychat3-b33bb.firebaseio.com',
    projectId: 'friendlychat3-b33bb',
    storageBucket: 'friendlychat3-b33bb.appspot.com',
    messagingSenderId: '974374610585',
  });
};
