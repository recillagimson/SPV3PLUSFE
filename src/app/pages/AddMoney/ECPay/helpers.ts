import { StyleConstants } from 'styles/StyleConstants';
// import Enter from 'app/components/Assets/ecpay/enter.svg';
// import Kiosk from 'app/components/Assets/ecpay/kiosk.svg';
// import Receipt from 'app/components/Assets/ecpay/receipt.svg';

const colorstyle = `color:${StyleConstants.color.primaryyellow}`;

export const STEPS = [
  {
    value: 'enter',
    icon: '/img/ecpay/step1.png',
    label: 'Step 1',
    description: `Enter the amount and tap <span style=${colorstyle}>NEXT</span> to generate your <span style=${colorstyle}>Reference Number</span>`,
  },
  {
    value: 'kiosk',
    icon: '/img/ecpay/step2.png',
    label: 'Step 2',
    description: `Find the nearest <span style=${colorstyle}>ECPay Partner Outlet</span> On the machine kiosk, choose SquidPay and enter the generated reference number *Please wait for your <span style=${colorstyle}>electronic receipt with barcode</span>`,
  },
  {
    value: 'receipt',
    icon: '/img/ecpay/step3.png',
    label: 'Step 3',
    description: `Go to Cashier and present the <span style=${colorstyle}>e-receipt</span> to pay the amount. *Wait for the <span style=${colorstyle}>SMS/Email</span> confirmation before leaving the ECPay Partner Outlet`,
  },
];
