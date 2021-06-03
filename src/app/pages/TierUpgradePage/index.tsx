import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TierWrapper from 'app/components/Tier/Wrapper';
import TierItem from 'app/components/Tier/TierItem';

import { Tiers } from 'app/components/Helpers/Tiers';

/** selector */
import { selectUserTier } from 'app/App/slice/selectors';
import { useContainerSaga } from './slice';

export function TiersPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentTier: any = useSelector(selectUserTier);

  React.useEffect(() => {
    dispatch(actions.getFetchLoading());
  }, [actions, dispatch]);

  return (
    <TierWrapper>
      <Helmet>
        <title>Tiers</title>
      </Helmet>

      {Tiers.map(i => (
        <TierItem
          key={i.id}
          tierClass={i.class}
          tierName={i.name}
          limit={i.limit}
          isComplete={currentTier && i.id !== currentTier.id ? false : true}
          services={i.services}
          onClick={e =>
            history.push({
              pathname: '/tiers/upgrade',
              state: {
                name: i.class, // name of selected tier
                id: i.id, // record the ID of selected tier (silver, bronze, gold, platinum)
              },
            })
          }
        />
      ))}
    </TierWrapper>
  );
}
