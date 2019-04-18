import React from 'react';
import { SavedMessage, MessageContent } from '../../backend/types';
import { addSizeToGoogleProfilePic } from '../../lib/profile-pic';

export type Props = Readonly<{
  message: SavedMessage;
}>;

const messageContent = (content: MessageContent) => {
  switch (content.type) {
    case 'TEXT':
      return content.text;
    case 'IMAGE':
      return <img src={content.imageUrl} alt="" />;
  }
};

export const MessageItem = ({ message: msg }: { message: SavedMessage }) => {
  return (
    <div className="message-container visible">
      <div className="spacing">
        <div
          className="pic"
          style={{
            backgroundImage: `url(${addSizeToGoogleProfilePic(msg.profilePicUrl)})`,
          }}
        />
      </div>
      <div className="message">{messageContent(msg.content)}</div>
      <div className="name">{msg.name}</div>
    </div>
  );
};
