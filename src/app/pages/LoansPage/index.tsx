import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';
import Button from 'app/components/Elements/Button';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/App/slice/selectors';
// assets
import IconChevron from 'app/components/Assets/icon-chevron';
import LoansComingSoon from 'app/components/Assets/LoansComingSoon';
// partner logos
import RfscLogo from 'app/components/Assets/RFSC_Logo.png';
// styles
import * as S from './styled/LoansPage';

export function LoansPage() {
  const profile: any = useSelector(selectUser);
  const [selection, setSelection] = React.useState<'partners' | 'my-loans'>(
    'partners',
  );

  const [selectedPartner, setSelectedPartner] = React.useState<string>('');
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const isPartner = React.useMemo(() => {
    return selection === 'partners';
  }, [selection]);

  const selectedContent = React.useMemo(() => {
    switch (isPartner) {
      case true:
        return (
          <S.PartnerTile
            role="button"
            onClick={e => setSelectedPartner('rfsc')}
          >
            <img src={RfscLogo} alt="RFSC logo" />
          </S.PartnerTile>
        );
      default:
        return (
          <React.Fragment>
            <LoansComingSoon />
            <Paragraph align="center" weight="bold" margin="24px 0 0">
              Hi {profile?.first_name}
            </Paragraph>
            <Paragraph align="center" weight="bold">
              This page will be coming soon!
            </Paragraph>
          </React.Fragment>
        );
    }
  }, [profile.first_name, isPartner]);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Loans</title>
      </Helmet>
      <Box
        title={selection === 'partners' ? 'Loan Partners' : 'My Loans'}
        titleBorder
        withPadding
      >
        {!selectedPartner ? (
          <React.Fragment>
            <Flex
              justifyContent="flex-start"
              style={{ marginBlockEnd: '50px' }}
            >
              <Button
                color="secondary"
                variant={isPartner ? 'contained' : 'outlined'}
                onClick={e => setSelection('partners')}
              >
                Loan Partners
              </Button>
              <Button
                color="secondary"
                variant={!isPartner ? 'contained' : 'outlined'}
                onClick={e => setSelection('my-loans')}
              >
                My Loans
              </Button>
            </Flex>
            <Flex
              direction={isPartner ? 'row' : 'column'}
              justifyContent="flex-start"
              alignItems="center"
            >
              {selectedContent}
            </Flex>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Flex
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <S.CollapsibleHeader
                role="button"
                onClick={e => setSelectedTab(0)}
              >
                <Paragraph align="left" weight="bold" margin="0">
                  Multi-Purpose Loan / Personal Loan
                </Paragraph>
                <S.Spacer />
                <IconChevron
                  style={{
                    transform:
                      selectedTab === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                    transformOrigin: '50% 50%',
                    transition: 'all .2s ease',
                  }}
                />
              </S.CollapsibleHeader>
              <S.CollapsibleContent selected={selectedTab === 0}>
                <Paragraph align="left" weight="light" margin="0 0 12px">
                  Overview:
                </Paragraph>
                <ul
                  style={{
                    fontSize: '12px',
                    padding: '0 16px',
                    margin: 0,
                  }}
                >
                  <li>Home Improvement Loan</li>
                  <li>Education Loan</li>
                  <li>Emergency Fun Loan</li>
                  <li>Professional Loan</li>
                  <li>Salary Loan (institutional)</li>
                </ul>
              </S.CollapsibleContent>
              <S.CollapsibleHeader
                role="button"
                onClick={e => setSelectedTab(1)}
              >
                <Paragraph align="left" weight="bold" margin="0">
                  SME Business Loans
                </Paragraph>
                <S.Spacer />
                <IconChevron
                  style={{
                    transform:
                      selectedTab === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                    transformOrigin: '50% 50%',
                    transition: 'all .2s ease',
                  }}
                />
              </S.CollapsibleHeader>
              <S.CollapsibleContent selected={selectedTab === 1}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </S.CollapsibleContent>
            </Flex>
          </React.Fragment>
        )}
      </Box>
    </ProtectedContent>
  );
}
