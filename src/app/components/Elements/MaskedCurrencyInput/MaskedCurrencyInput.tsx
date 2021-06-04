import * as React from 'react';
import Wrapper from './Wrapper';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
  prefix: 'PHP',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  // integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

type Props = {
  inputmode?: string;
  maskOptions?: {
    prefix: string;
    suffix: string;
    includeThousandsSeparator: boolean;
    thousandsSeparatorSymbol: string;
    allowDecimal: boolean;
    decimalSymbol: string;
    decimalLimit: string;
    requireDecimal: boolean;
    allowNegative: boolean;
    allowLeadingZeroes: boolean;
    integerLimit: number;
  };
  name?: string;
  className?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function MaskedCurrencyInput({
  maskOptions,
  placeholder,
  onChange,
  name = '',
  className,
  value,
}: Props) {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return (
    <Wrapper
      name={name}
      mask={currencyMask}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
