import * as React from 'react';

import Flex from 'app/components/Elements/Flex';

import { ProviderButton } from './BuyLoad.styles';

type ProviderSelectProps = {
  providers: string[];
  onSelect: (provider: string) => void;
};

/**
 * Selection of providers
 * @returns {string}      Returns the selected providers
 */
export default function ProviderSelect({
  providers,
  onSelect,
}: ProviderSelectProps) {
  return (
    <>
      <Flex alignItems="flex-start">
        {providers.map((p, i) => (
          <ProviderButton key={i} onClick={() => onSelect(p)}>
            <span className="icon">
              <img
                src={`/img/buyload/${p.replace(' ', '').toLowerCase()}.png`}
                alt={p}
              />
            </span>
            {p}
          </ProviderButton>
        ))}
      </Flex>
    </>
  );
}
