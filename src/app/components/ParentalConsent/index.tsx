/**
 * Parental Consent Dialog
 * @prop {boolean}    open        Open the dialog
 * @prop {function}   onAgree     Callback when user agrees
 * @prop {function}   onCancel    Callback when user click cancel/disagree
 */
import * as React from 'react';

import Dialog from 'app/components/Dialog';
import Title from 'app/components/Dialog/Title';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';

type ParentalConsentProps = {
  open: boolean;
  onAgree: () => void;
  onCancel: () => void;
};
export default function ParentalConsent({
  open,
  onAgree,
  onCancel,
}: ParentalConsentProps) {
  return (
    <Dialog show={open} size="medium">
      <Title>Parental Consent</Title>
      <div style={{ padding: '20px 25px' }}>
        <p>
          I represent and warrant that (a) I am the parent and/or legal guardian
          of the concerned minor/ward; (b) I have the legal right, power, and
          authority to consent to this Agreement on his/her behalf; and (c) I am
          at least 18 years of age.
        </p>
        <p>
          I hereby allow the registration and verification of his/her account
          for the purpose of having more access to SquidPay’s services and
          products.
        </p>
        <p>
          I acknowledge that I have read, and I understand this entire Agreement
          (as defined above). I hereby consent to and approve in all respects
          the terms and conditions of this Agreement, and agree that I shall be
          bound by all of its terms and conditions.
        </p>
        <Flex justifyContent="space-between">
          <Button
            size="medium"
            color="danger"
            variant="outlined"
            onClick={onCancel}
          >
            Disagree
          </Button>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={onAgree}
          >
            Agree
          </Button>
        </Flex>
      </div>
    </Dialog>
  );
}
