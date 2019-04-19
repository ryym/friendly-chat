import React, { useRef } from 'react';

export type Props = Readonly<{
  userSignedIn: boolean;
  onSubmit: (file: File) => void;
}>;

export const ImageForm = ({ userSignedIn, onSubmit }: Props) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!userSignedIn) {
      // TODO: Show error message.
      throw new Error('you must sign in first');
    }

    const file = event.target.files![0];
    if (file == null) {
      return;
    }

    // Clear the selection in the file picker input.
    form.current!.reset();

    if (!file.type.match('image.*')) {
      // TODO: Show error message.
      throw new Error('invalid file type');
    }

    onSubmit(file);
  };

  return (
    <form ref={form} id="image-form" action="#">
      <input
        ref={filePicker}
        id="mediaCapture"
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleImageSelect}
      />
      <button
        type="button"
        id="submitImage"
        title="Add an image"
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
        onClick={() => {
          // Launch the file picker.
          filePicker.current!.click();
        }}
      >
        <i className="material-icons">image</i>
      </button>
    </form>
  );
};
