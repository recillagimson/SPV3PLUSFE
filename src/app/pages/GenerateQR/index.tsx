import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'qrcode.react';

import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

import { UserProfileState } from 'types/Default';
import { selectLoggedInName, selectUser } from 'app/App/slice/selectors';

// From this folder
import Wrapper from './Wrapper';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';
export function GenerateQR() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success: any = useSelector(selectData);

  const profile: boolean | UserProfileState = useSelector(selectUser);
  const loginName: string = useSelector(selectLoggedInName);
  const [amount, setAmount] = React.useState({
    value: '',
    error: false,
    errormsg: '',
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showForm, setShowForm] = React.useState(true);

  const onImageCownload = () => {
    const svg: any = document.getElementById('QRCode');
    const svgData: any = new XMLSerializer().serializeToString(svg);
    const canvas: any = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const img: any = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile: any = canvas.toDataURL('image/png');
      const downloadLink: any = document.createElement('a');
      downloadLink.download = 'QRCode';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
      setAmount({ ...amount, error: true, errormsg: 'Cannot be empty' });
    }

    // Check amount if it's less than
    if (parseFloat(amount.value) <= 0) {
      error = true;
      setAmount({ ...amount, error: true, errormsg: 'Invalid Amount' });
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
      <Helmet>
        <title>Generate QR Code</title>
      </Helmet>

      <Wrapper>
        {loading && <Loading position="absolute" />}
        <Card title="Generate QR Code" size="medium">
          <Field>
            {showForm && (
              <>
                <Label>Enter Amount</Label>
                <InputTextWrapper>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={amount.value}
                    autoComplete="off"
                    onChange={e =>
                      setAmount({
                        value: e.currentTarget.value,
                        error: false,
                        errormsg: '',
                      })
                    }
                  />
                  <span>PHP</span>
                </InputTextWrapper>

                {amount.error && (
                  <>
                    <ErrorMsg formError>*{amount.errormsg}</ErrorMsg>
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
                  <QRCode value={success.id} size="200" id="QRCode" />
                </Flex>
                <br />

                <span className="text-center">
                  <H3 margin="0">
                    {typeof profile === 'object'
                      ? `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
                      : ''}
                  </H3>
                  <p style={{ margin: '0 0 20px' }}>
                    {replaceFirst7(loginName)}
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
                    {Number.isInteger(parseFloat(amount.value))
                      ? amount.value + '.00'
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
                    onClick={onImageCownload}
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
    </>
  );
}
