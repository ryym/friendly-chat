import React, { useEffect, useRef } from 'react';
import { connect } from 'redy';
import { WithDispatch } from '../types';
import {
  SendMessage,
  SubscribeMessageFeed,
  SendImage,
  InputMessage,
} from '../../store/actions';
import { State } from '../../state';
import { SavedMessage } from '../../backend/types';
import { MessageItem } from './MessageItem';
import { MessageForm } from './MessageForm';
import { ImageForm } from './ImageForm';

export type Props = Readonly<{
  userSignedIn: boolean;
  message: string;
  messages: SavedMessage[];
}>;

const unsubscribeAsync = (promise: Promise<() => void>) => () => {
  promise.then(unsubscribe => unsubscribe());
};

export const _MessageList = ({
  dispatch,
  userSignedIn,
  message,
  messages,
}: WithDispatch<Props>) => {
  useEffect(() => {
    const { promise } = dispatch(SubscribeMessageFeed);
    return unsubscribeAsync(promise);
  }, []);

  const messageList = useRef<HTMLDivElement>(null);

  const sendMessage = (msg: string) => {
    dispatch(SendMessage, msg).promise.then(() => {
      const list = messageList.current!;
      list.scrollTop = list.scrollHeight;
    });
  };

  return (
    <div
      id="messages-card"
      className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
    >
      <div className="mdl-card__supporting-text mdl-color-text--grey-600">
        <div id="messages" ref={messageList}>
          {messages.map(msg => (
            <MessageItem message={msg} key={msg.id} />
          ))}
        </div>
        <MessageForm
          message={message}
          onMessageChange={msg => dispatch(InputMessage, msg)}
          onSubmit={sendMessage}
        />
        <ImageForm
          userSignedIn={userSignedIn}
          onSubmit={file => dispatch(SendImage, file)}
        />
      </div>
    </div>
  );
};

export const MessageList = connect(({ user, messageInput, messages }: State) => {
  return {
    userSignedIn: user != null,
    message: messageInput,
    messages,
  };
})(_MessageList);
