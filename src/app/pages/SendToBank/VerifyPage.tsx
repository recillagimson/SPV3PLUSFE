/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'app/components/Elements/Button';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import VerifyOTP from 'app/components/VerifyOTP';
import Logo from 'app/components/Assets/Logo';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectError,
  selectFormData,
  selectValidateTransaction,
  selectSuccessSendToBank,
} from './slice/selectors';

// Helpers
import { numberWithCommas, parseToNumber } from 'utils/common';

// Assets
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';

// Styled Components
import * as S from './SendToBank.style';

export function VerifyOTPPage(props) {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const apiErrors: any = useSelector(selectError);
  const formData = useSelector(selectFormData);
  const validateTransaction = useSelector(selectValidateTransaction);
  const success = useSelector(selectSuccessSendToBank);

  const [isSuccessDialog, setSuccessDialog] = React.useState(false);
  const [isFailedDialog, setFailedDialog] = React.useState(false);
  const [errors, setErrors] = React.useState('');

  const calculateTotalAmount = parseToNumber(
    parseFloat(formData.amount) + validateTransaction?.service_fee,
  );

  React.useEffect(() => {
    if (apiErrors?.errors?.error_code?.length) {
      apiErrors?.errors?.error_code?.map(err => {
        if (err === 302) {
          setErrors('Transaction failed. Please try again.');
        } else {
          setErrors('Please try again later.');
        }

        setFailedDialog(true);
        return null;
      });
    }
  }, [apiErrors]);

  React.useEffect(() => {
    const isSuccessData = !!Object.keys(success).length;

    if (isSuccessData) {
      setSuccessDialog(true);
    }
  }, [success]);

  const renderReviewContainer = (type?: string) => {
    const isSuccessReview = type === 'successReview';

    return (
      <S.ReviewContainer>
        <S.ReviewListItem>
          <p>Bank</p>
          <p>{success.bank_name}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Number</p>
          <p>{success.account_number}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Name</p>
          <p>{success.account_name}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Amount</p>
          <p>PHP {numberWithCommas(success.amount)}</p>
        </S.ReviewListItem>
        {isSuccessReview ? (
          <React.Fragment>
            <S.ReviewListItem>
              <p>Send Receipt To</p>
              <p>{success.send_receipt_to}</p>
            </S.ReviewListItem>
            <S.ReviewListItem>
              <p>Transaction Number</p>
              <p>{success.transaction_number}</p>
            </S.ReviewListItem>
          </React.Fragment>
        ) : (
          <S.ReviewListItem>
            <p>Purpose</p>
            <p>{success.purpose}</p>
          </S.ReviewListItem>
        )}
      </S.ReviewContainer>
    );
  };

  return (
    <React.Fragment>
      <S.Wrapper
        display="flex"
        direction="column"
        alignment="center"
        width="400px"
        margin="20px auto"
      >
        <CircleIndicator size="medium" color="primary">
          <FontAwesomeIcon icon="lock" />
        </CircleIndicator>
        <H3 margin="30px 0 10px">Enter 4-Digit one time PIN</H3>
        <p className="pin-description">
          The one time pin code has been sent to your mobile number
        </p>
        <VerifyOTP
          apiURL="/auth/verify/otp"
          otpType="send2bank"
          onSuccess={() => dispatch(actions.sendToBankLoading())}
        />
        <p className="resend-code">
          Need a new code?{' '}
          <span
            onClick={() => {
              dispatch(actions.generateSendToBankOTPLoading());
            }}
          >
            Resend code
          </span>
        </p>
      </S.Wrapper>
      {/* Show success Dialog */}
      <Dialog show={isSuccessDialog} size="small">
        <S.DetailsWrapper padding="15px">
          <Logo size="medium" />
          <S.SuccessWrapper>
            <S.CuttedImageWrapper
              src={WrapperCuttedCornerTop}
              alt="Squid pay"
            />
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <p className="success-message">Money Successful sent to</p>
            {renderReviewContainer('successReview')}
            <S.ReviewTotal>
              <p className="total-description">Total amount plus service fee</p>
              <p className="total-amount">
                PHP {numberWithCommas(calculateTotalAmount)}
              </p>
              <p className="service-fee">
                Service Fee: PHP{' '}
                {parseToNumber(validateTransaction?.service_fee)}
              </p>
            </S.ReviewTotal>
            <Logo size="small" />
            <p className="date">04 March 2021, 3:26 PM</p>
            <S.CuttedImageWrapper
              src={WrapperCuttedCornerBottom}
              alt="Squid pay"
            />
          </S.SuccessWrapper>
          <div className="text-center">
            <Button
              size="medium"
              color="primary"
              variant="contained"
              onClick={() => {
                setSuccessDialog(false);
                dispatch(actions.resetTransaction());
                history.push('/dashboard');
              }}
              fullWidth
            >
              Close
            </Button>
            <S.ConfirmationMessage>
              "You will receive a sms notification for your confirmed
              transaction".
            </S.ConfirmationMessage>
          </div>
        </S.DetailsWrapper>
      </Dialog>
      {/* show error Dialog */}
      <Dialog show={isFailedDialog} size="small">
        <S.DetailsWrapper padding="15px">
          <div className="text-center">
            <CircleIndicator size="medium" color="danger">
              <FontAwesomeIcon icon="times" />
            </CircleIndicator>
            <H3 margin="15px 0 10px">Oops! System Error</H3>
            <p>{errors}</p>
            <Button
              fullWidth
              onClick={() => {
                setFailedDialog(false);
                dispatch(actions.resetTransaction());
                history.push('/dashboard');
              }}
              variant="outlined"
              color="secondary"
              size="large"
            >
              Ok
            </Button>
          </div>
        </S.DetailsWrapper>
      </Dialog>
    </React.Fragment>
  );
}
