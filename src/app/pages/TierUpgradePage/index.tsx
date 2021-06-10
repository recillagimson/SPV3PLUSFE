import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TierWrapper from 'app/components/Tier/Wrapper';
import TierItem from 'app/components/Tier/TierItem';

import { TierIDs, Tiers } from 'app/components/Helpers/Tiers';

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

      {Tiers.map(i => {
        let isComplete = false;
        // current tier is complete
        if (
          (currentTier && currentTier.id === i.id) ||
          i.id === TierIDs.bronze
        ) {
          isComplete = true;
        }

        // if current tier is silver and the loop is for bronze
        if (
          currentTier &&
          currentTier.id === TierIDs.silver &&
          i.id === TierIDs.bronze
        ) {
          isComplete = true;
        }

        // if current tier is silver and the loop is for silver and bronze
        if (
          currentTier &&
          currentTier.id === TierIDs.gold &&
          i.id === TierIDs.bronze &&
          i.id === TierIDs.silver
        ) {
          isComplete = true;
        }

        // if current tier is silver and the loop is for gold, silver and bronze
        if (
          currentTier &&
          currentTier.id === TierIDs.platinum &&
          i.id === TierIDs.bronze &&
          i.id === TierIDs.silver &&
          i.id === TierIDs.gold
        ) {
          isComplete = true;
        }

        return (
          <TierItem
            key={i.id}
            tierClass={i.class}
            tierName={i.name}
            limit={i.limit}
            isComplete={isComplete}
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
        );
      })}
    </TierWrapper>
  );
}
