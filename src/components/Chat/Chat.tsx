import React from 'react';
import { MessageList } from '../MessageList';

export const Chat = () => {
  return (
    <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">
      <MessageList />
    </div>
  );
};
