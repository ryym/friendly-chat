import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { WithDispatch } from '../types';
import {
  SendMessage,
  SubscribeMessageFeed,
  SendImage,
  InputMessage,
  DisplayError,
} from '../../store/actions';
import { State } from '../../state';
import { SavedMessage } from '../../backend/types';
import { MessageItem } from './MessageItem';
import { MessageForm } from './MessageForm';
import { ImageForm } from './ImageForm';
import { unsubscribeAsync } from '../../lib/unsubscribe-async';
import { Dispatch } from 'redux';

export type Props = Readonly<{
  userSignedIn: boolean;
  message: string;
  messages: SavedMessage[];
}>;

const doNothing = () => {};

export const _MessageList = ({
  dispatch,
  userSignedIn,
  message,
  messages,
}: WithDispatch<Props>) => {
  subscribeMessageFeed(dispatch);

  const messageList = useRef<HTMLDivElement>(null);
  adjustMessageListScrollPos(messages, messageList);

  const sendMessage = (msg: string) => {
    dispatch(SendMessage(msg))
      .promise.then(() => {
        dispatch(InputMessage(''));
      })
      .catch(doNothing);
  };

  const sendImage = (files: File[]): boolean => {
    if (!userSignedIn) {
      dispatch(DisplayError(new Error('you must sign in first')));
      return false;
    }

    const file = files[0];
    if (file == null) {
      return false;
    }

    if (!file.type.match('image.*')) {
      dispatch(DisplayError(new Error('invalid file type')));
      return false;
    }

    dispatch(SendImage(file));
    return true;
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
          onMessageChange={msg => dispatch(InputMessage(msg))}
          onSubmit={sendMessage}
        />
        <ImageForm onSubmit={sendImage} />
      </div>
    </div>
  );
};

const subscribeMessageFeed = (dispatch: Dispatch) => {
  useEffect(() => {
    const { promise } = dispatch(SubscribeMessageFeed());
    return unsubscribeAsync(promise);
  }, []);
};

const adjustMessageListScrollPos = (
  messages: SavedMessage[],
  messageList: React.RefObject<HTMLElement | null>
) => {
  const messagesRef = useRef<typeof messages>([]);
  useEffect(() => {
    if (messagesRef.current.length !== messages.length) {
      const list = messageList.current!;
      list.scrollTop = list.scrollHeight;
    }
    messagesRef.current = messages;
  }, [messages]);
};

export const MessageList = connect(({ user, messageInput, messages }: State) => {
  return {
    userSignedIn: user != null,
    message: messageInput,
    messages,
  };
})(_MessageList);
