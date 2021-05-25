import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import TierRequirementList from 'app/components/Tier/TierRequirementList';
import Button from 'app/components/Elements/Button';
import SilverProfile from 'app/components/UpdateProfile/Silver';

import { TierIDs } from 'app/components/Helpers/Tiers';

import { TierRequirements } from './Requirements';

/**
 * Silver Upgrade Component
 */
export function SilverUpgradeComponent() {
  const location: any = useLocation();

  const [showRequirement, setShowRequirement] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);
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

  const gotoNext = () => {
    setShowRequirement(prev => !prev);
    if (tier.id === TierIDs.silver) {
      setShowProfile(prev => !prev);
    }
  };

  let idx = -1;
  if (tier && tier.id !== '') {
    idx = TierRequirements.findIndex(j => j.id === tier.id);
  }

  return (
    <ProtectedContent>
      {showRequirement && (
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
              Next
            </Button>
          }
        >
          <H5>Requirements</H5>
          {idx !== -1 && (
            <TierRequirementList
              requirements={TierRequirements[idx].requirement}
            />
          )}
        </Box>
      )}

      {showProfile && (
        <SilverProfile onSuccess={() => alert('success')} onCancel={gotoNext} />
      )}
    </ProtectedContent>
  );
}
