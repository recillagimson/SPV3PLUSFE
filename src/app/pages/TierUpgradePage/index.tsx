import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TierWrapper from 'app/components/Tier/Wrapper';
import TierItem from 'app/components/Tier/TierItem';

import { Tiers } from 'app/components/Helpers/Tiers';

/** selector */
import { selectUserTier } from 'app/App/slice/selectors';

export function TiersPage() {
  const history = useHistory();
  const currentTier: any = useSelector(selectUserTier);

  return (
    <TierWrapper>
      <Helmet>
        <title>Tiers</title>
      </Helmet>

      {Tiers.map(i => (
        <TierItem
          tierClass={i.class}
          tierName={i.name}
          limit={i.limit}
          isComplete={currentTier && i.id !== currentTier.id ? false : true}
          services={i.services}
          onClick={e =>
            history.push({
              pathname: '/tiers/upgrade',
              state: i.id,
            })
          }
        />
      ))}
    </TierWrapper>
  );
}
