import React from 'react';
import QRCode from 'qrcode';

type Props = {
  value: string;
  qrKey: string;
};

export default function QrCodeDisplay(props: Props) {
  const { value, qrKey } = props;
  const [imageSource, setSource] = React.useState({ value: '', key: '' });
  const renderQrCode = React.useCallback((value, key) => {
    if (value) {
      QRCode.toDataURL(value)
        .then(result => {
          setSource({ value: result, key });
        })
        .catch(e => console.log(e));
    }

    return null;
  }, []);

  React.useEffect(() => {
    if (value && qrKey) {
      renderQrCode(value, qrKey);
    }
  }, [qrKey, renderQrCode, value]);

  const { value: imageValue, key: imageKey } = imageSource;
  return imageValue && imageKey ? (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        href={imageValue}
        style={{ visibility: 'hidden' }}
        download
        className={`Qr-${qrKey}`}
      />
      <img
        src={imageValue}
        alt="qr-code"
        width="200px"
        height="200px"
        style={{ margin: '0 auto' }}
      />
    </>
  ) : (
    <></>
  );
}
