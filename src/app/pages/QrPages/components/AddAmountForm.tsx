import * as React from 'react';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
type Amount = {
  value: string;
  error: boolean;
  errormsg: string;
};
type Props = {
  setAmount: React.Dispatch<React.SetStateAction<Amount>>;
  amount: Amount;
  setPurpose: React.Dispatch<
    React.SetStateAction<{
      value: string;
    }>
  >;
  purpose: {
    value: string;
  };
  balanceInfo: string;
};

export default function AddAmountForm({
  setAmount,
  amount,
  setPurpose,
  purpose,
  balanceInfo,
}: Props) {
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if (
      (val !== '' && !Number(val)) ||
      (val !== '' && Number(val) && parseInt(val) > 1000000)
    ) {
      return;
    }
    setAmount({
      value: val,
      error: false,
      errormsg: '',
    });
  };
  const onChangePurpose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setPurpose({
      value: val,
    });
  };
  return (
    <Field id="generateQRCode">
      <Label>Enter Amount</Label>
      <InputTextWrapper>
        <Input
          type="tel"
          placeholder="0.00"
          value={amount.value}
          min={0}
          max={1000000}
          autoComplete="off"
          onChange={onChangeAmount}
          hidespinner
        />
        <span>PHP</span>
      </InputTextWrapper>
      <span style={{ fontSize: '12px', fontWeight: 'lighter' }}>
        Available Balance PHP {balanceInfo}
      </span>
      {amount.error && <ErrorMsg formError>{amount.errormsg}</ErrorMsg>}
      <span style={{ margin: '24px 0' }} />
      <Label>Purpose (optional)</Label>
      <InputTextWrapper>
        <Input
          type="text"
          value={purpose.value}
          autoComplete="off"
          onChange={onChangePurpose}
          hidespinner
        />
      </InputTextWrapper>
    </Field>
  );
}
