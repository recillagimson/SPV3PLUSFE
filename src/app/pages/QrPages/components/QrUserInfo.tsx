import * as React from 'react';
import { selectUser } from 'app/App/slice/selectors';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Flex from 'app/components/Elements/Flex';
import {
  maskEmailAddress,
  maskMobileNumber,
  numberCommas,
  validateEmail,
} from 'app/components/Helpers';

type Props = {
  amount?: string;
};

export default function QrUserInfo(props: Props) {
  const amount = props?.amount;
  const profile: any = useSelector(selectUser);
  const maskCharacter = (username: string) => {
    if (validateEmail(username)) {
      return maskEmailAddress(username);
    }
    return maskMobileNumber(username);
  };

  return (
    <Grid container justify="center" style={{ marginBlockEnd: '48px' }}>
      <Grid item md={3} justify="flex-start">
        <Flex direction="column" alignItems="flex-start">
          <span style={{ marginBlockEnd: '16px' }}>Name</span>
          <span
            style={{
              ...(amount && { marginBlockEnd: '16px' }),
            }}
          >
            {profile.user_account.mobile_number ? 'Mobile Number' : 'Email'}
          </span>
          {amount && <span> Amount</span>}
        </Flex>
      </Grid>
      <Grid item md={2} />
      <Grid item md={7}>
        <Flex direction="column" alignItems="flex-end">
          {typeof profile === 'object' ? (
            <span
              style={{ marginBlockEnd: '16px' }}
            >{`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}</span>
          ) : (
            ''
          )}
          <span
            style={{
              ...(amount && { marginBlockEnd: '16px' }),
            }}
          >
            {profile &&
              Object.keys(profile).length > 0 &&
              profile.user_account &&
              maskCharacter(
                profile.user_account.mobile_number ||
                  profile.user_account.email,
              )}
          </span>
          {amount && (
            <span> PHP {amount !== '' ? numberCommas(amount) : 0}</span>
          )}
        </Flex>
      </Grid>
    </Grid>
  );
}
