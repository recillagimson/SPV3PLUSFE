import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import TierRequirementList from 'app/components/Tier/TierRequirementList';
import Button from 'app/components/Elements/Button';
import SilverProfile from 'app/components/UpdateProfile/Silver';

import { TierIDs } from 'app/components/Helpers/Tiers';

import { TierRequirements } from './Requirements';
import PrimaryIDs from 'app/components/Tier/PrimaryID';
import SecondaryIDs from 'app/components/Tier/SecondaryID';
import Selfie from 'app/components/Tier/Selfie';

/**
 * Silver Upgrade Page
 * Will walk to all the process of upgrade to silver
 */
export default function SilverUpgradePage() {
  const history = useHistory();
  const location: any = useLocation();

  const [showRequirement, setShowRequirement] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showPrimaryID, setShowPrimaryID] = React.useState(false);
  const [showSecondaryID, setShowSecondaryID] = React.useState(false);
  const [showSelfie, setShowSelfie] = React.useState(false);
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
      setShowPrimaryID(prev => !prev);
    }
  };

  let idx = -1;
  if (tier && tier.id !== '') {
    idx = TierRequirements.findIndex(j => j.id === tier.id);
  }

  return (
    <ProtectedContent>
      <Helmet>
        <title>Upgrade [Tier]</title>
      </Helmet>

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

      {showPrimaryID && (
        <PrimaryIDs
          tierID={tier ? tier.id : ''}
          onSuccess={() => {
            setShowPrimaryID(false);
            setShowSecondaryID(true);
          }}
        />
      )}

      {showSecondaryID && (
        <SecondaryIDs
          tierID={tier ? tier.id : ''}
          onSuccess={() => {
            setShowSecondaryID(false);
            setShowSelfie(true);
          }}
          onBack={() => {
            setShowSecondaryID(false);
            setShowRequirement(true);
          }}
        />
      )}

      {showSelfie && (
        <Selfie
          tierID={tier ? tier.id : ''}
          onSuccess={() => {
            setShowSelfie(false);
            setShowProfile(true);
          }}
          onBack={() => {
            setShowSelfie(false);
            setShowRequirement(true);
          }}
        />
      )}

      {showProfile && (
        <SilverProfile
          onSuccess={() => history.push('/tiers')}
          onCancel={gotoNext}
        />
      )}
    </ProtectedContent>
  );
}
