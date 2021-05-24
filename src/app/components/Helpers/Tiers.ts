/**
 * Tiers Information
 */
export const Tiers = [
  {
    id: 'c5d5cb3e-a175-11eb-b447-1c1b0d14e211',
    class: 'Bronze',
    name: 'Tier 1',
    status: 'Semi Verified',
    limit: 10000,
    services: [
      {
        name: 'Add Money',
        enabled: true,
      },
      {
        name: 'Buy Load',
        enabled: true,
      },
      {
        name: 'Pay Bills',
        enabled: true,
      },
      {
        name: 'Send Money',
        enabled: false,
      },
      {
        name: 'Send to Bank',
        enabled: false,
      },
    ],
  },
  {
    id: '5e007ec8-a176-11eb-b447-1c1b0d14e211',
    class: 'Silver',
    name: 'Tier 2',
    status: 'Fully Verified',
    limit: 100000,
    services: [
      {
        name: 'Add Money',
        enabled: true,
      },
      {
        name: 'Buy Load',
        enabled: true,
      },
      {
        name: 'Pay Bills',
        enabled: true,
      },
      {
        name: 'Send Money',
        enabled: true,
      },
      {
        name: 'Send to Bank',
        enabled: true,
      },
    ],
  },
  {
    id: '60d40d2f-a176-11eb-b447-1c1b0d14e211',
    class: 'Gold',
    name: 'Tier 3',
    status: 'Advanced',
    limit: 500000,
    services: [
      {
        name: 'Add Money',
        enabled: true,
      },
      {
        name: 'Buy Load',
        enabled: true,
      },
      {
        name: 'Pay Bills',
        enabled: true,
      },
      {
        name: 'Send Money',
        enabled: true,
      },
      {
        name: 'Send to Bank',
        enabled: true,
      },
    ],
  },
  {
    id: '63baa95c-a176-11eb-b447-1c1b0d14e211',
    class: 'Platinum',
    name: 'Tier 4',
    status: 'Professional',
    limit: 1000000,
    services: [
      {
        name: 'Add Money',
        enabled: true,
      },
      {
        name: 'Buy Load',
        enabled: true,
      },
      {
        name: 'Pay Bills',
        enabled: true,
      },
      {
        name: 'Send Money',
        enabled: true,
      },
      {
        name: 'Send to Bank',
        enabled: true,
      },
    ],
  },
  // {
  //   id: '68d63df8-a176-11eb-b447-1c1b0d14e211',
  //   class: 'Diamond',
  //   name: 'Tier 5',
  //   status: 'Expert',
  //   limit: 5000000,
  //   services: [
  //     {
  //       name: 'Add Money',
  //       enabled: true,
  //     },
  //     {
  //       name: 'Buy Load',
  //       enabled: true,
  //     },
  //     {
  //       name: 'Pay Bills',
  //       enabled: true,
  //     },
  //     {
  //       name: 'Send Money',
  //       enabled: true,
  //     },
  //     {
  //       name: 'Send to Bank',
  //       enabled: true,
  //     },
  //   ],
  // },
];

export const TierIDs = {
  bronze: 'c5d5cb3e-a175-11eb-b447-1c1b0d14e211',
  silver: '5e007ec8-a176-11eb-b447-1c1b0d14e211',
  gold: '60d40d2f-a176-11eb-b447-1c1b0d14e211',
  platinum: '63baa95c-a176-11eb-b447-1c1b0d14e211',
  diamond: '68d63df8-a176-11eb-b447-1c1b0d14e211',
};
