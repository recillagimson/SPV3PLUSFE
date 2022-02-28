/* eslint-disable no-useless-escape */
/**
 * Notes For Developers on creating new billers
 *
 * If fields like account_number only accepts digits, put the type = 'text' and maxLength in the object
 * then use the validateDigits function to validate if the user input contains digits only
 *
 * For other fields that are required, use validateText to validate if it contains a value or not
 *
 * There is a specific validation for amounts (validateAmount), object contains min: 0 and max: 100000 properties,
 * this will be used by the validator if they exceed the maximum amount or they don't have enough balance
 *
 * @author Habs Cervantes
 */
import * as React from 'react';
import { RENDER_SELECT_ITEMS } from './options';
import {
  validateAmount,
  validateDigits,
  validatePattern,
  validateText,
} from './validators';

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
  minLength?: number;
  maxLength?: number;
  option?: { value: string; label: string }[]; // optional, only if type is select
  format?: string; // should be a valid luxon date time format
  regex?: RegExp; // a valid regexp for validating the pattern
  validator?: (...args: any) => { error: boolean; msg: string };
};

const accoutNumberAndAmount: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
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

const mecor: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 10,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 5,
    max: 100000,
    validator: validateAmount,
  },
];

const mecop: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'select',
    name: 'amount',
    placeholder: '0.00',
    option: RENDER_SELECT_ITEMS('mecop_amount'),
    required: true,
    validator: validateAmount,
  },
];

const bneco: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 11,
    validator: validateDigits,
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

const hdmf3: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 20,
    validator: validateDigits,
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
    option: RENDER_SELECT_ITEMS('hdmf3_otherinfo.paymenttype'),
    validator: validateText,
  },
  {
    label: 'Period From',
    type: 'date',
    name: 'otherInfo.PeriodFrom',
    format: 'yyyy/LL',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Period To',
    type: 'date',
    name: 'otherInfo.PeriodTo',
    format: 'yyyy/LL',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Region',
    type: 'text',
    name: 'otherInfo.Region',
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

const nha01: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
    validator: validateDigits,
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
    label: 'Beneficiary Name',
    type: 'text',
    name: 'otherInfo.BeneficiaryName',
    placeholder: '',
    required: true,
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
    maxLength: 10,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 200,
    max: 100000,
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
    required: true,
    maxLength: 10,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    min: 1,
    max: 100000,
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
    label: 'Account Number (Policy Number)',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 8,
    validator: validateDigits,
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
    maxLength: 16,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 1,
    max: 99999,
    validator: validateAmount,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    format: 'LL/dd/yyyy',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Customer Name',
    type: 'text',
    name: 'otherInfo.CustomerName',
    placeholder: '',
    required: true,
    maxLength: 100,
    validator: validateText,
  },
];

const pelc2: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 10,
    validator: validateDigits,
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
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    format: 'LL/dd/yyyy',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Consumer Name',
    type: 'text',
    name: 'otherInfo.ConsumerName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const dvolt: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 13,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 1,
    max: 99999,
    validator: validateAmount,
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
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const vieco: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 13,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 1,
    max: 99999,
    validator: validateAmount,
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
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
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
    name: 'account_number',
    placeholder: '',
    required: false,
    maxLength: 10,
    validator: validateDigits,
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
    maxLength: 13,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 1,
    max: 200000,
    validator: validateAmount,
  },
  {
    label: 'Payor Type',
    type: 'select',
    name: 'otherInfo.PayorType',
    option: RENDER_SELECT_ITEMS('sss03_otherinfo.payortype'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Rel Type',
    type: 'select',
    name: 'otherInfo.RelType',
    option: RENDER_SELECT_ITEMS('sss03_otherinfo.reltype'),
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
    option: RENDER_SELECT_ITEMS('sss03_otherinfo.platformtype'),
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
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 16,
    validator: validateDigits,
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
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 16,
    validator: validateDigits,
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
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
    validator: validateDigits,
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
    option: RENDER_SELECT_ITEMS('admsn_otherinfo.paymenttype'),
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
    maxLength: 10,
    validator: validateText,
  },
  {
    label: 'Total Assessment',
    type: 'text',
    name: 'otherInfo.TotalAssessment',
    placeholder: '',
    required: true,
    min: 0,
    validator: validateDigits,
  },
  {
    label: 'School Year',
    type: 'text',
    name: 'otherInfo.SchoolYear',
    placeholder: 'YYYY-YYYY',
    required: true,
    regex: new RegExp(/^\d{4}-\d{4}$/g),
    validator: validatePattern,
  },
  {
    label: 'Term',
    type: 'select',
    name: 'otherInfo.Term',
    option: RENDER_SELECT_ITEMS('admsn_otherinfo.term'),
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
    label: 'Policy Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 10,
    validator: validateDigits,
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
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 13,
    validator: validateDigits,
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
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 10,
    validator: validateDigits,
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

const mbccc: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 16,
    validator: validateDigits,
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
    label: 'Customer name',
    type: 'text',
    name: 'otherInfo.ConsName',
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const etrip: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 12,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 500,
    max: 100000,
    validator: validateAmount,
  },
];

const mwcom: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 8,
    validator: validateDigits,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 20,
    max: 100000,
    validator: validateAmount,
  },
];

const inec1: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 10,
    validator: validateDigits,
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
    name: 'otherInfo.Name',
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

const cgnal: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 10,
    validator: validateDigits,
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
    label: 'First Name',
    type: 'text',
    name: 'otherInfo.FirstName',
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
    label: 'External Entity Name',
    type: 'select',
    name: 'otherInfo.ExternalEntityName',
    option: RENDER_SELECT_ITEMS('cgnal_otherinfo.externalentityname'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const wldvs: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
    validator: validateDigits,
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
    label: 'Pledge',
    type: 'select',
    name: 'otherInfo.Pledge',
    option: RENDER_SELECT_ITEMS('wldvs_otherinfo.pledge'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const adnu1: IFieldTypes[] = [
  {
    label: 'Student ID Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
    validator: validateDigits,
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
    label: 'Name',
    type: 'text',
    name: 'otherInfo.Name',
    placeholder: '',
    required: true,
    maxLength: 50,
    validator: validateText,
  },
  {
    label: 'Account Type',
    type: 'select',
    name: 'otherInfo.AccountType',
    option: RENDER_SELECT_ITEMS('adnu1_otherinfo.accounttype'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
];

const antec: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 11,
    validator: validateDigits,
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
    maxLength: 50,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    format: 'LL/dd/yyyy',
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Bill Month',
    type: 'text',
    name: 'otherInfo.BillMonth',
    placeholder: 'MM/YYYY',
    required: true,
    regex: new RegExp(/^0[1-9]|1[0-2]\/(20)\d{2}$/g),
    validator: validateText,
  },
];

const apec1: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
    name: 'account_number',
    placeholder: '',
    required: true,
    minLength: 15,
    maxLength: 20,
    validator: validateDigits,
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
    label: 'SOA',
    type: 'select',
    name: 'otherInfo.SOA',
    option: RENDER_SELECT_ITEMS('apec1_otherinfo.soa'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Bill Amount',
    type: 'number',
    name: 'otherInfo.BillAmount',
    placeholder: '0.00',
    required: true,
    validator: validateDigits,
  },
  {
    label: 'Bill Month',
    type: 'text',
    name: 'otherInfo.BillMonth',
    placeholder: 'MM',
    required: true,
    regex: new RegExp(/^0[1-9]|1[0-2]\/(20)$/g),
    validator: validatePattern,
  },
  {
    label: 'Bill Year',
    type: 'text',
    name: 'otherInfo.BillYear',
    placeholder: 'YYYY',
    required: true,
    regex: new RegExp(/^\d{4}$/g),
    validator: validatePattern,
  },
  {
    label: 'Delivery Date',
    type: 'date',
    name: 'otherInfo.DeliveryDate',
    format: 'yyyy-LL-dd',
    placeholder: 'YYYY/MM/DD',
    required: true,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    format: 'yyyy-LL-dd',
    placeholder: 'YYYY/MM/DD',
    required: true,
    validator: validateText,
  },
  {
    label: 'Payment Type',
    type: 'select',
    name: 'otherInfo.PaymentType',
    option: RENDER_SELECT_ITEMS('apec1_otherinfo.paymenttype'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Invoice Number',
    type: 'number',
    name: 'otherInfo.InvoiceNo',
    placeholder: '',
    required: true,
    minLength: 2,
    maxLength: 30,
    validator: validateDigits,
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

const apecs: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
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
    label: 'Branch Code',
    type: 'select',
    name: 'otherInfo.BranchCode',
    option: RENDER_SELECT_ITEMS('apecs_otherinfo.branchcode'),
    placeholder: '',
    required: true,
    validator: validateText,
  },
  {
    label: 'Payment Type',
    type: 'select',
    name: 'otherInfo.PaymentType',
    option: RENDER_SELECT_ITEMS('apecs_otherinfo.paymenttype'),
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
    maxLength: 100,
    validator: validateText,
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'otherInfo.LastName',
    placeholder: '',
    required: true,
    maxLength: 100,
    validator: validateText,
  },
];

const eqpmc: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
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
];

const mold1: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'text',
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
];

const mspci: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
    validator: validateText,
  },
  {
    label: 'Amount',
    type: 'number',
    name: 'amount',
    placeholder: '0.00',
    required: true,
    min: 100,
    max: 100000,
    validator: validateAmount,
  },
];

const asfin: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
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
    placeholder: 'Enter Account Name',
    required: true,
    validator: validateText,
  },
  {
    label: 'Due Date',
    type: 'date',
    name: 'otherInfo.DueDate',
    format: 'LL/dd/yyyy',
    placeholder: 'MM/DD/YYYY',
    required: true,
    validator: validateText,
  },
];

const asvca: IFieldTypes[] = [
  {
    label: 'Account Number',
    type: 'number',
    name: 'account_number',
    placeholder: '',
    required: true,
    maxLength: 9,
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
    placeholder: 'Enter Account Name',
    required: true,
    maxLength: 100,
    validator: validateText,
  },
  {
    label: 'Affiliate Branch',
    type: 'select',
    name: 'otherInfo.AffiliateBranch',
    placeholder: '',
    option: RENDER_SELECT_ITEMS('asvca_otherinfo.affiliatebranch'),
    required: true,
    validator: validateText,
  },
];

const avonc: IFieldTypes[] = [
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
    label: 'Name',
    type: 'text',
    name: 'otherInfo.Name',
    placeholder: 'Enter Name',
    required: true,
    maxLength: 30,
    validator: validateText,
  },
  {
    label: 'Branch',
    type: 'text',
    name: 'otherInfo.Branch',
    placeholder: '',
    required: true,
    maxLength: 30,
    validator: validateText,
  },
];

const bayan: IFieldTypes[] = [
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
    label: 'Customer Name',
    type: 'text',
    name: 'otherInfo.CustomerName',
    placeholder: '',
    required: true,
    maxLength: 100,
    validator: validateText,
  },
  {
    label: 'Phone Number',
    type: 'text',
    name: 'otherInfo.PhoneNo',
    placeholder: '',
    required: true,
    maxLength: 11,
    validator: validateDigits,
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
        fields: mecor,
        note: (
          <>
            <span className="text-red">IMPORTANT NOTE:</span> To avoid
            inconvenience, please input the exact amount of your total billing
            amount due and settle before your due date. Please review to ensure
            that the details are correct before you proceed.
          </>
        ),
      };
    case 'MECOP':
      return {
        fields: mecop,
        note: '',
      };
    case 'INEC1':
      return {
        fields: inec1,
        note: '',
      };
    case 'VIECO':
      return {
        fields: vieco,
        note: '',
      };
    case 'DVOLT':
      return {
        fields: dvolt,
        note: '',
      };
    case 'MWCOM':
      return {
        fields: mwcom,
        note: '',
      };
    case 'MWSIN':
      return {
        fields: mwcom,
        note: '',
      };
    case 'RFID1':
      return {
        fields: accoutNumberAndAmount,
        note: '',
      };
    case 'ETRIP':
      return {
        fields: etrip,
        note: '',
      };
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
    case 'CGNAL':
      return {
        fields: cgnal,
        note: '',
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
    case 'PELC2':
      return {
        fields: pelc2,
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
    case 'MBCCC':
      return {
        fields: mbccc,
        note: '',
      };
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
    case 'HDMF3':
      return {
        fields: hdmf3,
        note: '',
      };
    case 'NHA01':
      return {
        fields: nha01,
        note: '',
      };
    case 'HCPHL': {
      return {
        fields: hcphl,
        note: '',
      };
    }
    case 'WLDVS': {
      return {
        fields: wldvs,
        note: '',
      };
    }
    case 'ADNU1':
      return {
        fields: adnu1,
        note: '',
      };
    case 'ANTEC':
      return {
        fields: antec,
        note: '',
      };
    case 'APEC1':
      return {
        fields: apec1,
        note: '',
      };
    case 'APECS':
      return {
        fields: apecs,
        note: '',
      };
    case 'EQPMC':
      return {
        fields: eqpmc,
        note: '',
      };
    case 'MOLD1':
      return {
        fields: mold1,
        note: '',
      };
    case 'MSPCI':
      return {
        fields: mspci,
        note: '',
      };
    case 'ASFIN':
      return {
        fields: asfin,
        note: '',
      };
    case 'ASVCA':
      return {
        fields: asvca,
        note: '',
      };
    case 'AVONC':
      return {
        fields: avonc,
        note: '',
      };
    case 'BAYAN':
      return {
        fields: bayan,
        note: '',
      };
    default:
      return {
        fields: defaultFields,
        note: '',
      };
  }
};
