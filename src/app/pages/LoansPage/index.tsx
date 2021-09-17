import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/App/slice/selectors';
import CollapsibleContent from './components/CollapsibleContent';
// assets
import LoansComingSoon from 'app/components/Assets/LoansComingSoon';
import Copy from 'app/components/Assets/Copy';
// partner logos
import RfscLogo from 'app/components/Assets/RFSC_Logo.png';
// styles
import * as S from './styled/LoansPage';
import useFetch from 'utils/useFetch';

export function LoansPage() {
  const profile: any = useSelector(selectUser);
  const [selection, setSelection] = React.useState<'partners' | 'my-loans'>(
    'partners',
  );

  const { loading, response, goFetch } = useFetch();

  const [selectedPartner, setSelectedPartner] = React.useState<string>('');
  const [showExitModal, setShowExitModal] = React.useState<boolean>(false);
  const [partnerStep, setPartnerStep] = React.useState<number>(0);

  React.useEffect(() => {
    if (partnerStep === 1) {
      goFetch('/loans/get/reference_number', 'GET', '', '', true, true);
    }
  }, [partnerStep, goFetch]);

  const isPartner = React.useMemo(() => {
    return selection === 'partners';
  }, [selection]);

  const selectedContent = React.useMemo(() => {
    switch (isPartner) {
      case true:
        return (
          <S.PartnerTile
            role="button"
            onClick={e => setSelectedPartner('rfsc')}
          >
            <img src={RfscLogo} alt="RFSC logo" />
          </S.PartnerTile>
        );
      default:
        return (
          <React.Fragment>
            <LoansComingSoon />
            <Paragraph align="center" weight="bold" margin="24px 0 0">
              Hi {profile?.first_name}
            </Paragraph>
            <Paragraph align="center" weight="bold">
              This page will be coming soon!
            </Paragraph>
          </React.Fragment>
        );
    }
  }, [profile.first_name, isPartner]);

  const renderPartnerStep = React.useMemo(() => {
    switch (partnerStep) {
      case 0:
        return <CollapsibleContent setPartnerStep={setPartnerStep} />;
      case 1:
        return (
          <React.Fragment>
            <Flex direction="column">
              <Paragraph
                weight="light"
                align="left"
                style={{ fontSize: '14px' }}
              >
                You will be redirected to the loan partner’s page. Please use
                this generated SquidPay ID number as an identifier.
              </Paragraph>
              <Paragraph weight="light" align="left">
                Squidpay ID number
              </Paragraph>
              <S.ReferenceNumberContainer>
                <span>{response?.reference_number}</span>
                {!loading && <Copy toCopy={response?.reference_number} />}
              </S.ReferenceNumberContainer>
            </Flex>
            <Flex justifyContent="flex-end" style={{ margin: '24px 0 0' }}>
              {!loading && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => setShowExitModal(true)}
                >
                  Next
                </Button>
              )}
            </Flex>
          </React.Fragment>
        );
      default:
        return null;
    }
  }, [partnerStep, setPartnerStep, response, loading]);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Loans</title>
      </Helmet>
      <Box
        title={selection === 'partners' ? 'Loan Partners' : 'My Loans'}
        titleBorder
        withPadding
      >
        {!selectedPartner ? (
          <React.Fragment>
            <Flex
              justifyContent="flex-start"
              style={{ marginBlockEnd: '50px' }}
            >
              <Button
                color="secondary"
                variant={isPartner ? 'contained' : 'outlined'}
                onClick={e => setSelection('partners')}
              >
                Loan Partners
              </Button>
              <Button
                color="secondary"
                variant={!isPartner ? 'contained' : 'outlined'}
                onClick={e => setSelection('my-loans')}
              >
                My Loans
              </Button>
            </Flex>
            <Flex
              direction={isPartner ? 'row' : 'column'}
              justifyContent="flex-start"
              alignItems="center"
            >
              {selectedContent}
            </Flex>
          </React.Fragment>
        ) : (
          renderPartnerStep
        )}
      </Box>
      <Dialog show={showExitModal} size="small">
        <div className="text-center" style={{ padding: '25px' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="exclamation-circle" />
          </CircleIndicator>
          <p style={{ margin: '15px 0 10px' }}>
            <strong>Leave site?</strong>
          </p>
          <p>Are you you want to leave this page?</p>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={e => {
              e.preventDefault();
              const Window = window;
              if (Window != null) {
                Window?.open(
                  'https://apps.rfc.com.ph/rfc360loans/squidpay.php',
                  '_blank',
                  'noopener,noreferrer',
                )?.focus();
                setShowExitModal(false);
              }
            }}
          >
            Leave Page
          </Button>
          <Button
            style={{ marginTop: '12px' }}
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={e => setShowExitModal(false)}
          >
            Stay on Page
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
