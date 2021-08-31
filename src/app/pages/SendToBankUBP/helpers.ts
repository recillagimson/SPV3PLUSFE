type FieldInput<T> = {
  value: T;
  error: boolean;
  type?: string;
  msg?: string;
  validation?: {
    type: string;
    validate: boolean | RegExp | Function;
    secondValidate?: boolean | RegExp | Function;
    errorMessage?: string;
  };
};

export interface FormModel {
  amount: FieldInput<string>;
  particulars: FieldInput<string>;
  recipient_account_no: FieldInput<string>;
  recipient_name: FieldInput<string>;
  remarks: FieldInput<string>;
  send_receipt_to: FieldInput<string>;
}

export const initialFormValues: FormModel = {
  amount: {
    value: '',
    error: false,
    validation: {
      type: 'regMatch',
      validate: /[+-]?([0-9]*[.])?[0-9]+/,
      errorMessage: 'Enter a valid amount',
    },
  },
  particulars: {
    value: '',
    error: false,
  },
  recipient_account_no: {
    value: '',
    type: 'stringMatch',
    error: false,
    msg: '',
  },
  recipient_name: {
    value: '',
    error: false,
  },
  remarks: {
    value: '',
    error: false,
  },
  send_receipt_to: {
    value: '',
    error: false,
    validation: {
      type: 'regMatch',
      validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      secondValidate: /^(09|\+639)\d{9}$/,
      errorMessage: 'Enter a valid email or phone number',
    },
  },
};
