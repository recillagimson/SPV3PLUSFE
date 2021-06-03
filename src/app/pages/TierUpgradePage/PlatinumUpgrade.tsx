import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import TierRequirementList from 'app/components/Tier/TierRequirementList';
import Button from 'app/components/Elements/Button';
import Note from 'app/components/Elements/Note';
import Dialog from 'app/components/Dialog';

import minor from 'app/components/Assets/minors.png';

import { TierRequirements } from './Requirements';
import { useSelector } from 'react-redux';
import { selectUserToken } from 'app/App/slice/selectors';

/**
 * Platinum Upgrade Page
 * Will walk to all the process of upgrade to platinum
 */
export default function PlatinumUpgradeComponent() {
  const location: any = useLocation();
  const loggedInUser: any = useSelector(selectUserToken);

  const [isMinor, setIsMinor] = React.useState(false);
  const [showMinor, setShowMinor] = React.useState(false);
  const [tier, setTier] = React.useState({
    name: '',
    id: '',
  });

  React.useEffect(() => {
    if (location && location.state && Object.keys(location.state).length > 0) {
      setTier({
        name: location.state.name || '',
        id: location.state.id || '',
      });
    }
  }, [location]);

  React.useEffect(() => {
    if (loggedInUser && loggedInUser.birth_date) {
      const bdate = loggedInUser.birth_date.split('-');

      const currentYear = new Date().getFullYear();
      if (currentYear - parseInt(bdate[0], 10) < 18) {
        setIsMinor(true);
      } else {
        setIsMinor(false);
      }
    }
  }, [loggedInUser]);

  const gotoNext = () => {
    if (isMinor) {
      setShowMinor(prev => !prev);
      return;
    }
    window.location.href = 'mailto:support@squid.ph';
  };

  let idx = -1;
  if (tier && tier.id !== '') {
    idx = TierRequirements.findIndex(j => j.id === tier.id);
  }

  return (
    <>
      <Box
        title={tier.name}
        titleBorder
        withPadding
        footerAlign="right"
        footer={
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={gotoNext}
          >
            {!isMinor ? 'Send Request' : 'Next'}
          </Button>
        }
      >
        <Note style={{ margin: '0 0 20px' }}>
          To upgrade your limit, send us at least (1) Proof of Residence and
          Proof of Income at support@squid.ph
        </Note>
        <H5>Requirements</H5>
        {idx !== -1 && (
          <TierRequirementList
            requirements={TierRequirements[idx].requirement}
          />
        )}
        {isMinor && <Note>*Minors can only upgrade to Silver tier.</Note>}
      </Box>

      {/* Show success */}
      <Dialog show={showMinor} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img src={minor} alt="Minor" />

          <p style={{ margin: '20px 0' }}>
            Oops! Minors can only be upgraded to Silver Tiers
          </p>
          <Button
            fullWidth
            onClick={() => setShowMinor(false)}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
}
