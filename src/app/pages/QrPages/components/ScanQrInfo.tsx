import React from 'react';
import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';
import AddAmountForm from './AddAmountForm';
import {
  numberCommas,
  maskMobileNumber,
  maskEmailAddress,
  validateEmail,
} from 'app/components/Helpers';
import Grid from '@material-ui/core/Grid';

type Amount = {
  value: string;
  error: boolean;
  errormsg: string;
};

type Props = {
  enterAmount?: boolean;
  amount?: Amount;
  newAmount?: string;
  balanceInfo?: string;
  setAmount?: React.Dispatch<React.SetStateAction<Amount>>;
  scanQrResponse: {
    mobile_number: string;
    amount?: string;
    message: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    name_extension: string;
    selfie_location: string;
    user_account_id: string;
    email: string;
  };
};

export default function ScanQrInfo({
  scanQrResponse,
  enterAmount,
  balanceInfo,
  newAmount,
  amount: enteredAmount,
  setAmount,
}: Props) {
  const {
    first_name,
    last_name,
    mobile_number,
    amount,
    email,
  } = scanQrResponse;

  const maskCharacter = (username = '') => {
    if (validateEmail(username)) {
      return maskEmailAddress(username);
    }
    return maskMobileNumber(username);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Flex
        direction="row"
        justifyContent="center"
        style={{ width: '100%', marginBlockEnd: '72px' }}
      >
        <Flex direction="column">
          <Paragraph align="center" weight="light" style={{ width: '100%' }}>
            {first_name} {last_name}
          </Paragraph>
          <Paragraph align="center" weight="light" style={{ width: '100%' }}>
            {maskCharacter(mobile_number || email)}
          </Paragraph>
        </Flex>
      </Flex>
      <Grid
        container
        justify="center"
        style={{ marginBlockEnd: '48px', width: '473px', maxWidth: '473px' }}
      >
        {!enteredAmount && (
          <>
            <Grid item container md={3} justify="flex-start">
              <Flex direction="column" alignItems="flex-start">
                {(amount || newAmount) && <span> Amount</span>}
              </Flex>
            </Grid>
            <Grid item md={2} />
            <Grid item md={7}>
              <Flex direction="column" alignItems="flex-end">
                {amount && (
                  <span>
                    PHP{' '}
                    {amount || newAmount
                      ? numberCommas(newAmount ? String(newAmount) : amount)
                      : 0}
                  </span>
                )}
              </Flex>
            </Grid>
          </>
        )}
      </Grid>
      {!enterAmount && (
        <Flex
          direction="row"
          justifyContent="center"
          style={{ width: '100%', marginBlockStart: '90px' }}
        >
          <Flex direction="column">
            <Paragraph align="center" weight="light" style={{ width: '100%' }}>
              Total Amount
            </Paragraph>
            <Paragraph align="center" weight="light" style={{ width: '100%' }}>
              <span>
                PHP{' '}
                {amount || newAmount
                  ? numberCommas(newAmount ? String(newAmount) : amount)
                  : 0}
              </span>
            </Paragraph>
          </Flex>
        </Flex>
      )}
      {enterAmount && enteredAmount && setAmount && balanceInfo && (
        <AddAmountForm
          scanQr
          amount={enteredAmount}
          setAmount={setAmount}
          balanceInfo={balanceInfo}
        />
      )}
    </Flex>
  );
}
