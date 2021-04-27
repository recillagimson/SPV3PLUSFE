/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
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

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectResendCodeLoading,
  selectResendCodeError,
  selectResendCodeData,
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
  // const { actions } = useContainerSaga();
  // const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  // const success = useSelector(selectData);

  const CTA_ITEMS = [
    {
      header: 'Receive Instantly Free',
      icon: PesonetLogo,
      items: ['Select partner banks', 'STransaction limit is PHP 50,000'],
    },
    {
      header: 'Receive Instantly Free',
      icon: InstapayLogo,
      items: [
        'Transfers made before the 12:30 PM cut off are processed within the same banking day.',
        'Transactions after cut off or on holidays are processed the next banking day.',
      ],
    }
  ];

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <S.Wrapper>
            <p>To bank account</p>
            <S.CTAWrapper>
              {CTA_ITEMS.map((cta, i) => (
                <S.SendCTA key={i} onClick={(e: any) => setSteps(1)}>
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
                <Button size="medium" color="secondary" variant="outlined" onClick={() => setSteps(1)}>
                  Back
                </Button>
                <Button size="medium" color="primary" variant="contained" onClick={() => setSteps(3)}>
                  Next
                </Button>
              </S.FormFooter>
            </S.FormWrapper>
          </S.Wrapper>
        );
      case 3:
        return (
          <S.Wrapper display="flex" direction="column" alignment="center">
            <S.ContentImage
              src={InstapayLogo}
              alt="Instapay"
              margin="0 0 20px"
            />
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
              <S.ReviewListItem>
                <p>Purpose</p>
                <p>Fund Transfer</p>
              </S.ReviewListItem>
              <S.ReviewListItem>
                <p>Send Receipt To</p>
                <p>None</p>
              </S.ReviewListItem>
              <S.ReviewListItem>
                <p>Service Fee</p>
                <p>PHP 150.00</p>
              </S.ReviewListItem>
              <S.ReviewListItem>
                <p>Date</p>
                <p>10 August 2020, 03:46 PM</p>
              </S.ReviewListItem>
              <S.ReviewTotal>
                <p>Total amount plus service fee</p>
                <p>PHP 4150.00</p>
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
            </S.ReviewContainer>
          </S.Wrapper>
        );
      case 4:
        return (
          <S.Wrapper display="flex" direction="column" alignment="center">
            <S.ContentImage src={LockLogo} alt="Lock Logo" margin="0 0 20px" />
            <H3>Enter 4-Digit one time PIN</H3>
            <p>The one time pin code has been sent to your mobile number</p>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => setSteps(4)}
              fullWidth
            >
              Verify
            </Button>
            <p>
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
    </React.Fragment>
  );
}
