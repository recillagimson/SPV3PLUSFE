import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';

import { TierIDs } from 'app/components/Helpers/Tiers';

import { TierRequirements } from './Requirements';
import SilverUpgrade from './SilverUpgrade';
import GoldUpgrade from './GoldUpgrade';
import PlatinumUpgrade from './PlatinumUpgrade';

export function TierUpgradePage() {
  const location: any = useLocation();

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

  return (
    <ProtectedContent>
      <Helmet>
        <title>Upgrade Tier [{tier.name}]</title>
      </Helmet>
      {tier && tier.id !== '' && tier.id === TierIDs.silver && (
        <SilverUpgrade />
      )}
      {tier && tier.id !== '' && tier.id === TierIDs.gold && <GoldUpgrade />}
      {tier && tier.id !== '' && tier.id === TierIDs.platinum && (
        <PlatinumUpgrade />
      )}
    </ProtectedContent>
  );
}
