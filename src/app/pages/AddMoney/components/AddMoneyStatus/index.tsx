import React from 'react';
import Button from 'app/components/Elements/Button';
import H3 from 'app/components/Elements/H3';

export default function AddMoneyStatus(props) {
  const { success, onClick } = props;
  return (
    <div
      style={{
        borderRadius: '10px',
        background: 'white',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {success === 'success' ? (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
            alt="SquidPay"
            className="sp-logo"
            width="150px"
            style={{ marginBottom: '25px' }}
          />
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="56" cy="56" r="32" fill="#E0AC39" />
            <path
              d="M52.1094 64.625C52.5781 65.0938 53.375 65.0938 53.8438 64.625L67.625 50.8438C68.0938 50.375 68.0938 49.5781 67.625 49.1094L65.9375 47.4219C65.4688 46.9531 64.7188 46.9531 64.25 47.4219L53 58.6719L47.7031 53.4219C47.2344 52.9531 46.4844 52.9531 46.0156 53.4219L44.3281 55.1094C43.8594 55.5781 43.8594 56.375 44.3281 56.8438L52.1094 64.625Z"
              fill="white"
            />
          </svg>
          <H3>Transaction successful</H3>
          <Button
            size="large"
            color="primary"
            variant="contained"
            style={{ width: '380px', marginTop: '25px' }}
            onClick={onClick}
          >
            Close
          </Button>
        </>
      ) : success === 'pending' ? (
        <>
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="56" cy="56" r="32" fill="#E0AC39" />
            <path
              d="M52.1094 64.625C52.5781 65.0938 53.375 65.0938 53.8438 64.625L67.625 50.8438C68.0938 50.375 68.0938 49.5781 67.625 49.1094L65.9375 47.4219C65.4688 46.9531 64.7188 46.9531 64.25 47.4219L53 58.6719L47.7031 53.4219C47.2344 52.9531 46.4844 52.9531 46.0156 53.4219L44.3281 55.1094C43.8594 55.5781 43.8594 56.375 44.3281 56.8438L52.1094 64.625Z"
              fill="white"
            />
          </svg>
          <H3>Transaction pending</H3>
          <Button
            size="large"
            color="primary"
            variant="contained"
            style={{ width: '380px', marginTop: '25px' }}
            onClick={onClick}
          >
            Close
          </Button>
        </>
      ) : (
        <>
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="56" cy="56" r="32" fill="#FF645E" />
            <path
              d="M58.3438 56L63.0312 51.3125C63.6406 50.75 63.6406 49.8125 63.0312 49.25L62 48.2188C61.4375 47.6094 60.5 47.6094 59.9375 48.2188L55.25 52.9062L50.5156 48.2188C49.9531 47.6094 49.0156 47.6094 48.4531 48.2188L47.4219 49.25C46.8125 49.8125 46.8125 50.75 47.4219 51.3125L52.1094 56L47.4219 60.7344C46.8125 61.2969 46.8125 62.2344 47.4219 62.7969L48.4531 63.8281C49.0156 64.4375 49.9531 64.4375 50.5156 63.8281L55.25 59.1406L59.9375 63.8281C60.5 64.4375 61.4375 64.4375 62 63.8281L63.0312 62.7969C63.6406 62.2344 63.6406 61.2969 63.0312 60.7344L58.3438 56Z"
              fill="white"
            />
          </svg>

          <H3>Transaction Failed</H3>
          <Button
            size="large"
            color="secondary"
            variant="outlined"
            style={{ width: '280px', marginTop: '25px' }}
            onClick={onClick}
          >
            Ok
          </Button>
        </>
      )}
    </div>
  );
}
