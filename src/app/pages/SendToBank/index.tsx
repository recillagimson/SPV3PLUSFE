/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import ReactCodeInput from 'react-code-input';

import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import H3 from 'app/components/Elements/H3';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectPesonetData,
} from './slice/selectors';

// Assets
import InstapayLogo from 'app/components/Assets/instapay.svg';
import PesonetLogo from 'app/components/Assets/pesonet.svg';
import LockLogo from 'app/components/Assets/icon-lock.svg';

// Helpers
import { BANK_ICONS } from './helpers';

// Styled Components
import * as S from './SendToBank.style';
import { AnyARecord } from 'dns';

export function SendToBank() {
  const [steps, setSteps] = React.useState(0);
  const [isOpen, setOpen] = React.useState(false);
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const banks = useSelector(selectPesonetData);

  const selectBankTransactionType = (type: string) => {
    dispatch(actions.getPesonetBanksLoading(type));
    setSteps(steps + 1);
  };

  const CTA_ITEMS = [
    {
      id: 'instapay',
      header: 'Receive Instantly Free',
      icon: InstapayLogo,
      items: ['Select partner banks', 'Transaction limit is PHP 50,000'],
    },
    {
      id: 'pesonet',
      header: 'Receive by end of the day for FREE',
      icon: PesonetLogo,
      items: [
        'Transfers made before the 12:30 PM cut off are processed within the same banking day.',
        'Transactions after cut off or on holidays are processed the next banking day.',
      ],
    },
  ];

  const renderReviewContainer = (type?: string) => {
    const isSuccessReview = type === 'successReview';

    return (
      <S.ReviewContainer>
        <S.ReviewListItem>
          <p>Bank</p>
          <p>BPI Family Bank</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Number</p>
          <p>3021654789652</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Name</p>
          <p>Juan Dela Cruz</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Amount</p>
          <p>PHP 4000.00</p>
        </S.ReviewListItem>
        {!isSuccessReview && (
          <S.ReviewListItem>
            <p>Purpose</p>
            <p>Fund Transfer</p>
          </S.ReviewListItem>
        )}
        <S.ReviewListItem>
          <p>Send Receipt To</p>
          <p>None</p>
        </S.ReviewListItem>
        {isSuccessReview ? (
          <S.ReviewListItem>
          <p>Transaction Number</p>
          <p>000001</p>
        </S.ReviewListItem>
        ) : (
          <React.Fragment>
            <S.ReviewListItem>
              <p>Service Fee</p>
              <p>PHP 150.00</p>
            </S.ReviewListItem>
            <S.ReviewListItem>
              <p>Date</p>
              <p>10 August 2020, 03:46 PM</p>
            </S.ReviewListItem>
          </React.Fragment>
        )}
      </S.ReviewContainer>
    );
  };

  console.log('banks', banks);
  console.log('loading', loading);
  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <S.Wrapper>
            <p>To Bank account</p>
            <S.CTAWrapper>
              {CTA_ITEMS.map((cta, i) => (
                <S.SendCTA
                  key={i}
                  onClick={() => selectBankTransactionType(cta.id)}
                >
                  <S.SendCTAContent>
                    <p>{cta.header}</p>
                    <img src={cta.icon} alt="Instapay" />
                    <S.CTAList>
                      {cta.items.map((item, i) => (
                        <S.CTAListItem key={i}>- {item}</S.CTAListItem>
                      ))}
                    </S.CTAList>
                  </S.SendCTAContent>
                  <S.SendCTALogo>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </S.SendCTALogo>
                </S.SendCTA>
              ))}
            </S.CTAWrapper>
          </S.Wrapper>
        );
      case 1:
        return (
          <S.Wrapper>
            {BANK_ICONS.map((icon, i) => (
              <S.BankIcons
                src={icon.icon}
                alt={icon.alt}
                onClick={() => setSteps(2)}
              />
            ))}
          </S.Wrapper>
        );
      case 2:
        return (
          <S.Wrapper>
            <S.ContentImage
              src={InstapayLogo}
              alt="Instapay"
              margin="0 0 20px"
            />
            <S.FormWrapper>
              <Field>
                <Label>
                  Enter Amount <i>*</i>
                </Label>
                <Input
                  required
                  type="text"
                  value={''}
                  onChange={e => console.log('e', e)}
                  placeholder="PHP 0.00"
                />
                <ErrorMsg formError>This is a required field</ErrorMsg>
              </Field>
              <Field>
                <Label>
                  Account Name <i>*</i>
                </Label>
                <Input
                  required
                  type="text"
                  value={''}
                  onChange={e => console.log('e', e)}
                  placeholder="Type your account name..."
                />
                <ErrorMsg formError>This is a required field</ErrorMsg>
              </Field>
              <Field>
                <Label>
                  Account Number <i>*</i>
                </Label>
                <Input
                  required
                  type="text"
                  value={''}
                  onChange={e => console.log('e', e)}
                  placeholder="0000 0000 0000 0000"
                />
                <ErrorMsg formError>This is a required field</ErrorMsg>
              </Field>
              <Field>
                <Label>Send Receipt to (optional)</Label>
                <Input
                  required
                  type="text"
                  value={''}
                  onChange={e => console.log('e', e)}
                  placeholder="Enter email or mobile number (optional)"
                />
                <S.FieldSubtext>
                  You can notify the recipient by entering their email address
                  and mobile number
                </S.FieldSubtext>
              </Field>
              <Field>
                <Label>Message (optional)</Label>
                <Input
                  required
                  type="text"
                  value={''}
                  onChange={e => console.log('e', e)}
                />
              </Field>
              <S.FormFooter>
                <Button
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  onClick={() => setSteps(1)}
                >
                  Back
                </Button>
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  onClick={() => setSteps(3)}
                >
                  Next
                </Button>
              </S.FormFooter>
            </S.FormWrapper>
          </S.Wrapper>
        );
      case 3:
        return (
          <S.Wrapper
            display="flex"
            direction="column"
            alignment="center"
            width="380px"
            margin="20px auto"
          >
            <S.ContentImage src={InstapayLogo} alt="Instapay" />
            {renderReviewContainer('totalReview')}
            <S.ReviewTotal>
              <p className="total-description">Total amount plus service fee</p>
              <p className="total-amount">PHP 4150.00</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => setSteps(4)}
                fullWidth
              >
                Transfer Fund
              </Button>
            </S.ReviewTotal>
          </S.Wrapper>
        );
      case 4:
        return (
          <S.Wrapper
            display="flex"
            direction="column"
            alignment="center"
            width="400px"
            margin="20px auto"
          >
            <S.ContentImage src={LockLogo} alt="Lock Logo" margin="0 0 20px" />
            <H3>Enter 4-Digit one time PIN</H3>
            <p className="pin-description">
              The one time pin code has been sent to your mobile number
            </p>
            <Field className="code" margin="40px 0 20px">
              <ReactCodeInput
                name="verify"
                inputMode="numeric"
                type="text"
                fields={4}
                className="pin-input"
              />
            </Field>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => setOpen(true)}
              fullWidth
            >
              Verify
            </Button>
            <p className="resend-code">
              Need a new code? <span>Resend code</span>
            </p>
          </S.Wrapper>
        );
      default:
        return <React.Fragment />;
    }
  };

  const renderTitle = (step: number) => {
    switch (step) {
      case 0:
        return 'Send To Bank';
      case 1:
        return 'Select Partner Banks';
      case 2:
        return 'Bank Account';
      case 3:
        return 'Review Cash Out';
      case 4:
        return '4-Digit One Time PIN';
      case 5:
        return 'Temporary steps';
      default:
        return 'N/A';
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Send To Bank" />
      <Box title={renderTitle(steps)} titleBorder={true}>
        {renderSteps(steps)}
      </Box>
      {/* Show success Dialog */}
      <Dialog show={isOpen} size="small">
        <Logo size="medium" />
        <S.SuccessWrapper>
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <p className="success-message">Money Successful sent to</p>
          {renderReviewContainer('successReview')}
          <S.ReviewTotal>
            <p className="total-description">Total amount plus service fee</p>
            <p className="total-amount">PHP 4150.00</p>
            <p className="service-fee">Service Fee: PHP 150.00</p>
          </S.ReviewTotal>
          <Logo size="small" />
          <p className="date">04 March 2021, 3:26 PM</p>
        </S.SuccessWrapper>
        <div className="text-center">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={() => setOpen(false)}
            fullWidth
          >
            Close
          </Button>
          <S.ConfirmationMessage>
            "You will receive a sms notification for your confirmed
            transaction".
          </S.ConfirmationMessage>
        </div>
      </Dialog>
      {/* show error Dialog */}
      <Dialog show={false} size="small">
        <div className="text-center">
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Oops! System Error</H3>
          <p>Please try again later</p>
          <Button
            fullWidth
            onClick={() => setOpen(false)}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
