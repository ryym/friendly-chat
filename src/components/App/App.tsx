import React, { useEffect } from 'react';
import { connect, Dispatch } from 'redy';
import { WithDispatch } from '../types';
import { Header } from '../Header';
import { Chat } from '../Chat';
import { SubscribeAuthenticationChange } from '../../store/actions';

export const _App = ({ dispatch }: WithDispatch<{}>) => {
  useEffect(() => subscribeAuthChange(dispatch), []);

  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header />
      <main className="mdl-layout__content mdl-color--grey-100">
        <Chat />
      </main>
    </div>
  );
};

export const App = connect(() => ({}))(_App);

// Subscribe user authentication state changes such as sign-in and sign-out.
const subscribeAuthChange = (dispatch: Dispatch): (() => void) => {
  let _unsubscribe: firebase.Unsubscribe | null = null;

  const unsubscribe = () => {
    if (_unsubscribe != null) {
      _unsubscribe();
      _unsubscribe = null;
    }
  };

  dispatch(SubscribeAuthenticationChange).promise.then(nextUnsubscribe => {
    unsubscribe();
    _unsubscribe = nextUnsubscribe;
  });

  return unsubscribe;
};
