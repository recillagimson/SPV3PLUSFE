import React from 'react';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import Paragraph from 'app/components/Elements/Paragraph';
import IconChevron from 'app/components/Assets/icon-chevron';
import * as S from '../styled/LoansPage';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line eqeqeq
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const PersonalLoan = [
  {
    title: 'Overview',
    details: [
      'Home Imrovement Loan',
      'Education Loan',
      'Professional Loan',
      'Salary Loan (institutional)',
    ],
  },
  {
    title: 'Interest',
    details: ['4% or 4.5% per month'],
  },
  {
    title: 'Loan amount',
    details: ['P10,000 - P500,000'],
  },
  {
    title: 'General Eligibility (Personal Loan/for employees)',
    details: [
      '21-64 years old',
      'Minimum net monthly income of P12,000',
      'At least 1 year work tenure',
    ],
  },
  {
    title: 'General Eligibility (Personal Loan/for employees)',
    details: [
      '2 government issued IDs (primary ID) and company ID',
      'Latest 2 months payslip',
      'Screenshot of SSS/Philhealth/GSIS contribution/COL',
      'Latest proof of billing',
      'Selfie while holding a valid ID',
    ],
  },
];

const BusinessLoan: Array<{
  title: string;
  details: Array<string>;
  note?: string;
}> = [
  {
    title: 'Overview',
    details: [
      'Financing assistance to small- medium scale businesses & entrepreneurs to meet cash flow requirements and additional capitalization for business',
      'Working Capital Loan Business',
      'Expansion Loan Franchising Loan',
      'Machinery/Heavy Equipment Loan',
    ],
  },
  {
    title: 'General Eligibility (Personal Loan/for employees)',
    details: [
      'Operational and profitable for at least 1 year',
      'Essential industries',
      'Minimum monthly income of P15,000',
    ],
  },
  {
    title: 'Additional Requirements (Sole Proprietorship)',
    details: [
      'At least two (2) government-issued IDs',
      'Proof of residency – billing statements/official receipts/lease contract (for those renting)',
      'DTI Registration Certificate',
      'Business Permit or Mayor’s permit',
      'Other Permits/Certification issued by government agencies as required depending on type of industry (such as permits issued by DENR, DOH, DAR, RoD, LTO, LRA, etc.)',
      'Picture of business',
      'List of suppliers (with landline/mobile no. and transaction details)',
      'Franchise Certificate (for franchise financing loan)',
      "Purchase order/proof of intent to purchase machinery/equipment (if loan purpose is as indicated)/ Dealer's quotation/offer to sell for financing loans (for Machinery Loan)",
      'Selfie while holding a valid ID',
    ],
    note:
      'Note: Proof of income requirement may vary depending on the loan amount requested, business size, industry, source of payment.',
  },
  {
    title: 'Additional Requirements (Partnership/Corporation)',
    details: [
      'At least two (2) government-issued IDs (for authorized signatory)',
      'Proof of business site –billing statements/official receipts/lease contract (for those renting)',
      'SEC Registration Certificate',
      'Articles of Incorporation/Partnership and By-laws',
      'Notarized GIS',
      "Notarized Partnership/Board Resolution and Secretary's Certificate (denote appointment of authorized signatory to transact for the loan, to sign loan documents and authorization to conduct credit investigation)",
      'SPECIAL POWER OF ATTORNEY (issued by corporations/partnerships for representatives acting on behalf of the company)',
      'Business Permit',
      'Other Permits/Certification issued by government agencies as required depending on type of industry (such as permits issued by DENR, DOH, DAR, RoD, LTO, LRA, etc.)',
      'Picture of business site/business operations',
      'Proof of income (latest audited financial statements/latest 3 months sales records or invoices/latest 3 months bank statements)',
      'List of suppliers (with landline/contact details and transaction details)',
      'Continuing Suretyship Agreement (for corporations)',
      'Selfie while holding a valid ID (authorized signatory)',
      'Franchise Certificate (for franchise financing loan)',
    ],
    note:
      'Note: Proof of income requirement may vary depending on the loan amount requested, business size, industry, source of payment.',
  },
];

type Props = {
  setPartnerStep: React.Dispatch<React.SetStateAction<number>>;
};

const CollapsibleContent = ({ setPartnerStep }: Props) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  return (
    <React.Fragment>
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <S.CollapsibleHeader role="button" onClick={e => setSelectedTab(0)}>
          <Paragraph align="left" weight="bold" margin="0">
            Multi-Purpose Loan / Personal Loan
          </Paragraph>
          <S.Spacer />
          <IconChevron
            style={{
              transform: selectedTab === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
              transformOrigin: '50% 50%',
              transition: 'all .2s ease',
            }}
          />
        </S.CollapsibleHeader>
        <S.CollapsibleContent selected={selectedTab === 0}>
          {PersonalLoan.map(({ title, details }, index) => (
            <React.Fragment key={uuidv4()}>
              <Paragraph align="left" weight="light" margin="0 0 12px">
                {title}:
              </Paragraph>
              <ul
                style={{
                  fontSize: '12px',
                  padding: '0 16px',
                  margin: '0 0 12px',
                  maxWidth: '382px',
                }}
              >
                {details.map((detail, idx) => (
                  <li key={uuidv4()}>{detail}</li>
                ))}
              </ul>
            </React.Fragment>
          ))}
          <Flex justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={e => setPartnerStep(1)}
            >
              Next
            </Button>
          </Flex>
        </S.CollapsibleContent>
        <S.CollapsibleHeader role="button" onClick={e => setSelectedTab(1)}>
          <Paragraph align="left" weight="bold" margin="0">
            SME Business Loans
          </Paragraph>
          <S.Spacer />
          <IconChevron
            style={{
              transform: selectedTab === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
              transformOrigin: '50% 50%',
              transition: 'all .2s ease',
            }}
          />
        </S.CollapsibleHeader>
        <S.CollapsibleContent selected={selectedTab === 1}>
          <Paragraph align="left" weight="light" margin="0 0 12px">
            Requirements
          </Paragraph>
          {BusinessLoan.map(({ title, details, note }) => (
            <React.Fragment key={uuidv4()}>
              <Paragraph align="left" weight="light" margin="0 0 12px">
                {title}:
              </Paragraph>
              <ul
                style={{
                  fontSize: '12px',
                  padding: '0 16px',
                  maxWidth: '382px',
                  margin: '0 0 12px',
                }}
              >
                {details.map((detail, idx) => (
                  <li key={uuidv4()}>{detail}</li>
                ))}
              </ul>
              {note && (
                <Paragraph
                  align="left"
                  weight="light"
                  margin="0 0 12px"
                  style={{
                    color: '#ff645e',
                    fontSize: '12px',
                    maxWidth: '382px',
                  }}
                >
                  {note}
                </Paragraph>
              )}
            </React.Fragment>
          ))}
          <Flex justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={e => setPartnerStep(1)}
            >
              Next
            </Button>
          </Flex>
        </S.CollapsibleContent>
      </Flex>
    </React.Fragment>
  );
};

export default CollapsibleContent;
