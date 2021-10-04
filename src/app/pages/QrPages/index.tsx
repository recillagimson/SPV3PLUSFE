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
import QRCode from 'qrcode.react';
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
import AddAmountForm from './components/AddAmountForm';
import QrUserInfo from './components/QrUserInfo';

type Keys =
  | 'landing'
  | 'generate-qr'
  | 'receive-money'
  | 'receive-money-qr-code'
  | 'pay-via-qr-code'
  | 'add-amount';
export function QrPages() {
  const { response, goFetch } = useFetch();
  const { response: receiveResponse, goFetch: receiveGoFetch } = useFetch();
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

  const downloadQR = () => {
    const canvas: any = document.getElementById('QRCode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `my-qr-code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  const receiveMoneyQrCode = receiveResponse?.id;

  React.useEffect(() => {
    if (receiveMoneyQrCode && typeof receiveMoneyQrCode !== 'undefined') {
      setActiveStep('receive-money-qr-code');
    }
  }, [receiveMoneyQrCode]);

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

  const activeLayout = React.useMemo(() => {
    switch (activeStep) {
      case 'landing':
        return (
          <Flex justifyContent="flex-start">
            <S.ButtonWrapper role="button">
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
          </Flex>
        );
      case 'generate-qr':
        return (
          <Flex justifyContent="flex-start">
            <S.ButtonWrapper
              role="button"
              onClick={clickSetStep('receive-money')}
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
            <Flex justifyContent="center">
              <QRCode
                value={response?.qr_code}
                size={200}
                id="QRCode"
                includeMargin
              />
            </Flex>
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
                    onClick={downloadQR}
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
            {...{ amount, setAmount, balanceInfo, purpose, setPurpose }}
          />
        );
      case 'receive-money-qr-code':
        return (
          <Field id="qrCodeDisplay" style={{ maxWidth: 400, margin: '0 auto' }}>
            <Flex justifyContent="center">
              <QRCode
                value={receiveMoneyQrCode}
                size={200}
                id="QRCode"
                includeMargin
              />
            </Flex>
            <span className="text-center">
              <QrUserInfo amount={amount.value} />
              <Grid container justify="center" direction="column" spacing={2}>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={downloadQR}
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
      default:
        return null;
    }
  }, [activeStep, response, amount, balanceInfo, purpose, receiveMoneyQrCode]);

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
                size="medium"
                onClick={onSubmit}
              >
                Save
              </Button>
            )}
          </>
        }
      >
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
            <QRCode
              value={receiveMoneyQrCode}
              size={200}
              id="QRCode"
              includeMargin
            />
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
              fullWidth
              onClick={() => setShowShare(false)}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </section>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
