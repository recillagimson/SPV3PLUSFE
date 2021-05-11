/**
 * @prop {string}     title           title of the receipt
 * @prop {ReactNode}  children        This are the children inside this component wrapper ie: <Receipt>children</Receipt>
 * @prop {string}     total           total amount of transaction
 * @prop {string}     date            date and time og transaction
 * @prop {function}   onClick         function callback for close button

 */
import * as React from 'react';

import Wrapper from './Wrapper';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Button from 'app/components/Elements/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ReceiptProps = {
  title: string;
  children: React.ReactNode | React.ReactNodeArray;
  total: string;
  date: string;
  onClick?: () => void;
};

export default function ReceiptComponent({
  title,
  children,
  total,
  date,
  onClick,
}: ReceiptProps) {
  return (
    <Wrapper>
      <div className="dialog-container">
        <div className="logo-container">
          <img src="./img/SPLogo.png" alt="SquidPay" className="logo" />
        </div>
        <div className="bg-lightgold">
          <section className="text-center">
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <p className="message">{title}</p>
          </section>
          <section className="details">
            {React.Children.toArray(children)}
          </section>
          <section className="total">
            <span>Total amount</span>
            <p>PHP {total}</p>
            <span>Service Fee: PHP 0.00</span>
          </section>
          <div className="logo-container">
            <img
              src="./img/SPLogo.png"
              alt="SquidPay"
              style={{ width: '50%', margin: 'auto', display: 'block' }}
            />
          </div>

          <section className="date">
            <span>{date}</span>
          </section>
        </div>
        <Button fullWidth onClick={onClick} variant="contained" color="primary">
          Ok
        </Button>
        <span className="note">
          You will receive a sms notification for your confirmed transaction
        </span>
      </div>
    </Wrapper>
  );
}
