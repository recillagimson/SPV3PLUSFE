import * as React from 'react';
import useFetch from 'utils/useFetch';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paragraph from 'app/components/Elements/Paragraph';
import Box from 'app/components/Box';
import { Helmet } from 'react-helmet-async';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import QRCode from 'qrcode.react';
import Dialog from 'app/components/Dialog';
import Field from 'app/components/Elements/Fields';
import Grid from '@material-ui/core/Grid';
import Button from 'app/components/Elements/Button';
import QrUserInfo from '../QrPages/components/QrUserInfo';
import Flex from 'app/components/Elements/Flex';
import SpLogoHorizontal from 'app/components/Assets/sp-logo-horizontal.png';
import Facebook from 'app/components/Assets/fb.png';
import Bluetooth from 'app/components/Assets/bluetooth.png';
import Discord from 'app/components/Assets/discord.png';
import GMail from 'app/components/Assets//gmail.png';
import Instagram from 'app/components/Assets/instagram.png';
import Messenger from 'app/components/Assets/messenger.png';
import Viber from 'app/components/Assets/viber.png';
import Loading from 'app/components/Loading';

export function MyQrCodePage() {
  const { response, goFetch, loading } = useFetch();
  React.useEffect(() => {
    goFetch('/send/money/get/qr', 'GET', '', '', true, true);
  }, [goFetch]);

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

  const [showShare, setShowShare] = React.useState(false);
  return (
    <ProtectedContent>
      <Helmet>
        <title>My QR Qode</title>
      </Helmet>
      {loading && <Loading position="fixed" />}
      <Box title="Personal QR Code" titleBorder withPadding>
        {response?.qr_code && (
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
                    variant="outlined"
                    color="secondary"
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
                    variant="contained"
                    color="primary"
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
        )}
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
              value={response?.qr_code}
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
