import React from 'react';
import IconButton from 'app/components/Elements/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddMoneyItem(props) {
  const { onClick, name } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 0',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <span style={{ flex: 1 }}>{name}</span>
      <IconButton>
        <FontAwesomeIcon icon="angle-right" style={{ fontSize: '20px' }} />
      </IconButton>
    </div>
  );
}
