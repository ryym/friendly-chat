import React, { useState } from 'react';

export type Props = Readonly<{
  onSubmit: (message: string) => void;
}>;

export const MessageForm = ({ onSubmit: handleSubmit }: Props) => {
  const [message, setMessage] = useState('');

  return (
    <form
      id="message-form"
      action="#"
      onSubmit={event => {
        event.preventDefault();
        handleSubmit(message);
      }}
    >
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input
          className="mdl-textfield__input"
          type="text"
          id="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <label className="mdl-textfield__label" htmlFor="message">
          Message...
        </label>
      </div>
      <button
        id="submit"
        disabled={message == ''}
        type="submit"
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      >
        Send
      </button>
    </form>
  );
};
