import React from 'react';
import { UserStatus } from '../UserStatus';

export const Header = () => {
  return (
    <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
      <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
        <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
          <h3>
            <i className="material-icons">chat_bubble_outline</i> Friendly Chat
          </h3>
        </div>
        <UserStatus />
      </div>
    </header>
  );
};
