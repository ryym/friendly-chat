import { action, effect } from 'redy';
import * as auth from '../../backend/auth';
import * as messages from '../../backend/messages';
import { User, SavedMessage } from '../../backend/types';
import { Thunk } from '../types';
import { State } from '../../state';

export const SignIn = () => effect(async () => auth.signIn());

export const SignOut = () => effect(async () => auth.signOut());

export const SignInOk = (user: User) => action(user);

export const SignOutOk = () => action(null);

export const SubscribeAuthenticationChange = () =>
  effect(async dispatch => {
    return auth.subscribeAuthenticationChange(user => {
      if (user) {
        dispatch(SignInOk, user);
        dispatch(SaveDeviceToken);
      } else {
        dispatch(SignOutOk);
      }
    });
  });

export const SendMessage = (message: string) =>
  effect<Thunk>(async (_dispatch, state) => {
    const user = assertUserSignedIn(state());
    await messages.saveMessage(user, message);
  });

export const SendImage = (file: File) =>
  effect<Thunk>(async (_dispatch, state) => {
    const user = assertUserSignedIn(state());
    await messages.saveImage(user, file);
  });

export const SubscribeMessageFeed = () =>
  effect<Thunk>(async dispatch => {
    messages.subscribeMessageFeed(feed => {
      if (feed.type === 'removed') {
        dispatch(DeleteMessage, feed.id);
      } else {
        dispatch(DisplayMessage, feed.message);
      }
    });
  });

export const DeleteMessage = (id: string) => action(id);

export const DisplayMessage = (message: SavedMessage) => action(message);

export const SaveDeviceToken = () =>
  effect<Thunk>(async (_dispatch, _state) => {
    // TODO: Get and save device token.
    // const user = assertUserSignedIn(state());
    // const token = await notif.getDeviceToken();
    // if (token) {
    //   await notif.saveDeviceToken(user, token);
    // } else {
    //   await notif.requestNotifcationsPermissions();
    //   dispatch(SaveDeviceToken);
    // }
  });

const assertUserSignedIn = (state: State): User => {
  if (state.user == null) {
    throw new Error('user does not sign in yet.');
  }
  return state.user;
};
