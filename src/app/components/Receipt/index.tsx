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
import ReceiptWrapper from 'app/components/Elements/Receipt';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Button from 'app/components/Elements/Button';
import H6 from 'app/components/Elements/H6';
import Paragraph from 'app/components/Elements/Paragraph';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberWithCommas } from 'utils/common';
import Logo from '../Assets/Logo';

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
          <Logo size="medium" />
        </div>
        <ReceiptWrapper width="100%">
          <div className="text-center" style={{ margin: '0 0 44px' }}>
            <CircleIndicator size="large" color="primary">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H6 margin="12px 0 0">{title}</H6>
          </div>

          <section className="details">
            {React.Children.toArray(children)}
          </section>

          <Paragraph margin="24px 0 4px" size="small" align="center">
            Total Amount
          </Paragraph>
          <Paragraph
            align="center"
            margin={serviceFee ? '0 0 4px' : '0 0 64px'}
          >
            PHP {numberWithCommas(total)}
          </Paragraph>
          {serviceFee && (
            <Paragraph size="small" align="center" margin="0 0 64px">
              Service Fee: PHP 0.00
            </Paragraph>
          )}

          <Logo size="small" />

          <Paragraph margin="8px 0 0" size="xsmall" align="center">
            {date}
          </Paragraph>
        </ReceiptWrapper>

        <Button fullWidth onClick={onClick} variant="contained" color="primary">
          Close
        </Button>
        <Paragraph margin="8px 16px 0" size="xsmall" align="center">
          "You will receive an SMS notification for your confirmed transaction"
        </Paragraph>
      </div>
    </Wrapper>
  );
}
