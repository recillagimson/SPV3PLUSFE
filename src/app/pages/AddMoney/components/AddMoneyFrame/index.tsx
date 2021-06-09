import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import IframeComm from 'react-iframe-comm';
import AddMoneyStatus from '../AddMoneyStatus';
import Button from 'app/components/Elements/Button';

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
  const [status, setStatus] = React.useState('');
  const [save, setSave] = React.useState(false);

  const attributes = {
    src: urlLink,
    width: '540',
    height: '450',
    title: title,
  };

  // iframe has loaded
  const onReady = e => {
    if (canAccessIFrame(frame.current)) {
      setSave(true);
    }
  };

  React.useEffect(() => {
    if (save) {
      const currentIframe: any = frame.current;
      const urlParams = new URLSearchParams(
        currentIframe._frame.contentWindow.location.search,
      );
      const statusParam = urlParams.get('status');
      setStatus(statusCodeHandler(statusParam));
    }
  }, [save]);

  React.useEffect(() => {
    if (status) {
      setSave(false);
    }
  }, [status]);

  // S - SUCCESS
  // F - FAILED
  // P - PENDING
  // U - PENDING
  // R - FAILED
  // K - FAILED
  // V - FAILED
  // A - FAILED

  const statusCodeHandler = status => {
    switch (status) {
      case 'P':
      case 'U':
        return 'pending';
      case 'F':
      case 'R':
      case 'K':
      case 'V':
      case 'A':
        return 'failed';
      case 'S':
        return 'success';
      default:
        return 'failed';
    }
  };

  const canAccessIFrame = iframe => {
    try {
      // console.log('iframe', iframe._frame.contentWindow.location.search);
      return true;
      // eslint-disable-next-line no-unreachable
    } catch (err) {
      console.log(err);
      return false;
    }
  };

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
        {status ? (
          <AddMoneyStatus success={status} onClick={onClick} />
        ) : (
          <>
            <IframeComm
              ref={frame}
              attributes={attributes}
              handleReady={onReady}
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
          </>
        )}
      </div>
    </ModalBody>
  );
}
