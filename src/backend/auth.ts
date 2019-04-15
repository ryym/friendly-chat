import firebase from 'firebase/app';
import 'firebase/auth';
import { DEFAULT_USER_PHOTO_URL } from '../constants';

export interface User {
  readonly uid: string | null;
  readonly displayName: string;
  readonly photoURL: string;
}

export const subscribeAuthenticationChange = (
  observer: (user: User | null) => void
): firebase.Unsubscribe => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      observer({
        uid: user.uid,
        displayName: user.displayName!, // XXX
        photoURL: user.photoURL || DEFAULT_USER_PHOTO_URL,
      });
    } else {
      observer(null);
    }
  });
};

export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const signOut = () => {
  firebase.auth().signOut();
};
