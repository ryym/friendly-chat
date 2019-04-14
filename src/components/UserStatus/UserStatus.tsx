import React from 'react';

export type Props = Readonly<{
  user?: any; // TODO: Define user type.
}>;

export const UserStatus = ({ user }: Props) => {
  return (
    <div id="user-container">
      {user && (
        <>
          <div id="user-pic" />
          <div id="user-name" />
          <button
            id="sign-out"
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
          >
            Sign-out
          </button>
        </>
      )}
      {user == null && (
        <button
          id="sign-in"
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
        >
          <i className="material-icons">account_circle</i>
          Sign-in with Google
        </button>
      )}
    </div>
  );
};
