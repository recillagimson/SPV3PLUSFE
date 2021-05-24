import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import { Tiers } from 'app/components/Helpers/Tiers';

export function TierUpgradePage() {
  const history = useHistory();
  const location = useLocation();

  const [tierName, setTierName] = React.useState('');

  React.useEffect(() => {
    if (location && location.state) {
      const i = Tiers.findIndex(j => j.id === location.state);
      setTierName(i !== -1 ? Tiers[i].class : '');
    }
  }, [location]);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Upgrade [Tier]</title>
      </Helmet>

      <Box title={tierName} titleBorder withPadding>
        <ul>
          <li>requirement list</li>
          <li>requirement list</li>
          <li>requirement list</li>
        </ul>
      </Box>
    </ProtectedContent>
  );
}
