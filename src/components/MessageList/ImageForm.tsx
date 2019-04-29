import React, { useRef } from 'react';

type Submitted = boolean;

export type Props = Readonly<{
  onSubmit: (files: File[]) => Submitted;
}>;

export const ImageForm = ({ onSubmit }: Props) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const submitted = onSubmit([...event.target.files!]);
    if (submitted) {
      // Clear the selection in the file picker input.
      form.current!.reset();
    }
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
