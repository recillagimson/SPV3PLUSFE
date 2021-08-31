import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import BuyLoad from 'app/components/Assets/BuyLoad';
import BuyEPINS from 'app/components/Assets/BuyEPINS';

import ButtonFlexWrapper from 'app/pages/DashboardPage/ButtonFlex';
import DashboardButton from 'app/pages/DashboardPage/Button';

export function BuyLoadIndexPage() {
  const history = useHistory();

  return (
    <ProtectedContent>
      <Helmet>
        <title>Buy Load</title>
      </Helmet>
      <Box title="Buy Load" titleBorder withPadding>
        <ButtonFlexWrapper>
          <DashboardButton border onClick={() => history.push('/buy/load')}>
            <BuyLoad />
            Buy Load
          </DashboardButton>

          <DashboardButton border onClick={() => history.push('/buy/epins')}>
            <BuyEPINS />
            Buy EPINS
          </DashboardButton>
        </ButtonFlexWrapper>
      </Box>
    </ProtectedContent>
  );
}
