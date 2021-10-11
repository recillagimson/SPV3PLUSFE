import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Box from 'app/components/Box';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import AddQrCodeImg from 'app/components/Assets/add_qr_code.png';
import SpLogoHorizontal from 'app/components/Assets/sp-logo-horizontal.png';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import H3 from 'app/components/Elements/H3';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import tierUpgrade from 'app/components/Assets/tier_upgrade.png';
// #region assets
import Facebook from 'app/components/Assets/fb.png';
import Bluetooth from 'app/components/Assets/bluetooth.png';
import Discord from 'app/components/Assets/discord.png';
import GMail from 'app/components/Assets//gmail.png';
import Instagram from 'app/components/Assets/instagram.png';
import Messenger from 'app/components/Assets/messenger.png';
import Viber from 'app/components/Assets/viber.png';
import comingSoon from 'app/components/Assets/coming-soon.png';
// #endregion assets
import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';
import QrReceiveMoney from 'app/components/Assets/QrReceiveMoney';
import QrPayMoney from 'app/components/Assets/QrPayMoney';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import Dialog from 'app/components/Dialog';
import Field from 'app/components/Elements/Fields';
import Grid from '@material-ui/core/Grid';
import Button from 'app/components/Elements/Button';

// styles
import * as S from './styled/QrPages';
import useFetch from 'utils/useFetch';
import { numberCommas } from 'app/components/Helpers';
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/App/slice/selectors';
import AddAmountForm from './components/AddAmountForm';
import SuccessSentDialog from './components/SuccessSentDialog';
import ScanQrInfo from './components/ScanQrInfo';
import QrUserInfo from './components/QrUserInfo';
import { TierIDs } from 'app/components/Helpers/Tiers';

type Keys =
  | 'landing'
  | 'generate-qr'
  | 'receive-money'
  | 'receive-money-qr-code'
  | 'upload-qr-code'
  | 'send-enter-amount'
  | 'pay-via-qr-code'
  | 'add-amount';
export function QrPages() {
  const { response, goFetch } = useFetch();
  const qrRef = React.useRef<any>(null);
  const history = useHistory();
  const user: any = useSelector(selectUser);
  const [showUpgrade, setShowUpgrade] = React.useState(false);
  const { response: receiveResponse, goFetch: receiveGoFetch } = useFetch();
  const { response: scanQrResponse, goFetch: scanQrFetch } = useFetch();
  const {
    response: validateSendResponse,
    error: validateError,
    goFetch: validateFetch,
  } = useFetch();
  const { response: sendMoneyResponse, goFetch: sendMoneyFetch } = useFetch();

  const [showSendSucess, setShowSendSucces] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (sendMoneyResponse && typeof sendMoneyResponse === 'object') {
      setShowSendSucces(true);
    }
  }, [sendMoneyResponse]);

  const sendMoney = React.useCallback(
    ({ email, mobile_number, amount, message }) => {
      const data = {
        ...(email ? { email } : { mobile_number }),
        amount,
        message: message ?? '',
      };
      sendMoneyFetch(
        '/send/money',
        'POST',
        JSON.stringify(data),
        '',
        true,
        true,
      );
    },
    [sendMoneyFetch],
  );

  React.useEffect(() => {
    if (validateSendResponse && typeof validateSendResponse === 'object') {
      const { email, mobile_number, amount, message } = validateSendResponse;
      sendMoney({ email, mobile_number, amount, message });
    }
  }, [validateSendResponse, sendMoney]);

  const [isFailedDialog, setFailedDialog] = React.useState(false);
  const uploadError = React.useMemo(() => {
    let errors: string[] = [];
    if (validateError) {
      if (validateError?.errors) {
        setFailedDialog(true);
        Object.keys(validateError.errors).forEach(key => {
          const error = validateError.errors[key][0];
          errors.push(error as string);
        });
      }
    } else {
      setFailedDialog(false);
    }
    return errors;
  }, [validateError]);

  const [imageSource, setSource] = React.useState({ value: '', key: '' });

  const renderQrCode = React.useCallback((value, key) => {
    if (value) {
      QRCode.toDataURL(value)
        .then(result => {
          setSource({ value: result, key });
        })
        .catch(e => console.log(e));
    }

    return null;
  }, []);

  const imageCode = React.useMemo(() => {
    if (imageSource?.value) {
      const { value, key } = imageSource;
      return (
        <>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            href={value}
            style={{ visibility: 'hidden' }}
            download
            className={`Qr-${key}`}
          />
          <img
            src={value}
            alt="qr-code"
            width="200px"
            height="200px"
            style={{ margin: '0 auto' }}
          />
        </>
      );
    }
    return <></>;
  }, [imageSource]);

  const [amount, setAmount] = React.useState<{
    value: string;
    error: boolean;
    errormsg: string;
  }>({
    value: '',
    error: false,
    errormsg: '',
  });
  const [purpose, setPurpose] = React.useState({
    value: '',
  });
  const [showShare, setShowShare] = React.useState(false);
  const dashData: any = useSelector(selectDashData);
  const [activeStep, setActiveStep] = React.useState<Keys>('landing');

  const clickSetStep = (step: Keys) => (event: React.SyntheticEvent) => {
    event.preventDefault();
    setActiveStep(step);
  };

  let isBronze = false;
  if (
    user &&
    user.user_account &&
    user.user_account.tier_id &&
    user.user_account.tier_id !== ''
  ) {
    isBronze = user.user_account.tier_id === TierIDs.bronze;
  }
  const downloadQR = (key?: string) => {
    const downloadLink: any = document.querySelector(`.Qr-${key}`);
    if (downloadLink) downloadLink.click();
  };

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  const receiveMoneyQrCode = receiveResponse?.id;

  React.useEffect(() => {
    if (receiveMoneyQrCode && typeof receiveMoneyQrCode !== 'undefined') {
      renderQrCode(receiveMoneyQrCode, 'receive-money');
      setActiveStep('receive-money-qr-code');
    }
  }, [receiveMoneyQrCode, renderQrCode]);

  React.useEffect(() => {
    goFetch('/send/money/get/qr', 'GET', '', '', true, true);
  }, [goFetch]);

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
        ...(purpose.value && { purpose: purpose.value }),
      };
      receiveGoFetch(
        '/send/money/generate/qr',
        'POST',
        JSON.stringify(data),
        '',
        true,
        true,
      );
    }
  };

  const handleErrorFile = e => {
    console.log(e);
  };

  const handleScanFile = React.useCallback(
    result => {
      if (result) {
        const data = {
          id: result,
        };

        scanQrFetch(
          '/send/money/scan/qr',
          'POST',
          JSON.stringify(data),
          '',
          true,
          true,
        );
      }
    },
    [scanQrFetch],
  );

  const [newAmount, setNewAmount] = React.useState<string>('');

  const handleValidateSendMoney = React.useCallback(() => {
    const {
      email,
      amount: scanAmount,
      mobile_number,
      message,
    } = scanQrResponse;

    const data = {
      ...(mobile_number ? { mobile_number } : { email }),
      amount: scanAmount > 0 ? scanAmount : newAmount,
      ...(message && { message }),
    };
    validateFetch(
      '/send/money/validate',
      'POST',
      JSON.stringify(data),
      '',
      true,
      true,
    );
  }, [scanQrResponse, validateFetch, newAmount]);

  React.useEffect(() => {
    if (!isEmpty(scanQrResponse)) {
      const { amount } = scanQrResponse;
      if (amount && amount > 0) {
        setActiveStep('upload-qr-code');
      } else {
        setActiveStep('send-enter-amount');
      }
    }
  }, [scanQrResponse]);

  const onScanFile = () => {
    if (qrRef) {
      if (qrRef.current) {
        qrRef?.current?.openImageDialog();
      }
    }
  };

  const activeLayout = React.useMemo(() => {
    switch (activeStep) {
      case 'landing':
        return (
          <Flex justifyContent="flex-start">
            <S.ButtonWrapper
              role="button"
              onClick={
                isBronze ? () => setShowUpgrade(true) : () => onScanFile()
              }
            >
              <img
                src={AddQrCodeImg}
                alt="add qr code"
                width="100px"
                height="100px"
                loading="lazy"
              />
              <Paragraph align="center" weight="light">
                Upload Qr Code
              </Paragraph>
            </S.ButtonWrapper>
            <S.ButtonWrapper
              role="button"
              onClick={clickSetStep('generate-qr')}
            >
              <img
                src={AddQrCodeImg}
                alt="add qr code"
                width="100px"
                height="100px"
                loading="lazy"
              />
              <Paragraph align="center" weight="light">
                Generate Qr Code
              </Paragraph>
            </S.ButtonWrapper>
            <QrReader
              ref={qrRef}
              delay={3000}
              style={{ width: '0%' }}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
          </Flex>
        );
      case 'generate-qr':
        return (
          <Flex justifyContent="flex-start">
            <S.ButtonWrapper
              role="button"
              onClick={function () {
                renderQrCode(response?.qr_code, 'receive-money');
                setActiveStep('receive-money');
              }}
            >
              <QrReceiveMoney />
              <Paragraph align="center" weight="light">
                Receive Money via QR
              </Paragraph>
            </S.ButtonWrapper>
            <S.ButtonWrapper
              role="button"
              onClick={clickSetStep('pay-via-qr-code')}
            >
              <QrPayMoney />
              <Paragraph align="center" weight="light">
                Pay via QR
              </Paragraph>
            </S.ButtonWrapper>
          </Flex>
        );
      case 'receive-money':
        return (
          <Field id="qrCodeDisplay" style={{ maxWidth: 400, margin: '0 auto' }}>
            <span className="text-center">
              <QrUserInfo />
              <Grid container justify="center" direction="column" spacing={2}>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={clickSetStep('add-amount')}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Amount
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => downloadQR('receive-money')}
                  >
                    <FontAwesomeIcon icon={faQrcode} />
                    &nbsp; Download QR Code
                  </Button>
                </Grid>
              </Grid>
            </span>
          </Field>
        );
      case 'add-amount':
        return (
          <AddAmountForm
            scanQr={false}
            {...{ amount, setAmount, balanceInfo, purpose, setPurpose }}
          />
        );
      case 'receive-money-qr-code':
        return (
          <Field id="qrCodeDisplay" style={{ maxWidth: 400, margin: '0 auto' }}>
            <span className="text-center">
              <QrUserInfo amount={amount.value} />
              <Grid container justify="center" direction="column" spacing={2}>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => downloadQR('receive-money')}
                  >
                    <FontAwesomeIcon icon={faQrcode} />
                    &nbsp; Download QR Code
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => setShowShare(true)}
                  >
                    <FontAwesomeIcon icon={faShare} />
                    &nbsp; Share
                  </Button>
                </Grid>
              </Grid>
            </span>
          </Field>
        );
      case 'pay-via-qr-code':
        return (
          <section className="text-center" style={{ width: '100%' }}>
            <div style={{ width: '382px', margin: '0 auto' }}>
              <img src={comingSoon} alt="Coming Soon!" loading="lazy" />
              <S.Title>Coming Soon</S.Title>
              <p style={{ margin: 0 }}>
                Hey Squidee! Come back soon for more efficient and convenient
                cashless experience.
              </p>
              <Button
                style={{ margin: '24px 0 0' }}
                fullWidth
                onClick={clickSetStep('generate-qr')}
                variant="contained"
                color="primary"
              >
                Back to Generate QR Code
              </Button>
            </div>
          </section>
        );
      case 'upload-qr-code':
        return (
          <ScanQrInfo scanQrResponse={scanQrResponse} newAmount={newAmount} />
        );
      case 'send-enter-amount':
        return (
          <ScanQrInfo
            scanQrResponse={scanQrResponse}
            enterAmount
            amount={amount}
            balanceInfo={balanceInfo}
            setAmount={setAmount}
          />
        );
      default:
        return null;
    }
  }, [
    activeStep,
    isBronze,
    handleScanFile,
    amount,
    balanceInfo,
    purpose,
    scanQrResponse,
    newAmount,
    renderQrCode,
    response.qr_code,
  ]);

  const cardTitle = React.useMemo((): string => {
    switch (activeStep) {
      case 'receive-money':
        return 'Personal QR Code';
      case 'add-amount':
        return 'Add Amount';
      case 'receive-money-qr-code':
        return 'Personal QR Code';
      case 'pay-via-qr-code':
        return 'Pay via QR Code';
      case 'upload-qr-code':
        return 'Confirm Payment';
      default:
        return 'QR Code';
    }
  }, [activeStep]);

  return (
    <ProtectedContent>
      <Helmet>
        <title>QR Qode</title>
      </Helmet>
      <Box
        title={cardTitle}
        titleBorder
        withPadding
        footerBorder={activeStep === 'add-amount'}
        footerAlign={activeStep === 'add-amount' ? 'right' : 'center'}
        footer={
          <>
            {activeStep === 'add-amount' && (
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="large"
                onClick={onSubmit}
              >
                Save
              </Button>
            )}
            {activeStep === 'upload-qr-code' && (
              <div style={{ width: 382, margin: '0 auto' }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  color="primary"
                  onClick={handleValidateSendMoney}
                >
                  Confirm Payment
                </Button>
              </div>
            )}
            {activeStep === 'send-enter-amount' && (
              <div style={{ width: 382, margin: '0 auto' }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  color="primary"
                  disabled={Number(amount.value) <= 0}
                  onClick={() => {
                    setNewAmount(amount.value);
                    setActiveStep('upload-qr-code');
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        }
      >
        {(activeStep === 'receive-money' ||
          activeStep === 'receive-money-qr-code') && (
          <Flex justifyContent="center">{imageCode}</Flex>
        )}
        {activeLayout}
      </Box>
      <Dialog show={showShare} size="small">
        <div className="text-center" style={{ padding: '25px 0' }}>
          <section style={{ padding: '0 25px' }}>
            <img
              src={SpLogoHorizontal}
              alt="add qr code"
              width="150px"
              height="53.75px"
            />
            {imageCode}
            <p style={{ margin: '15px 0 34px' }}>
              <strong>Share QR Code</strong>
            </p>
          </section>
          <section style={{ padding: '0 16px' }}>
            <Grid container justify="center">
              {/* top row */}
              <Grid item md={3}>
                <img
                  src={Facebook}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  News Feed
                </Paragraph>
              </Grid>
              <Grid item md={3}>
                <img
                  src={Messenger}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Messenger
                </Paragraph>
              </Grid>
              <Grid item md={3}>
                <img
                  src={Discord}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Discord
                </Paragraph>
              </Grid>
              <Grid item md={3}>
                <img
                  src={Viber}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Viber
                </Paragraph>
              </Grid>
              {/* bottom row */}
              <Grid item md={3}>
                <img
                  src={Instagram}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Direct Message
                </Paragraph>
              </Grid>
              <Grid item md={3}>
                <img
                  src={GMail}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Gmail
                </Paragraph>
              </Grid>
              <Grid item md={3}>
                <img
                  src={Bluetooth}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Bluetooth
                </Paragraph>
              </Grid>
              <Grid item md={3}>
                <img
                  src={Instagram}
                  alt="add qr code"
                  width="48px"
                  height="48px"
                  style={{ marginBlockEnd: '10px' }}
                />
                <Paragraph align="center" size="xsmall">
                  Instagram
                </Paragraph>
              </Grid>
            </Grid>
          </section>
          <section style={{ padding: '0 48px' }}>
            <Button
              style={{ margin: '10px 0 0' }}
              onClick={() => setShowShare(false)}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </section>
        </div>
      </Dialog>
      <Dialog show={showUpgrade} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img
            src={tierUpgrade}
            alt="Upgrade your tier to unlock other services"
          />
          <H3 margin="30px 0 10px">Oops!</H3>
          <p style={{ marginBottom: 35 }}>
            Uh-no! You need to upgrade your account to unlock other SquidPay
            services.
          </p>
          <Button
            fullWidth
            onClick={() => history.push('/tiers')}
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginBottom: '10px',
            }}
          >
            Upgrade Now
          </Button>
          <Button
            fullWidth
            onClick={() => setShowUpgrade(false)}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Upgrade Later
          </Button>
        </div>
      </Dialog>
      {/* Failed transaction dailog  */}
      <Dialog show={isFailedDialog} size="small">
        <S.DetailsWrapper padding="15px">
          <div className="text-center">
            <CircleIndicator size="medium" color="danger">
              <FontAwesomeIcon icon="times" />
            </CircleIndicator>
            <H3 margin="15px 0 10px">Transaction Error</H3>
            <p>
              {Array.isArray(uploadError)
                ? uploadError[uploadError.length - 1]
                : uploadError}
            </p>
            <Button
              fullWidth
              onClick={() => {
                setFailedDialog(false);
              }}
              variant="outlined"
              color="secondary"
              size="large"
            >
              Cancel
            </Button>
          </div>
        </S.DetailsWrapper>
      </Dialog>
      {/* Success Sent Dialog */}
      <SuccessSentDialog
        name={`${sendMoneyResponse?.first_name ?? ''} ${
          sendMoneyResponse?.middlename ?? ''
        } ${sendMoneyResponse?.last_name ?? ''}`}
        show={showSendSucess}
        setShow={setShowSendSucces}
        {...sendMoneyResponse}
      />
    </ProtectedContent>
  );
}
