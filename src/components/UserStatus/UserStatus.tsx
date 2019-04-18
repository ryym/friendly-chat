import React from 'react';
import { connect } from 'redy';
import { State } from '../../state';
import { User } from '../../backend/types';
import { WithDispatch } from '../types';
import { SignIn, SignOut } from '../../store/actions';
import { addSizeToGoogleProfilePic } from '../../lib/profile-pic';

export type Props = Readonly<{
  user: User | null;
}>;

export const _UserStatus = ({ user, dispatch }: WithDispatch<Props>) => {
  return (
    <div id="user-container">
      {user && (
        <>
          <div
            id="user-pic"
            style={{
              backgroundImage: `url(${addSizeToGoogleProfilePic(user.photoURL)})`,
            }}
          />
          <div id="user-name">{user.displayName}</div>
          <button
            id="sign-out"
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
            onClick={() => dispatch(SignOut)}
          >
            Sign-out
          </button>
        </>
      )}
      {user == null && (
        <button
          id="sign-in"
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
          onClick={() => dispatch(SignIn)}
        >
          <i className="material-icons">account_circle</i>
          Sign-in with Google
        </button>
      )}
    </div>
  );
};

export const UserStatus = connect(({ user }: State) => ({ user }))(_UserStatus);
