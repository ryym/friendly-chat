import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { LOADING_IMAGE_URL } from '../constants';
import { User, Message, SavedMessage } from './types';

type MessageDoc = {
  name: string;
  profilePicUrl: string;
  text?: string;
  imageUrl?: string;
  timestamp: firebase.firestore.FieldValue;
};

const messages = () => firebase.firestore().collection('messages');

const addMessage = (message: Message) => messages().add(messageToDocument(message));

const messageToDocument = (m: Message): MessageDoc => {
  return {
    name: m.name,
    profilePicUrl: m.profilePicUrl,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ...(m.content.type === 'TEXT'
      ? { text: m.content.text }
      : { imageUrl: m.content.imageUrl }),
  };
};

export const documentToMessage = (
  id: string,
  doc: { [field: string]: any } // XXX: Not type safe
): SavedMessage => {
  return {
    id,
    timestamp: doc.timestamp ? doc.timestamp.toMillis() : null,
    name: doc.name,
    profilePicUrl: doc.profilePicUrl,
    content: doc.text
      ? { type: 'TEXT', text: doc.text }
      : { type: 'IMAGE', imageUrl: doc.imageUrl },
  };
};

export const saveMessage = (sender: User, text: string) => {
  return addMessage({
    name: sender.displayName,
    profilePicUrl: sender.photoURL,
    content: { type: 'TEXT', text },
  });
};

export const saveImage = async (sender: User, file: File) => {
  // 1 - We add a message with a loading icon that will get updated with the shared image.
  const messageRef = await addMessage({
    name: sender.displayName,
    profilePicUrl: sender.photoURL,
    content: { type: 'IMAGE', imageUrl: LOADING_IMAGE_URL },
  });

  // 2 - Upload the image to Cloud Storage.
  const filePath = `${sender.uid}/${messageRef.id}/${file.name}`;
  const fileSnapshot = await putFileToStorage(filePath, file);
  const downloadURL = await fileSnapshot.ref.getDownloadURL();

  // 3 - Update the chat message placeholder with the image's URL.
  return messageRef.update({
    imageUrl: downloadURL,
    storageUri: fileSnapshot.metadata.fullPath,
  });
};

const putFileToStorage = (path: string, file: File) => {
  return firebase
    .storage()
    .ref(path)
    .put(file);
};

export type MessageFeed =
  | { type: 'removed'; id: string }
  | { type: 'modified' | 'added'; message: SavedMessage };

export const subscribeMessageFeed = (
  consumer: (feed: MessageFeed) => void
): firebase.Unsubscribe => {
  const query = messages()
    .orderBy('timestamp', 'desc')
    .limit(12);

  return query.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        return consumer({ type: change.type, id: change.doc.id });
      } else {
        const message = documentToMessage(change.doc.id, change.doc.data());
        return consumer({ type: change.type, message });
      }
    });
  });
};
