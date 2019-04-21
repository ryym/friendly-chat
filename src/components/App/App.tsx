import React, { useEffect } from 'react';
import { connect } from 'redy';
import { WithDispatch } from '../types';
import { Header } from '../Header';
import { Chat } from '../Chat';
import { SubscribeAuthenticationChange } from '../../store/actions';
import { unsubscribeAsync } from '../../lib/unsubscribe-async';

export const _App = ({ dispatch }: WithDispatch<{}>) => {
  useEffect(() => {
    const { promise } = dispatch(SubscribeAuthenticationChange);
    return unsubscribeAsync(promise);
  }, []);

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
