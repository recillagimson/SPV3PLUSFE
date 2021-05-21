import React from 'react';
import Button from 'app/components/Elements/Button';
import styled, { keyframes } from 'styled-components/macro';
import IframeComm from 'react-iframe-comm';

const revealAnimation = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const ModalBody = styled.div`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 0.3s ease-in 0s forwards ${revealAnimation};
`;

export default function AddMoneyFrame(props) {
  const { urlLink, onClick, title } = props;
  const frame = React.useRef(null);
  const [currentUrl, setCurrentUrl] = React.useState(null);
  const [save, setSave] = React.useState(false);

  const attributes = {
    src: urlLink,
    width: '540',
    height: '450',
    title: title,
  };

  const postMessageData = 'hello iframe';

  // parent received a message from iframe
  const onReceiveMessage = e => {
    console.log('onReceiveMessage', e);
  };

  // iframe has loaded
  const onReady = e => {
    if (canAccessIFrame(frame.current)) {
      console.log('true');
    }
  };

  React.useEffect(() => {
    if (save) {
      const currentIframe: any = frame.current;
      setCurrentUrl(currentIframe.src);
    }
  }, [save]);

  React.useEffect(() => {
    if (currentUrl) {
      setSave(false);
    }
  }, [currentUrl]);

  const iframeHandler = e => {
    if (!save) {
      setSave(true);
    }
  };

  function canAccessIFrame(iframe) {
    var html = null;
    try {
      // deal with older browsers
      console.log('iframe', iframe._frame.contentWindow);
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      html = doc.body.innerHTML;
    } catch (err) {
      console.log(err);
    }

    return html !== null;
  }

  return (
    <ModalBody>
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
        <IframeComm
          ref={frame}
          attributes={attributes}
          postMessageData={postMessageData}
          handleReady={onReady}
          handleReceiveMessage={onReceiveMessage}
        />
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{ width: '380px', marginTop: '25px' }}
          onClick={onClick}
        >
          Close
        </Button>
      </div>
    </ModalBody>
  );
}
