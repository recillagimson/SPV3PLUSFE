import * as React from 'react';

import VerifyOTP from 'app/components/VerifyOTP';
import Logo from 'app/components/Assets/Logo';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// slice
import { useContainerSaga } from './slice';
import {
  selectSuccessToBank,
  selectValidateTransaction,
  selectFormData,
} from './slice/selectors';

// Helpers
import { numberWithCommas, parseToNumber } from 'utils/common';

// Styled Components
import * as S from './SendToBankUBP.style';

// Assets
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';
import { maskCharacters } from 'app/components/Helpers';

export default function OTP() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const success = useSelector(selectSuccessToBank);
  const formData = useSelector(selectFormData);
  const validateTransaction = useSelector(selectValidateTransaction);
  const [isSuccessDialog, setSuccessDialog] = React.useState(false);

  React.useEffect(() => {
    const isSuccessData = !!Object.keys(success).length;
    if (isSuccessData) {
      setSuccessDialog(true);
    }
  }, [success]);

  const calculateTotalAmount = parseToNumber(
    parseFloat(formData?.amount) + parseFloat(validateTransaction?.service_fee),
  );

  const renderReviewContainer = (type?: string) => {
    const isSuccessReview = type === 'successReview';

    return (
      <S.ReviewContainer>
        <S.ReviewListItem>
          <p>Bank</p>
          <p>{success?.bank_name}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Number</p>
          <p>{maskCharacters(success?.account_number)}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Name</p>
          <p>{success?.account_name}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Amount</p>
          <p>PHP {numberWithCommas(success.amount)}</p>
        </S.ReviewListItem>
        {isSuccessReview ? (
          <React.Fragment>
            <S.ReviewListItem>
              <p>Send Receipt To</p>
              <p>{success?.send_receipt_to}</p>
            </S.ReviewListItem>
            <S.ReviewListItem>
              <p>Particulars</p>
              <p>{success?.particulars}</p>
            </S.ReviewListItem>
            <S.ReviewListItem>
              <p>Remarks</p>
              <p>{success?.remarks}</p>
            </S.ReviewListItem>
            <S.ReviewListItem>
              <p>Transaction Number</p>
              <p>{success?.transaction_number}</p>
            </S.ReviewListItem>
          </React.Fragment>
        ) : (
          <S.ReviewListItem>
            <p>Purpose</p>
            <p>{success?.purpose}</p>
          </S.ReviewListItem>
        )}
      </S.ReviewContainer>
    );
  };

  const date = DateTime.fromISO(success?.transaction_date);
  const monthDateYearTime = date.toLocaleString(DateTime.DATETIME_MED);

  return (
    <React.Fragment>
      <S.OTPWrapper
        display="flex"
        direction="column"
        alignment="center"
        width="400px"
        margin="20px auto"
      >
        <VerifyOTP
          verifyURL="/auth/verify/otp"
          otpType="send2bank"
          onSuccess={() => {
            dispatch(actions.sendToBankLoading());
          }}
          isVerifyUserToken
          resendURL="/auth/generate/otp"
          resendPayload={JSON.stringify({
            otp_type: 'send2bank',
          })}
          isResendUserToken
        />
      </S.OTPWrapper>
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
            <p className="date">{monthDateYearTime}</p>
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
              onClick={e => {
                e.preventDefault();
                setSuccessDialog(false);
                dispatch(actions.resetTransaction());
                history.push('/dashboard');
              }}
              fullWidth
            >
              Close
            </Button>
            <S.ConfirmationMessage>
              "You will receive an SMS notification for your confirmed
              transaction"
            </S.ConfirmationMessage>
          </div>
        </S.DetailsWrapper>
      </Dialog>
    </React.Fragment>
  );
}
