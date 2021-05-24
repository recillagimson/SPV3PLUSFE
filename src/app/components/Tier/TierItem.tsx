/**
 * Tier Item for Tier Selection
 * @prop {string}   tierClass       Tier class
 * @prop {string}   tierName        Tier name
 * @prop {array}    services        An array of object [{ name: string; enabled: boolean; }]
 * @prop {number}   limit           Wallet tier limit
 * @prop {function} onClick         callback for the button
 * @prop {boolean}  isComplete      If tier is already completed
 */
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'app/components/Elements/Button';
import { numberCommas } from 'app/components/Helpers';

import {
  ItemWrapper,
  TierClass,
  TierName,
  TierServices,
  TierLimit,
} from './Item';

type TierItemProps = {
  tierClass: string;
  tierName: string;
  services: {
    name: string;
    enabled: boolean;
  }[];
  limit: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isComplete: boolean;
};

export default function TierItem({
  tierClass,
  tierName,
  services,
  limit,
  onClick,
  isComplete,
}: TierItemProps) {
  return (
    <ItemWrapper>
      <TierClass>{tierClass}</TierClass>
      <TierName>{tierName}</TierName>
      {services && services.length > 0 && (
        <TierServices>
          <h6>Available Services</h6>
          <ul>
            {services.map(i => (
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={i.enabled ? 'check' : 'times'} />
                </span>
                {i.name}
              </li>
            ))}
          </ul>
        </TierServices>
      )}
      <TierLimit>
        <small>Wallet Limit</small>
        {numberCommas(limit)}
      </TierLimit>
      <Button
        disabled={isComplete}
        size="large"
        onClick={!isComplete ? onClick : undefined}
        variant="contained"
        color="secondary"
      >
        {isComplete ? 'Complete' : 'Upgrade'}
      </Button>
    </ItemWrapper>
  );
}
