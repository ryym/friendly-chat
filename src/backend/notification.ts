import firebase from 'firebase/app';
import 'firebase/messaging';
import { User } from './types';

export const getDeviceToken = (): Promise<string | null> => {
  return firebase.messaging().getToken();
};

export const saveDeviceToken = (user: User, token: string): Promise<void> => {
  return fcmTokens()
    .doc(token)
    .set({ uid: user.uid });
};

const fcmTokens = () => firebase.firestore().collection('fcmTokens');

export const requestNotifcationsPermissions = (): Promise<void> => {
  return firebase.messaging().requestPermission();
};
