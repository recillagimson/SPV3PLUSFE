/**
 * @prop {string}     title           title of the receipt
 * @prop {ReactNode}  children        This are the children inside this component wrapper ie: <Receipt>children</Receipt>
 * @prop {string}     total           total amount of transaction
 * @prop {string}     date            date and time og transaction
 * @prop {boolean}    serviceFee      service fee of transaction
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
  serviceFee?: boolean;
  onClick?: () => void;
};

export default function ReceiptComponent({
  title,
  children,
  total,
  date,
  serviceFee,
  onClick,
}: ReceiptProps) {
  return (
    <Wrapper>
      <div className="dialog-container">
        <div className="logo-container">
          <img
            src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
            alt="SquidPay"
            className="logo"
          />
        </div>
        <div className="bg-lightgold">
          <div style={{ padding: '0px 10px' }}>
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
              {serviceFee && <span>Service Fee: PHP 0.00</span>}
            </section>
            <div className="logo-container">
              <img
                src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
                alt="SquidPay"
                style={{ width: '75%', margin: 'auto', display: 'block' }}
              />
            </div>
            <section className="date">
              <span>{date}</span>
            </section>
          </div>
        </div>
        <br />
        <Button fullWidth onClick={onClick} variant="contained" color="primary">
          Ok
        </Button>
        <span className="note">
          "You will receive an SMS notification for your confirmed transaction"
        </span>
      </div>
    </Wrapper>
  );
}
