import React from 'react';

export const ImageForm = () => {
  return (
    <form id="image-form" action="#">
      <input id="mediaCapture" type="file" accept="image/*" capture="camera" />
      <button
        id="submitImage"
        title="Add an image"
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
      >
        <i className="material-icons">image</i>
      </button>
    </form>
  );
};
