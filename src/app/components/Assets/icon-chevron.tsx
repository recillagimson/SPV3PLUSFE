/**
 * Foreign Exchange SVG
 */
import * as React from 'react';

type Props = {
  style: React.CSSProperties;
};

const IconChevron = ({ style }: Props) => {
  return (
    <span style={style}>
      <svg
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.46875 1C4.78125 0.71875 5.25 0.71875 5.53125 1L9.78125 5.25C10.0938 5.5625 10.0938 6.03125 9.78125 6.3125L9.09375 7.03125C8.78125 7.3125 8.3125 7.3125 8.03125 7.03125L5 4L2 7.03125C1.71875 7.3125 1.21875 7.3125 0.9375 7.03125L0.21875 6.3125C-0.0625 6.03125 -0.0625 5.5625 0.21875 5.25L4.46875 1Z"
          fill="#526372"
        />
      </svg>
    </span>
  );
};

export default IconChevron;
