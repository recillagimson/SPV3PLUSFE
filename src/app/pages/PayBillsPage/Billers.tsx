import * as React from 'react';

import Box from 'app/components/Box';

import { Biller } from './PayBills.style';
import { BillersState } from './types';
import SearchBar from 'app/components/SearchBar';
import BillerLogo from './BillerLogo';

type BillersProps = {
  label: string;
  billers: BillersState[];
  onSelect: (biller: BillersState) => void;
  onBack: () => void;
};
/**
 * @prop  {array}     billers     list of selected billers in the category (should be filtered already)
 * @prop  {function}  onSelect    on select of biller
 * @prop  {function}  onBack      callback to return to selection of biller category
 */
export default function Billers({
  label,
  billers,
  onSelect,
  onBack,
}: BillersProps) {
  const [selectedBillers, setSelectedBillers] = React.useState<BillersState[]>(
    [],
  );

  React.useEffect(() => {
    if (billers && billers.length > 0) {
      setSelectedBillers([...billers]);
    }
  }, [billers]);

  const onSearchBiller = (text: string) => {
    const oldBillers = billers;

    if (text !== '') {
      const newBillers = oldBillers.filter(f => {
        if (f.name.toLowerCase().includes(text.toLowerCase())) {
          return f;
        }
        return null;
      });
      setSelectedBillers(newBillers);
    }

    if (text === '') {
      setSelectedBillers(oldBillers);
    }
  };

  return (
    <Box
      title={label}
      titleBorder
      withPadding
      titleAction={<SearchBar onChange={onSearchBiller} noMargin />}
      onBack={onBack}
    >
      {selectedBillers.map(b => (
        <Biller key={b.code} role="button" onClick={() => onSelect(b)}>
          <span className="biller-img">
            <BillerLogo path={b.logo} biller={b.name} />
          </span>
          {b.name}
        </Biller>
      ))}
    </Box>
  );
}
