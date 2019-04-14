import React from 'react';
import { Header } from '../Header';
import { Chat } from '../Chat';

export const App = () => {
  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header />
      <main className="mdl-layout__content mdl-color--grey-100">
        <Chat />
      </main>
    </div>
  );
};
