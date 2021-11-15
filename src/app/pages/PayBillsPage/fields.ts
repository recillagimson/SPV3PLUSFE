export const RENDER_SELECT_ITEMS = name => {
  switch (name.toLowerCase()) {
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

type IFieldTypes = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
};

export const RENDER_FIELDS = (code: string): IFieldTypes[] => {
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
          name: 'referenceNumber',
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
      ];
    case 'PLDT6':
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
          name: 'otherInfo.AccountName',
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
          label: 'Last Name',
          type: 'text',
          name: 'otherInfo.LastName',
          placeholder: '',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'otherInfo.FirstName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'date',
          name: 'otherInfo.DueDate',
          placeholder: '',
          required: true,
        },
      ];
    case 'PRULI':
      return [
        {
          label: 'Policy Number (reference number)',
          type: 'text',
          name: 'referenceNumber',
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
          name: 'otherInfo.AccountName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'date',
          name: 'otherInfo.DueDate',
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
          label: 'Due Date',
          type: 'date',
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
          name: 'referenceNumber',
          placeholder: '',
          required: false,
        },
        {
          label: 'Amount',
          type: 'number',
          name: 'amount',
          placeholder: 'PHP 0.00',
          required: false,
        },
        {
          label: 'Product',
          type: 'select',
          name: 'otherInfo.Product',
          placeholder: '',
          required: true,
        },
        {
          label: 'Telephone Number',
          type: 'text',
          name: 'otherInfo.TelephoneNumber',
          placeholder: '',
          required: true,
        },
        {
          label: 'Service Reference No',
          type: 'text',
          name: 'otherInfo.ServiceReferenceNo',
          placeholder: '',
          required: false,
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
          name: 'otherInfo.PayorType',
          placeholder: '',
          required: true,
        },
        {
          label: 'Rel Type',
          type: 'text',
          name: 'otherInfo.RelType',
          placeholder: '',
          required: true,
        },
        {
          label: 'Loan Account No.',
          type: 'text',
          name: 'otherInfo.LoanAccountNo',
          placeholder: '',
          required: true,
        },
        {
          label: 'Company Name',
          type: 'text',
          name: 'otherInfo.CompanyName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'otherInfo.LastName',
          placeholder: '',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'otherInfo.FirstName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Middle Initial',
          type: 'text',
          name: 'otherInfo.MI',
          placeholder: '',
          required: true,
        },
        {
          label: 'Platform Type',
          type: 'select',
          name: 'otherInfo.PlatformType',
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
    case 'MBCCC':
    case 'BPI00':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Customer name',
          type: 'text',
          name: 'otherInfo.ConsName',
          placeholder: '',
          required: true,
        },
      ];
    case 'BNKRD':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Account name',
          type: 'text',
          name: 'otherInfo.AccountName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Bill Date',
          type: 'date',
          name: 'otherInfo.BillDate',
          placeholder: '',
          required: true,
        },
      ];
    case 'UNBNK':
      return [
        {
          label: 'Account Number',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Service',
          type: 'select',
          name: 'otherInfo.Service',
          placeholder: '',
          required: true,
        },
        {
          label: 'Customer name',
          type: 'text',
          name: 'otherInfo.ConsName',
          placeholder: '',
          required: true,
        },
      ];
    case 'ADMSN':
      return [
        {
          label: 'Student Number',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Last Name',
          type: 'text',
          name: 'otherInfo.LastName',
          placeholder: '',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'otherInfo.FirstName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Middle Name',
          type: 'text',
          name: 'otherInfo.MiddleName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Payment Type',
          type: 'select',
          name: 'otherInfo.PaymentType',
          placeholder: '',
          required: true,
        },
        {
          label: 'Course',
          type: 'text',
          name: 'otherInfo.Course',
          placeholder: '',
          required: true,
        },
        {
          label: 'Total Assessment',
          type: 'text',
          name: 'otherInfo.TotalAssessment',
          placeholder: '',
          required: true,
        },
        {
          label: 'School Year',
          type: 'text',
          name: 'otherInfo.SchoolYear',
          placeholder: 'YYYY-YYYY',
          required: true,
        },
        {
          label: 'Term',
          type: 'select',
          name: 'otherInfo.Term',
          placeholder: '',
          required: true,
        },
      ];
    case 'UBNK4':
      return [
        {
          label: 'Student Number',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Student Name',
          type: 'text',
          name: 'otherInfo.StudentName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Branch',
          type: 'text',
          name: 'otherInfo.Branch',
          placeholder: '',
          required: true,
        },
      ];
    case 'ASLNK':
      return [
        {
          label: 'Student Number',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Last Name',
          type: 'text',
          name: 'otherInfo.LastName',
          placeholder: '',
          required: true,
        },
        {
          label: 'First Name',
          type: 'text',
          name: 'otherInfo.FirstName',
          placeholder: '',
          required: true,
        },
        {
          label: 'Middle Name',
          type: 'text',
          name: 'otherInfo.MiddleName',
          placeholder: '',
          required: true,
        },
      ];
    case 'PILAM':
      return [
        {
          label: 'Policy Number (reference number)',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Due Date',
          type: 'date',
          name: 'otherInfo.DueDate',
          placeholder: '',
          required: true,
        },
      ];
    case 'SPLAN':
      return [
        {
          label: 'Policy Number (reference number)',
          type: 'text',
          name: 'referenceNumber',
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
          label: 'Plan Type',
          type: 'select',
          name: 'otherInfo.PlanType',
          placeholder: '',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'date',
          name: 'otherInfo.DueDate',
          placeholder: '',
          required: true,
        },
      ];
    case 'HDMF1':
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
          min: 1,
          max: 100000,
        },
        {
          label: 'Payment Type',
          type: 'select',
          name: 'otherInfo.PaymentType',
          placeholder: '',
          required: true,
        },
        {
          label: 'Bill Date',
          type: 'date',
          name: 'otherInfo.BillDate',
          placeholder: '',
          required: true,
        },
        {
          label: 'Due Date',
          type: 'date',
          name: 'otherInfo.DueDate',
          placeholder: '',
          required: true,
        },
        {
          label: 'Contact Number',
          type: 'number',
          name: 'otherInfo.ContactNo',
          required: true,
          maxLength: 11,
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
          placeholder: '',
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
