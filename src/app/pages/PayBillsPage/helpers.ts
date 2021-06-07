import ElectricUtility from 'app/components/Assets/paybills/electric-utility.svg';
import Toll from 'app/components/Assets/paybills/toll.svg';
import Telecoms from 'app/components/Assets/paybills/telecoms.svg';
import Internet from 'app/components/Assets/paybills/internet.svg';
import Government from 'app/components/Assets/paybills/government.svg';
import WaterUtility from 'app/components/Assets/paybills/water-utility.svg';
import PaymentGateway from 'app/components/Assets/paybills/payment-gateway.svg';
import Loans from 'app/components/Assets/paybills/loans.svg';
import CreditCard from 'app/components/Assets/paybills/credit-card.svg';
import Insurance from 'app/components/Assets/paybills/insurance.svg';
import School from 'app/components/Assets/paybills/school.svg';
import Distribution from 'app/components/Assets/paybills/distribution.svg';
import RealEstate from 'app/components/Assets/paybills/real-estate.svg';
import Memorial from 'app/components/Assets/paybills/memorial.svg';
import Wallets from 'app/components/Assets/paybills/wallets.svg';
import Airlines from 'app/components/Assets/paybills/airlines.svg';
import Others from 'app/components/Assets/paybills/others.svg';

export const CATEGORIES = [
  {
    value: 'electric utility',
    icon: ElectricUtility,
    isActive: true,
    label: 'Electri Utility',
  },
  {
    value: 'tolls',
    icon: Toll,
    isActive: true,
    label: 'Toll',
  },
  {
    value: 'telecoms',
    icon: Telecoms,
    isActive: true,
    label: 'Telecoms',
  },
  {
    value: 'cable/internet',
    icon: Internet,
    isActive: true,
    label: 'Cable/Internet',
  },
  {
    value: 'government',
    icon: Government,
    isActive: true,
    label: 'Government',
  },
  {
    value: 'water utility',
    icon: WaterUtility,
    isActive: true,
    label: 'Water Utility',
  },
  {
    value: 'loans',
    icon: Loans,
    isActive: true,
    label: 'Loans',
  },
  {
    value: 'payment gateway',
    icon: PaymentGateway,
    isActive: true,
    label: 'Payment Gateway',
  },
  {
    value: 'credit cards',
    icon: CreditCard,
    isActive: true,
    label: 'Credit Card',
  },
  {
    value: 'insurance',
    icon: Insurance,
    isActive: true,
    label: 'Insurance',
  },
  {
    value: 'School',
    icon: School,
    isActive: true,
    label: 'School',
  },
  {
    value: 'distribution',
    icon: Distribution,
    isActive: true,
    label: 'Distribution',
  },
  {
    value: 'real estate',
    icon: RealEstate,
    isActive: true,
    label: 'Real Estate',
  },
  {
    value: 'memorial',
    icon: Memorial,
    isActive: true,
    label: 'Memorial',
  },
  {
    value: 'cash-in/wallets',
    icon: Wallets,
    isActive: true,
    label: 'Cash-In/Wallets',
  },
  {
    value: 'airlines',
    icon: Airlines,
    isActive: true,
    label: 'Airlines',
  },
  {
    value: 'others',
    icon: Others,
    isActive: true,
    label: 'Others',
  },
];

export const getFormData = (formData: any, code: string) => {
  let payload = {};
  switch (code) {
    case 'PRULI':
      payload = {
        ...formData,
        otherInfo: {
          AccountName: formData['otherInfo.AccountName'],
          DueDate: formData['otherInfo.DueDate'],
        },
      };
      break;
    case 'SMART':
      payload = {
        ...formData,
        otherInfo: {
          Product: formData['otherInfo.Product'],
          TelephoneNumber: formData['otherInfo.TelephoneNumber'],
          ServiceReferenceNo: formData['otherInfo.ServiceReferenceNo'],
        },
      };
      break;
    case 'SSS03':
      payload = {
        ...formData,
        otherInfo: {
          PayorType: formData['otherInfo.PayorType'],
          RelType: formData['otherInfo.RelType'],
          LoanAccountNo: formData['otherInfo.LoanAccountNo'],
          CompanyName: formData['otherInfo.CompanyName'],
          LastName: formData['otherInfo.LastName'],
          FirstName: formData['otherInfo.FirstName'],
          MI: formData['otherInfo.MI'],
          PlayformType: formData['otherInfo.PlayformType'],
        },
      };
      break;
    case 'MBCCC':
    case 'BPI00':
      payload = {
        ...formData,
        otherInfo: {
          ConsName: formData['otherInfo.ConsName'],
        },
      };
      break;
    case 'BNKRD':
      payload = {
        ...formData,
        otherInfo: {
          AccountName: formData['otherInfo.AccountName'],
          BillDate: formData['otherInfo.BillDate'],
        },
      };
      break;
    case 'UNBNK':
      payload = {
        ...formData,
        otherInfo: {
          Service: formData['otherInfo.Service'],
          ConsName: formData['otherInfo.ConsName'],
        },
      };
      break;
    case 'PILAM':
      payload = {
        ...formData,
        otherInfo: {
          DueDate: formData['otherInfo.DueDate'],
        },
      };
      break;
    case 'ADMSN':
      payload = {
        ...formData,
        otherInfo: {
          LastName: formData['otherInfo.LastName'],
          FirstName: formData['otherInfo.FirstName'],
          MiddleName: formData['otherInfo.MiddleName'],
          PaymentType: formData['otherInfo.PaymentType'],
          Course: formData['otherInfo.Course'],
          TotalAssessment: formData['otherInfo.TotalAssessment'],
          SchoolYear: formData['otherInfo.SchoolYear'],
          Term: formData['otherInfo.Term'],
        },
      };
      break;
    case 'UBNK4':
      payload = {
        ...formData,
        otherInfo: {
          StudentName: formData['otherInfo.StudentName'],
          Branch: formData['otherInfo.Branch'],
        },
      };
      break;
    case 'ASLNK':
      payload = {
        ...formData,
        otherInfo: {
          LastName: formData['otherInfo.LastName'],
          FirstName: formData['otherInfo.FirstName'],
          MiddleName: formData['otherInfo.MiddleName'],
        },
      };
      break;
    default:
      payload = formData;
  }

  return payload;
};
