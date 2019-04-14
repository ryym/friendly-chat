import React from 'react';
import { MessageList } from '../MessageList';
import { SnackBar } from '../SnackBar';

export const Chat = () => {
  return (
    <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">
      <MessageList />
      <SnackBar />
    </div>
  );
};
