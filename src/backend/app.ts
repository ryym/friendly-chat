import firebase from 'firebase/app';

export const initializeBackend = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDhDgoVYUTwO0Jys858I0LrGWYRM9XLdY4',
    authDomain: 'friendlychat2-3345b.firebaseapp.com',
    databaseURL: 'https://friendlychat2-3345b.firebaseio.com',
    projectId: 'friendlychat2-3345b',
    storageBucket: 'friendlychat2-3345b.appspot.com',
    messagingSenderId: '1009353431094',
  });
};
