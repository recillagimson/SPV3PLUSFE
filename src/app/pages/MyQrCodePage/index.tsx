import * as React from 'react';
import useFetch from 'utils/useFetch';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from 'app/components/Box';
import { Helmet } from 'react-helmet-async';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Field from 'app/components/Elements/Fields';
import Grid from '@material-ui/core/Grid';
import Button from 'app/components/Elements/Button';
import QrUserInfo from '../QrPages/components/QrUserInfo';
import Flex from 'app/components/Elements/Flex';
import QrCodeDisplay from 'app/components/QrCodeDisplay';
import Loading from 'app/components/Loading';

export function MyQrCodePage() {
  const { response, goFetch, loading } = useFetch();
  React.useEffect(() => {
    goFetch('/send/money/get/qr', 'GET', '', '', true, true);
  }, [goFetch]);

  const downloadQR = (key?: string) => {
    const downloadLink: any = document.querySelector(`.Qr-${key}`);
    if (downloadLink) downloadLink.click();
  };

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
              <QrCodeDisplay value={response?.qr_code} qrKey="my-qr-code" />
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
                    onClick={() => downloadQR('my-qr-code')}
                  >
                    <FontAwesomeIcon icon={faQrcode} />
                    &nbsp; Download QR Code
                  </Button>
                </Grid>
              </Grid>
            </span>
          </Field>
        )}
      </Box>
    </ProtectedContent>
  );
}
