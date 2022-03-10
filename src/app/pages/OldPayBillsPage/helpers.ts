export const VIEWS = {
  categories: 'categories',
  subCategories: 'subCategories',
  fields: 'fields',
  review: 'review',
  receipt: 'receipt',
};

export const CATEGORIES = [
  {
    value: 'electric utility',
    icon: '/img/paybills/electric-utility.svg',
    isActive: true,
    label: 'Electric Utility',
  },
  {
    value: 'toll',
    icon: '/img/paybills/toll.svg',
    isActive: true,
    label: 'Toll',
  },
  {
    value: 'telecoms',
    icon: '/img/paybills/telecoms.svg',
    isActive: true,
    label: 'Telecoms',
  },
  {
    value: 'cable/internet',
    icon: '/img/paybills/internet.svg',
    isActive: true,
    label: 'Cable/Internet',
  },
  {
    value: 'government',
    icon: '/img/paybills/government.svg',
    isActive: true,
    label: 'Government',
  },
  {
    value: 'water utility',
    icon: '/img/paybills/water-utility.svg',
    isActive: true,
    label: 'Water Utility',
  },
  {
    value: 'loans',
    icon: '/img/paybills/loans.svg',
    isActive: true,
    label: 'Loans',
  },
  {
    value: 'payment gateway',
    icon: '/img/paybills/payment-gateway.svg',
    isActive: true,
    label: 'Payment Gateway',
  },
  {
    value: 'credit cards',
    icon: '/img/paybills/credit-card.svg',
    isActive: true,
    label: 'Credit Card',
  },
  {
    value: 'insurance',
    icon: '/img/paybills/insurance.svg',
    isActive: true,
    label: 'Insurance',
  },
  {
    value: 'school',
    icon: '/img/paybills/school.svg',
    isActive: true,
    label: 'School',
  },
  {
    value: 'distribution',
    icon: '/img/paybills/distribution.svg',
    isActive: true,
    label: 'Distribution',
  },
  {
    value: 'real estate',
    icon: '/img/paybills/real-estate.svg',
    isActive: true,
    label: 'Real Estate',
  },
  {
    value: 'memorial',
    icon: '/img/paybills/memorial.svg',
    isActive: true,
    label: 'Memorial',
  },
  {
    value: 'cash-in/wallets',
    icon: '/img/paybills/wallets.svg',
    isActive: true,
    label: 'Cash-In/Wallets',
  },
  {
    value: 'airlines',
    icon: '/img/paybills/airlines.svg',
    isActive: true,
    label: 'Airlines',
  },
  {
    value: 'others',
    icon: '/img/paybills/others.svg',
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
    case 'CNVRG':
      payload = {
        ...formData,
        otherInfo: {
          AccountName: formData['otherInfo.AccountName'],
        },
      };
      break;
    default:
      payload = formData;
  }

  return payload;
};

export const disconnectionDialogLogo = val => {
  switch (val) {
    case 1:
      return 'exclamation';
    case 2:
    case 3:
    case 5:
    case 4:
    case 6:
    case 13:
    case 17:
    case 26:
    case 27:
      return 'times';
    default:
      return 'check';
  }
};

export const isPrimaryColorForDisconnection = val => {
  switch (val) {
    case 1:
      return 'primary';
    case 2:
    case 3:
    case 5:
    case 4:
    case 6:
    case 13:
    case 17:
    case 26:
    case 27:
      return 'danger';
    default:
      return 'primary';
  }
};

export const disconnectionTitleMessage = val => {
  switch (val) {
    case 1:
      return 'Heads up!';
    case 2:
    case 3:
    case 5:
    case 4:
    case 6:
    case 13:
    case 17:
    case 26:
    case 27:
      return 'Oops!';
    default:
      return 'Successful Payment';
  }
};
