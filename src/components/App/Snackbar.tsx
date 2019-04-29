import React, { useRef, useEffect } from 'react';

export type Props = Readonly<{
  message: string | null;
}>;

const displayMessage = (element: HTMLElement, message: string) => {
  // https://getmdl.io/components/snackbar/index.html
  (element as any).MaterialSnackbar.showSnackbar({
    message,
    timeout: 2000,
  });
};

export const Snackbar = ({ message }: Props) => {
  const snackbar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message != null) {
      displayMessage(snackbar.current!, message);
    }
  }, [message]);

  return (
    <div ref={snackbar} className="mdl-js-snackbar mdl-snackbar">
      <div className="mdl-snackbar__text" />
      <button className="mdl-snackbar__action" type="button" />
    </div>
  );
};
