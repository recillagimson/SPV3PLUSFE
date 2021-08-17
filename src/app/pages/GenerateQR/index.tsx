import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'qrcode.react';

import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Loading from 'app/components/Loading';
import H3 from 'app/components/Elements/H3';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import Flex from 'app/components/Elements/Flex';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import Box from 'app/components/Box';

import { selectUser } from 'app/App/slice/selectors';

/** slice */
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { useContainerSaga } from './slice';
import { selectLoading, selectData } from './slice/selectors';
import { numberCommas } from 'app/components/Helpers';

export function GenerateQR() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const dashData: any = useSelector(selectDashData);

  const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const success: any = useSelector(selectData);

  const profile: any = useSelector(selectUser);
  const [amount, setAmount] = React.useState({
    value: '',
    error: false,
    errormsg: '',
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showForm, setShowForm] = React.useState(true);

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (success) {
      setShowForm(false);
      setIsSuccess(true);
    }
  }, [success]);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    if (val !== '' && !Number(val)) {
      return;
    }

    setAmount({
      value: val,
      error: false,
      errormsg: '',
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    // Check amount if it's valid
    if (amount.value === '') {
      hasError = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'Oops! This field cannot be empty.',
      });
    }

    if (amount.value !== '' && !Number(amount.value)) {
      hasError = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'Oops! Please enter only numbers.',
      });
    }

    // Check amount if it's less than
    if (parseFloat(amount.value) <= 0) {
      hasError = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'You entered invalid amount.',
      });
    }

    if (!hasError) {
      const data = {
        amount: parseFloat(amount.value),
      };
      // dispatch payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

  const downloadQR = () => {
    const canvas: any = document.getElementById('QRCode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${amount.value}-qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Replace the first 7 digit of mobile number in the receipt
  let replaceFirst7 = (username: string) => {
    return username.replace(/^.{1,7}/, m => '*'.repeat(m.length));
  };

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  return (
    <>
      <ProtectedContent>
        <Helmet>
          <title>Generate QR Code</title>
        </Helmet>

        <Box
          title="Generate QR Code"
          titleBorder
          withPadding
          footerBorder={!isSuccess}
          footerAlign={isSuccess ? 'center' : 'right'}
          footer={
            <>
              {showForm && (
                <Button
                  type="submit"
                  color="primary"
                  size="medium"
                  variant="contained"
                  onClick={onSubmit}
                >
                  <FontAwesomeIcon icon={faQrcode} />
                  &nbsp; Generate QR Code
                </Button>
              )}
              {isSuccess && (
                <Button
                  type="button"
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={downloadQR}
                >
                  <FontAwesomeIcon icon={faQrcode} />
                  &nbsp; Download QR Code
                </Button>
              )}
            </>
          }
        >
          {loading && <Loading position="absolute" />}

          {showForm && (
            <Field id="generateQRCode">
              <Label>Enter Amount</Label>
              <InputTextWrapper>
                <Input
                  type="tel"
                  placeholder="0.00"
                  value={amount.value}
                  min={0}
                  autoComplete="off"
                  onChange={onChangeAmount}
                  hidespinner
                />
                <span>PHP</span>
              </InputTextWrapper>
              <span style={{ fontSize: '12px', fontWeight: 'lighter' }}>
                Available Balance PHP {balanceInfo}
              </span>
              {amount.error && <ErrorMsg formError>{amount.errormsg}</ErrorMsg>}
            </Field>
          )}

          {isSuccess && (
            <Field
              id="qrCodeDisplay"
              style={{ maxWidth: 400, margin: '0 auto' }}
            >
              <Flex justifyContent="center">
                <QRCode
                  value={success.id}
                  size={200}
                  id="QRCode"
                  includeMargin
                  // imageSettings={{
                  //   src: `${process.env.PUBLIC_URL}/img/qrph.png`,
                  //   x: null,
                  //   y: null,
                  //   excavate: true,
                  // }}
                />
              </Flex>

              <span className="text-center">
                <H3 margin="0">
                  {typeof profile === 'object'
                    ? `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
                    : ''}
                </H3>
                <p style={{ margin: '0 0 20px' }}>
                  {profile &&
                    Object.keys(profile).length > 0 &&
                    profile.user_account &&
                    replaceFirst7(
                      profile.user_account.mobile_number ||
                        profile.user_account.email,
                    )}
                </p>
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  justifyContent: 'start',
                }}
              >
                <div>Amount Requested</div>
                <div style={{ justifySelf: 'end' }}>
                  PHP {amount.value !== '' ? numberCommas(amount.value) : 0}
                </div>
              </div>
            </Field>
          )}
        </Box>
      </ProtectedContent>
    </>
  );
}
