import * as React from 'react';
import { validateAmount, validateText } from './validators';

export const RENDER_SELECT_ITEMS = name => {
  switch (name.toLowerCase()) {
    case 'pldt6_otherinfo.service':
      return [
        {
          value: 'PL',
          label: 'PLDT Landline',
        },
        {
          value: 'PD',
          label: 'PLDT DSL',
        },
        {
          value: 'PU',
          label: 'PLDT Ultera',
        },
      ];
    case 'mecop_amount':
      return [
        {
          value: '100.00',
          label: '100.00',
        },
        {
          value: '200.00',
          label: '200.00',
        },
        {
          value: '300.00',
          label: '300.00',
        },
        {
          value: '500.00',
          label: '500.00',
        },
        {
          value: '1000.00',
          label: '1000.00',
        },
      ];
    case 'smart_otherinfo.product':
      return [
        {
          value: 'c',
          label: 'Cellular/SUN',
        },
        {
          value: 'b',
          label: 'Bro',
        },
      ];
    case 'sss01_payment_type':
      return [
        {
          value: 'R',
          label: 'Employer',
        },
        {
          value: 'H',
          label: 'Household',
        },
      ];
    case 'sss01_platform_type':
    case 'sss02_platform_type':
    case 'sss03_otherinfo.platformtype':
      return [
        {
          value: 'OTC',
          label: 'Over the counter',
        },
        {
          value: 'SS',
          label: 'Self-service',
        },
      ];
    case 'sss02_payment_type':
    case 'sss03_otherinfo.payortype':
      return [
        {
          value: 'I',
          label: 'Individual',
        },
        {
          value: 'R',
          label: 'Employer',
        },
      ];
    case 'sss02_loan_type':
      return [
        {
          value: 'SL',
          label: 'Salary Loan',
        },
        {
          value: 'CL',
          label: 'Calamity Loan',
        },
        {
          value: 'EL',
          label: 'Emergency Loan',
        },
        {
          value: 'EDL',
          label: 'Education Loan',
        },
        {
          value: 'SIL',
          label: 'Stock Investment Loan',
        },
        {
          value: 'SLE',
          label: 'Salary Loan Early Renewal Program (SLERP)',
        },
      ];
    case 'unbnk_otherinfo.service':
      return [
        {
          value: '0',
          label: 'Mastercard',
        },
        {
          value: '1',
          label: 'Visa',
        },
      ];
    case 'admsn_otherinfo.paymenttype':
      return [
        {
          value: 'B2',
          label: 'Old Accounts',
        },
        {
          value: 'DP',
          label: 'Down Payment',
        },
        {
          value: 'PT',
          label: 'Prelim Term',
        },
        {
          value: 'MT',
          label: 'Mid Term',
        },
        {
          value: 'FT',
          label: 'Final Term',
        },
      ];
    case 'admsn_otherinfo.term':
      return [
        {
          value: '1',
          label: 'First Sem',
        },
        {
          value: '2',
          label: 'Second Sem',
        },
        {
          value: '3',
          label: 'Summer',
        },
      ];
    case 'splan_otherinfo.plantype':
      return [
        {
          value: 'P',
          label: 'Pension Plan',
        },
        {
          value: 'E',
          label: 'Education Plan',
        },
      ];
    case 'hdmf1_otherinfo.paymenttype':
      return [
        {
          value: 'ST',
          label: 'Short-term Loan',
        },
        {
          value: 'MC',
          label: 'Membership Saving',
        },
        {
          value: 'HL',
          label: 'Housing Loan',
        },
        {
          value: 'MP2',
          label: 'Modified PAG-IBIG 2',
        },
      ];
    default:
      return [];
  }
};

type TReturnFields = {
  fields: IFieldTypes[];
  note: React.ReactNode | string;
};

export type IFieldTypes = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean; // if true, will use the validator key
  min?: number | string;
  max?: number | string;
  maxLength?: number;
  option?: { value: string; label: string }[]; // optional, only if type is select
  /**
   * @param {string}  balance     the wallet balance
   * @param {string}  amount      the amount entered
   * @returns {boolean}           returns true if amount is greater than the balance
   */
  validator?: (
    balance: string,
    amount: string,
  ) => { error: boolean; msg: string };
};

const accoutNumberAndAmount: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
];

const defaultFields: IFieldTypes[] = [
  {
    label: 'Account Name',
    type: 'text',
    name: 'account_name',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Reference Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Send Receipt to (optional)',
    type: 'text',
    name: 'send_receipt_to',
    placeholder: '',
  },
  {
    label: 'Message (optional)',
    type: 'text',
    name: 'message',
    placeholder: '',
  },
];

const bneco: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'First Name',
    type: 'text',
    name: 'otherInfo.FirstName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const hdmf1: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 1,
    max: 100000,
    validator: validateAmount,
  },
  {
    label: 'Payment Type',
    type: 'select',
    name: 'otherInfo.PaymentType',
    placeholder: '',
    required: true,
    option: RENDER_SELECT_ITEMS('hdmf1_otherinfo.paymenttype'),
    validator: validateText,
  },
  {
    label: 'Bill Date',
    type: 'date',
    name: 'otherInfo.BillDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Contact Number',
    type: 'number',
    name: 'otherInfo.ContactNo',
    required: true,
    maxLength: 11,
    validator: validateText,
  },
];

const pldt6: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Phone Number',
    type: 'text',
    name: 'otherInfo.PhoneNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Service',
    type: 'select',
    option: RENDER_SELECT_ITEMS('pldt6_otherinfo.service'),
    name: 'otherInfo.Service',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const aeon1: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    maxLength: 13,
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    min: 1,
    max: 100000,
    maxLength: 6,
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Account Name',
    type: 'text',
    maxLength: 100,
    name: 'otherInfo.AccountName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const pruli: IFieldTypes[] = [
  {
    label: 'Policy Number (reference number)',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Account Name',
    type: 'text',
    name: 'otherInfo.AccountName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const aecor: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'due_date',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Customer Name',
    type: 'text',
    name: 'customer_name',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const lazae: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Name',
    type: 'text',
    name: 'name',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Contact Number',
    type: 'text',
    name: 'contact_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const smart: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: false,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Product',
    type: 'select',
    name: 'otherInfo.Product',
    option: RENDER_SELECT_ITEMS('smart_otherinfo.product'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Telephone Number',
    type: 'text',
    name: 'otherInfo.TelephoneNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Service Reference No',
    type: 'text',
    name: 'otherInfo.ServiceReferenceNo',
    placeholder: '',
    required: false,
  },
];

const sss01: IFieldTypes[] = [
  {
    label: 'Reference Number (Payment/Billing)',
    type: 'text',
    name: 'reference_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Pay for',
    type: 'text',
    name: 'pay_for',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Payment Type',
    type: 'select',
    name: 'payment_type',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Platform Type',
    type: 'select',
    name: 'platform_type',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const sss02: IFieldTypes[] = [
  {
    label: 'Payment Reference Number',
    type: 'text',
    name: 'payment_reference_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Payment Type',
    type: 'select',
    name: 'payment_type',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Loan Type',
    type: 'select',
    name: 'loan_type',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Platform Type',
    type: 'select',
    name: 'platform_type',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Country Code',
    type: 'text',
    name: 'country_code',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const sss03: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Payor Type',
    type: 'select',
    name: 'otherInfo.PayorType',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Rel Type',
    type: 'text',
    name: 'otherInfo.RelType',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Loan Account No.',
    type: 'text',
    name: 'otherInfo.LoanAccountNo',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Company Name',
    type: 'text',
    name: 'otherInfo.CompanyName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'First Name',
    type: 'text',
    name: 'otherInfo.FirstName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Middle Initial',
    type: 'text',
    name: 'otherInfo.MI',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Platform Type',
    type: 'select',
    name: 'otherInfo.PlatformType',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const poea1: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'First Name',
    type: 'text',
    name: 'first_name',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'last_name',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Contact No.',
    type: 'text',
    name: 'contact_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const bpi00: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Customer name',
    type: 'text',
    name: 'otherInfo.ConsName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const bnkrd: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Account name',
    type: 'text',
    name: 'otherInfo.AccountName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Bill Date',
    type: 'date',
    name: 'otherInfo.BillDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const unbnk: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Service',
    type: 'select',
    name: 'otherInfo.Service',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Customer name',
    type: 'text',
    name: 'otherInfo.ConsName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const admsn: IFieldTypes[] = [
  {
    label: 'Student Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'First Name',
    type: 'text',
    name: 'otherInfo.FirstName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Middle Name',
    type: 'text',
    name: 'otherInfo.MiddleName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Payment Type',
    type: 'select',
    name: 'otherInfo.PaymentType',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Course',
    type: 'text',
    name: 'otherInfo.Course',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Total Assessment',
    type: 'text',
    name: 'otherInfo.TotalAssessment',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'School Year',
    type: 'text',
    name: 'otherInfo.SchoolYear',
    placeholder: 'YYYY-YYYY',
    required: true,
    validator: validateText,
  },
  {
    label: 'Term',
    type: 'select',
    name: 'otherInfo.Term',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const ubnk4: IFieldTypes[] = [
  {
    label: 'Student Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Student Name',
    type: 'text',
    name: 'otherInfo.StudentName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Branch',
    type: 'text',
    name: 'otherInfo.Branch',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const aslnk: IFieldTypes[] = [
  {
    label: 'Student Number',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'First Name',
    type: 'text',
    name: 'otherInfo.FirstName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Middle Name',
    type: 'text',
    name: 'otherInfo.MiddleName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const pilam: IFieldTypes[] = [
  {
    label: 'Policy Number (reference number)',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const splan: IFieldTypes[] = [
  {
    label: 'Policy Number (reference number)',
    type: 'text',
    name: 'referenceNumber',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    validator: validateAmount,
  },
  {
    label: 'Plan Type',
    type: 'select',
    name: 'otherInfo.PlanType',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const cnvrg: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 13,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 1,
    max: 100000,
    validator: validateAmount,
  },
  {
    label: 'Account Name',
    type: 'text',
    name: 'otherInfo.AccountName',
    placeholder: '',
    required: true,
    maxLength: 100,
    validator: validateText,
  },
];

const hcphl: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 13,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 150,
    max: 100000,
    validator: validateAmount,
  },
  {
    label: 'Name',
    type: 'text',
    name: 'otherInfo.Name',
    placeholder: '',
    required: true,
    maxLength: 100,
    validator: validateText,
  },
  {
    label: 'Phone/Cellphone Number',
    type: 'number',
    name: 'otherInfo.PhoneNo',
    placeholder: '',
    required: true,
    min: 1,
    maxLength: 11,
    validator: validateText,
  },
];

/**
 *
 * @param {string} code     biller code
 * @returns {array}         returns an array of fields and additional note ie: [{}, <><span>note</span> Another text];
 */
// export const RENDER_FIELDS = (code: string): {fields: any, note: string | React.ReactNode} => {
export const RENDER_FIELDS = (code: string): TReturnFields => {
  switch (code) {
    case 'MECOR':
      return {
        fields: accoutNumberAndAmount,
        note: (
          <>
            <span className="text-red">IMPORTANT NOTE:</span> To avoid
            inconvenience, please input the exact amount of your total billing
            amount due and settle before your due date.
            <br />
            <br />
            Please review to ensure that the details are correct before you
            proceed.
          </>
        ),
      };
    // case 'MECOP':
    // case 'MWCOM':
    // case 'MWSIN':
    // case 'RFID1':
    // case 'ETRIP':
    case 'DFA01':
      return {
        fields: accoutNumberAndAmount,
        note: '',
      };
    case 'PLDT6':
      return {
        fields: pldt6,
        note: '',
      };
    case 'CNVRG':
      return {
        fields: cnvrg,
        note: (
          <>
            <span className="text-red">IMPORTANT NOTE:</span> To avoid
            inconvenience, please input the exact amount of your total billing
            amount due and settle before your due date. Please review to ensure
            that the details are correct before you proceed.
          </>
        ),
      };
    case 'AEON1':
      return {
        fields: aeon1,
        note: '',
      };
    case 'BNECO':
      return {
        fields: bneco,
        note: '',
      };
    case 'PRULI':
      return {
        fields: pruli,
        note: '',
      };
    case 'AECOR':
      return {
        fields: aecor,
        note: '',
      };
    case 'LAZAE':
      return {
        fields: lazae,
        note: '',
      };
    case 'SMART':
      return {
        fields: smart,
        note: '',
      };
    case 'SSS01':
      return {
        fields: sss01,
        note: '',
      };
    case 'SSS02':
      return {
        fields: sss02,
        note: '',
      };
    case 'SSS03':
      return {
        fields: sss03,
        note: '',
      };
    case 'POEA1':
      return {
        fields: poea1,
        note: '',
      };
    // case 'MBCCC':
    case 'BPI00':
      return {
        fields: bpi00,
        note: '',
      };
    case 'BNKRD':
      return {
        fields: bnkrd,
        note: '',
      };
    case 'UNBNK':
      return {
        fields: unbnk,
        note: '',
      };
    case 'ADMSN':
      return {
        fields: admsn,
        note: '',
      };
    case 'UBNK4':
      return {
        fields: ubnk4,
        note: '',
      };
    case 'ASLNK':
      return {
        fields: aslnk,
        note: '',
      };
    case 'PILAM':
      return {
        fields: pilam,
        note: '',
      };
    case 'SPLAN':
      return {
        fields: splan,
        note: '',
      };
    case 'HDMF1':
      return {
        fields: hdmf1,
        note: '',
      };
    case 'HCPHL': {
      return {
        fields: hcphl,
        note: '',
      };
    }
    default:
      return {
        fields: defaultFields,
        note: '',
      };
  }
};
