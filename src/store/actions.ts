import { action, effect } from 'redy';
import * as auth from '../backend/auth';
import * as messages from '../backend/messages';
import * as notif from '../backend/notification';
import { User, SavedMessage } from '../backend/types';
import { Thunk } from './types';
import { State } from '../state';

export const SignIn = effect('SIGN_IN', () => async () => auth.signIn());

export const SignOut = effect('SIGN_OUT', () => async () => auth.signOut());

export const SignInOk = action('SIGN_IN_OK', (user: User) => user);

export const SignOutOk = action('SIGN_OUT_OK', () => {});

export const SubscribeAuthenticationChange = effect(
  'SUBSCRIBE_AUTHENTICATION_CHANGE',
  (): Thunk<firebase.Unsubscribe> => async dispatch => {
    return auth.subscribeAuthenticationChange(user => {
      if (user) {
        dispatch(SignInOk(user));
        dispatch(SaveDeviceToken());
      } else {
        dispatch(SignOutOk());
      }
    });
  }
);

export const InputMessage = action('INPUT_MESSAGE', (msg: string) => msg);

export const SendMessage = effect(
  'SEND_MESSAGE',
  (message: string): Thunk => async (_dispatch, state) => {
    const user = assertUserSignedIn(state());
    await messages.saveMessage(user, message);
  }
);

export const SendImage = effect(
  'SEND_IMAGE',
  (file: File): Thunk => async (_dispatch, state) => {
    const user = assertUserSignedIn(state());
    await messages.saveImage(user, file);
  }
);

export const SubscribeMessageFeed = effect(
  'SUBSCRIBE_MESSAGE_FEED',
  (): Thunk<firebase.Unsubscribe> => async dispatch => {
    return messages.subscribeMessageFeed(feed => {
      if (feed.type === 'removed') {
        dispatch(DeleteMessage(feed.id));
      } else {
        dispatch(DisplayMessage(feed.message));
      }
    });
  }
);

export const DeleteMessage = action('DELETE_MESSAGE', (id: string) => id);

export const DisplayMessage = action('DISPLAY_MESSAGE', (msg: SavedMessage) => msg);

export const SaveDeviceToken = effect(
  'SAVE_DEVICE_TOKEN',
  (): Thunk => async (dispatch, state) => {
    const user = assertUserSignedIn(state());
    const token = await notif.getDeviceToken();
    if (token) {
      await notif.saveDeviceToken(user, token);
    } else {
      await notif.requestNotifcationsPermissions();
      dispatch(SaveDeviceToken());
    }
  }
);

export const DisplayError = action('DISPLAY_ERROR', (err: Error) => err);

const assertUserSignedIn = (state: State): User => {
  if (state.user == null) {
    throw new Error('You must sign-in first');
  }
  return state.user;
};
