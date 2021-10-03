import * as React from 'react';
import { selectUser } from 'app/App/slice/selectors';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
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
    <Grid
      container
      justify="center"
      spacing={2}
      style={{ marginBlockEnd: '48px' }}
    >
      <Grid item md={3} justify="flex-start">
        <span>Name</span>
      </Grid>
      <Grid item md={2} />
      <Grid item md={7}>
        {typeof profile === 'object'
          ? `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
          : ''}
      </Grid>
      {/* mobile number or email */}
      <Grid item md={3} justify="flex-start">
        <span>
          {profile.user_account.mobile_number ? 'Mobile Number' : 'Email'}
        </span>
      </Grid>
      <Grid item md={2} />
      <Grid item md={7}>
        {profile &&
          Object.keys(profile).length > 0 &&
          profile.user_account &&
          maskCharacter(
            profile.user_account.mobile_number || profile.user_account.email,
          )}
      </Grid>
      {/* amount */}
      {amount && (
        <>
          <Grid item md={3} justify="flex-start">
            <span>Amount</span>
          </Grid>
          <Grid item md={2} />
          <Grid item md={7} justify="flex-end">
            <span>PHP {amount !== '' ? numberCommas(amount) : 0}</span>
          </Grid>
        </>
      )}
    </Grid>
  );
}
