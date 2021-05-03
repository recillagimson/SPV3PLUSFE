import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import AddMoneyItem from './components/AddMoneyItem';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

const AddMoneyBody = styled.div`
  padding: 25px;
  > *:first-child {
    border-top: 1px solid #f3f4f9;
  }
  > * {
    border-bottom: 1px solid #f3f4f9;
  }
`;

export function AddMoney() {
  const history = useHistory();
  return (
    <ProtectedContent>
      <Box title="Web Banking" titleBorder>
        <AddMoneyBody>
          <AddMoneyItem
            name="Dragonpay"
            onClick={() => history.push('/addmoney/dragonpay')}
          />
          <AddMoneyItem name="BPI" onClick={() => alert('clicked')} />
        </AddMoneyBody>
      </Box>
    </ProtectedContent>
  );
}
