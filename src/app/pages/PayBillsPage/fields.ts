export const RENDER_SELECT_ITEMS = name => {
  switch (name) {
    case 'pldt6_service':
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
    case 'smart_product':
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
    case 'sss03_platform_type':
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
    case 'sss03_payment_type':
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
    default:
      return [];
  }
};

export const RENDER_FIELDS = code => {
  switch (code) {
    case 'MECOR':
    case 'MWCOM':
    case 'MWSIN':
    case 'RFID1':
    case 'ETRIP':
    case 'DFA01':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
      ];
    case 'PLDT6':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Phone Number',
          type: 'text',
          name: 'phone_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Service',
          type: 'select',
          name: 'service',
          placeholder: '',
          required: true,
        },
      ];
    case 'CNVRG':
    case 'AEON1':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Account Name',
          type: 'text',
          name: 'account_name',
          placeholder: '',
          required: true,
        },
      ];
    case 'BNECO':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'last_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'first_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'text',
          name: 'due_date',
          placeholder: '',
          required: true,
        },
      ];
    case 'PRULI':
      return [
        {
          label: 'Policy Number (reference number)',
          type: 'text',
          name: 'policy_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Account Name',
          type: 'text',
          name: 'account_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'text',
          name: 'due_date',
          placeholder: '',
          required: true,
        },
      ];
    case 'AECOR':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'text',
          name: 'due_date',
          placeholder: '',
          required: true,
        },
        {
          label: 'Customer Name',
          type: 'text',
          name: 'customer_name',
          placeholder: '',
          required: true,
        },
      ];
    case 'LAZAE':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Name',
          type: 'text',
          name: 'name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Contact Number',
          type: 'text',
          name: 'contact_number',
          placeholder: '',
          required: true,
        },
      ];
    case 'SMART':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Product',
          type: 'select',
          name: 'product',
          placeholder: '',
          required: true,
        },
        {
          label: 'Telephone Number',
          type: 'text',
          name: 'telephone_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Service Reference No',
          type: 'text',
          name: 'service_reference_no',
          placeholder: '',
          required: true,
        },
      ];
    case 'SSS01':
      return [
        {
          label: 'Reference Number (Payment/Billing)',
          type: 'text',
          name: 'reference_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Pay for',
          type: 'text',
          name: 'pay_for',
          placeholder: '',
          required: true,
        },
        {
          label: 'Payment Type',
          type: 'select',
          name: 'payment_type',
          placeholder: '',
          required: true,
        },
        {
          label: 'Platform Type',
          type: 'select',
          name: 'platform_type',
          placeholder: '',
          required: true,
        },
      ];
    case 'SSS02':
      return [
        {
          label: 'Payment Reference Number',
          type: 'text',
          name: 'payment_reference_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Payment Type',
          type: 'select',
          name: 'payment_type',
          placeholder: '',
          required: true,
        },
        {
          label: 'Loan Type',
          type: 'select',
          name: 'loan_type',
          placeholder: '',
          required: true,
        },
        {
          label: 'Platform Type',
          type: 'select',
          name: 'platform_type',
          placeholder: '',
          required: true,
        },
        {
          label: 'Country Code',
          type: 'text',
          name: 'country_code',
          placeholder: '',
          required: true,
        },
      ];
    case 'SSS03':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'Payor Type',
          type: 'select',
          name: 'payment_type',
          placeholder: '',
          required: true,
        },
        {
          label: 'Rel Type',
          type: 'text',
          name: 'rel_type',
          placeholder: '',
          required: true,
        },
        {
          label: 'Loan Account No.',
          type: 'text',
          name: 'loan_account_no',
          placeholder: '',
          required: true,
        },
        {
          label: 'Company Name',
          type: 'text',
          name: 'company_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'last_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'first_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Middle Initial',
          type: 'text',
          name: 'middle_initial',
          placeholder: '',
          required: true,
        },
        {
          label: 'Platform Type',
          type: 'select',
          name: 'platform_type',
          placeholder: '',
          required: true,
        },
      ];
    case 'POEA1':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'first_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'last_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Contact No.',
          type: 'text',
          name: 'contact_number',
          placeholder: '',
          required: true,
        },
      ];
    default:
      return [
        {
          label: 'Account Name',
          type: 'text',
          name: 'account_name',
          placeholder: '',
          required: true,
        },
        {
          label: 'Account Number',
          type: 'text',
          name: 'account_number',
          placeholder: '0000-0000-0000',
          required: true,
        },
        {
          label: 'Reference Number',
          type: 'text',
          name: 'reference',
          placeholder: '',
          required: true,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: true,
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
  }
};
