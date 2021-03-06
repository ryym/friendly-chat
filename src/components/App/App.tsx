import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { WithDispatch } from '../types';
import { Header } from '../Header';
import { MessageList } from '../MessageList';
import { SubscribeAuthenticationChange } from '../../store/actions';
import { unsubscribeAsync } from '../../lib/unsubscribe-async';
import { State } from '../../state';
import { Snackbar } from './Snackbar';

export type Props = Readonly<{
  error: Error | null;
}>;

export const _App = ({ error, dispatch }: WithDispatch<Props>) => {
  useEffect(() => {
    const { promise } = dispatch(SubscribeAuthenticationChange());
    return unsubscribeAsync(promise);
  }, []);

  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header />
      <main className="mdl-layout__content mdl-color--grey-100">
        <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">
          <MessageList />
        </div>
      </main>
      <Snackbar message={error ? error.message : null} />
    </div>
  );
};

export const App = connect(({ error }: State) => ({ error }))(_App);
