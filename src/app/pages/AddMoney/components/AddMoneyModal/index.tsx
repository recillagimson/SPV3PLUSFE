import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import AddMoneyStatus from '../AddMoneyStatus';

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

export default function AddMoneyModal(props) {
  const { success, onClick } = props;
  return (
    <ModalBody>
      <AddMoneyStatus success={success} onClick={onClick} />
    </ModalBody>
  );
}
