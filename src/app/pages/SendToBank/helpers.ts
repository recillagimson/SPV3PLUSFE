// Assets
import InstapayLogo from 'app/components/Assets/instapay.svg';
import PesonetLogo from 'app/components/Assets/pesonet.svg';
import UBPImageTextLogo from 'app/components/Assets/ubp-logo-text.png';

export const getInitialFormData = (type: 'instapay' | 'pesonet') => ({
  bank_code: '',
  bank_name: '',
  account_number: '',
  ...(type === 'pesonet' && { account_name: '' }),
  ...(type === 'instapay' && {
    recipient_first_name: '',
    recipient_last_name: '',
  }),
  amount: '',
  purpose: '',
  other_purpose: '',
  send_receipt_to: '',
});

export const getInitialformErrors = (type: 'instapay' | 'pesonet') => ({
  bank_code: '',
  bank_name: '',
  account_number: '',
  ...(type === 'pesonet' && { account_name: '' }),
  ...(type === 'instapay' && {
    recipient_first_name: '',
    recipient_last_name: '',
  }),
  amount: '',
  purpose: '',
  other_purpose: '',
  send_receipt_to: '',
});

export const BANK_TRANSACTION_TYPE = [
  {
    id: 'instapay',
    header: 'Receive Instantly Free',
    icon: InstapayLogo,
    items: ['Select partner banks', 'Transaction limit is PHP 50,000'],
  },
  {
    id: 'pesonet',
    header: 'Receive by end of the day for FREE',
    icon: PesonetLogo,
    items: [
      'Transfers made before the 12:30 PM cut off are processed within the same banking day.',
      'Transactions after cut off or on holidays are processed the next banking day.',
    ],
  },
  {
    id: 'ubpdirect',
    header: 'Receive Instantly',
    icon: UBPImageTextLogo,
    items: [
      'Use your Bank Account',
      'Transaction limit is PHP 50,000',
      'Trasnfer is real- time',
    ],
    onClick: true,
  },
];

export const TRANSACTION_PURPOSES = [
  {
    code: 1,
    description: 'Fund Transfer',
  },
  {
    code: 2,
    description: 'Donation',
  },
  {
    code: 3,
    description: 'Payment',
  },
  {
    code: 4,
    description: 'Others',
  },
];