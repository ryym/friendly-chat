import React, { useEffect } from 'react';
import { connect } from 'redy';
import { WithDispatch } from '../types';
import { SendMessage, SubscribeMessageFeed } from '../../store/actions';
import { State } from '../../state';
import { SavedMessage } from '../../backend/types';
import { MessageItem } from './MessageItem';
import { MessageForm } from './MessageForm';
import { ImageForm } from './ImageForm';

export type Props = Readonly<{
  messages: SavedMessage[];
}>;

const unsubscribeAsync = (promise: Promise<() => void>) => () => {
  promise.then(unsubscribe => unsubscribe());
};

export const _MessageList = ({ dispatch, messages }: WithDispatch<Props>) => {
  useEffect(() => {
    const { promise } = dispatch(SubscribeMessageFeed);
    return unsubscribeAsync(promise);
  }, []);

  return (
    <div
      id="messages-card"
      className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
    >
      <div className="mdl-card__supporting-text mdl-color-text--grey-600">
        <div id="messages">
          {messages.map(msg => (
            <MessageItem message={msg} key={msg.id} />
          ))}
        </div>
        <MessageForm onSubmit={msg => dispatch(SendMessage, msg)} />
        <ImageForm />
      </div>
    </div>
  );
};

export const MessageList = connect(({ messages }: State) => ({ messages }))(_MessageList);
