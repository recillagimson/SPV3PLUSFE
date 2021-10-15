import * as React from 'react';
import Dialog from 'app/components/Dialog';
import Logo from 'app/components/Assets/Logo';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';
// Helpers
import { numberWithCommas, parseToNumber } from 'utils/common';
import * as S from './styled/SuccessDialog';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  email: string;
  mobile_number: string;
  total_amount: string;
  reference_number: string;
  transaction_date: string;
};

export default function SuccessSentDialog({
  show,
  setShow,
  name,
  email,
  mobile_number,
  total_amount,
  reference_number,
  transaction_date,
}: Props) {
  const history = useHistory();

  const calculateTotalAmount = parseToNumber(parseFloat(total_amount));

  const date = DateTime.fromISO(transaction_date);
  const monthDateYearTime = date.toLocaleString(DateTime.DATETIME_MED);
  return (
    <Dialog show={show} size="small">
      <S.DetailsWrapper padding="15px">
        <Logo size="medium" />
        <S.SuccessWrapper>
          <S.CuttedImageWrapper src={WrapperCuttedCornerTop} alt="Squid pay" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <p className="success-message" style={{ marginBlockEnd: '48px' }}>
            Payment Successful
          </p>

          <S.ReviewListItem>
            <p>Name</p>
            <p>{name}</p>
          </S.ReviewListItem>
          {mobile_number && (
            <S.ReviewListItem>
              <p>Mobile Number</p>
              <p>{mobile_number}</p>
            </S.ReviewListItem>
          )}
          {email && (
            <S.ReviewListItem>
              <p>Email</p>
              <p>{email}</p>
            </S.ReviewListItem>
          )}
          <S.ReviewListItem>
            <p>Transaction Number</p>
            <p>{reference_number}</p>
          </S.ReviewListItem>
          <S.ReviewTotal style={{ marginBlockStart: 81 }}>
            <p className="total-description">Total amount</p>
            <p className="total-amount">
              PHP {numberWithCommas(calculateTotalAmount)}
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
              setShow(false);
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
  );
}
