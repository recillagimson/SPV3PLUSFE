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
import Grid from 'app/components/Elements/Grid';
import Card from 'app/components/Elements/Card/Card';

import { selectUser } from 'app/App/slice/selectors';

// From this folder
import Wrapper from './Wrapper';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectData } from './slice/selectors';
import { numberCommas } from 'app/components/Helpers';

export function GenerateQR() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

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

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    // Check amount if it's valid
    if (amount.value === '') {
      error = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'Oops! This field cannot be empty.',
      });
    }

    // Check amount if it's less than
    if (parseFloat(amount.value) <= 0) {
      error = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'You entered invalid amount.',
      });
    }

    if (!error) {
      const data = {
        amount: parseFloat(amount.value),
      };

      // dispatch payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

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

  return (
    <>
      <ProtectedContent>
        <Helmet>
          <title>Generate QR Code</title>
        </Helmet>

        <Wrapper id="generateQR">
          {loading && <Loading position="absolute" />}
          <Card title="Generate QR Code" size="medium">
            <Field>
              {showForm && (
                <>
                  <Label>Enter Amount</Label>
                  <InputTextWrapper>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount.value}
                      min={0}
                      autoComplete="off"
                      onChange={e =>
                        setAmount({
                          value: e.currentTarget.value,
                          error: false,
                          errormsg: '',
                        })
                      }
                      hidespinner
                    />
                    <span>PHP</span>
                  </InputTextWrapper>

                  {amount.error && (
                    <>
                      <ErrorMsg formError>{amount.errormsg}</ErrorMsg>
                    </>
                  )}

                  <br />

                  <Flex justifyContent="flex-end">
                    <Button
                      type="submit"
                      color="primary"
                      size="medium"
                      variant="contained"
                      onClick={onSubmit}
                    >
                      <FontAwesomeIcon icon={faQrcode} />
                      <span className="ml-2">Generate QR Code</span>
                    </Button>
                  </Flex>
                </>
              )}

              {isSuccess && (
                <>
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
                  <br />

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
                  <Grid
                    columns="1fr 1fr"
                    gap="10px"
                    justifyItems="center"
                    className="grid"
                  >
                    <div>Amount Requested</div>
                    <div>
                      PHP{' '}
                      {amount.value !== ''
                        ? numberCommas(amount.value)
                        : amount.value}
                    </div>
                  </Grid>
                  <br />
                  <Flex justifyContent="center">
                    <Button
                      type="button"
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={downloadQR}
                    >
                      <FontAwesomeIcon icon={faQrcode} />
                      <span className="ml-2">Download QR Code</span>
                    </Button>
                  </Flex>
                </>
              )}
            </Field>
          </Card>
        </Wrapper>
      </ProtectedContent>
    </>
  );
}
