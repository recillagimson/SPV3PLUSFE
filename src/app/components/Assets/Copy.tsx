/**
 * Foreign Exchange SVG
 */
import * as React from 'react';

type Props = {
  toCopy: string | number;
};

export default function Copy({ toCopy }: Props) {
  const copyText = () => {
    if (toCopy) {
      const Navigator = window.navigator;
      if (Navigator != null) {
        Navigator.clipboard.writeText(String(toCopy));
      }
    }
  };

  return (
    <svg
      style={{
        cursor: 'pointer',
      }}
      role="button"
      onClick={e => copyText()}
      width="14"
      height="38"
      viewBox="0 0 14 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 25H4.75C3.78125 25 3 24.2188 3 23.25V14H0.75C0.3125 14 0 14.3438 0 14.75V26.25C0 26.6875 0.3125 27 0.75 27H9.25C9.65625 27 10 26.6875 10 26.25V25ZM10 14.25V11H4.75C4.3125 11 4 11.3438 4 11.75V23.25C4 23.6875 4.3125 24 4.75 24H13.25C13.6562 24 14 23.6875 14 23.25V15H10.75C10.3125 15 10 14.6875 10 14.25ZM13.75 13.2812L11.7188 11.25C11.5625 11.0938 11.375 11 11.1875 11H11V14H14V13.8125C14 13.625 13.9062 13.4375 13.75 13.2812Z"
        fill="#526372"
      />
    </svg>
  );
}
