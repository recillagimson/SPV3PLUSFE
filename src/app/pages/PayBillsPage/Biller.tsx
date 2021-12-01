import * as React from 'react';

import Box from 'app/components/Box';

import { Biller } from './PayBills.style';
import { BillersState } from './slice/types';
import SearchBar from 'app/components/SearchBar';

type BillersProps = {
  category: string;
  billers: BillersState[];
  onSelect: (code: string) => void;
  onBack: () => void;
};
/**
 * @prop  {string}    category    selected category
 * @prop  {array}     billers     list of selected billers in the category
 * @prop  {function}  onSelect    on select of biller
 * @prop  {function}  onBack      callback to return to selection of biller category
 */
export default function Billers({
  category,
  billers,
  onSelect,
  onBack,
}: BillersProps) {
  const [selectedBillers, setSelectedBillers] = React.useState<BillersState[]>(
    [],
  );

  React.useEffect(() => {
    if (billers && billers.length > 0) {
      const filtered = onFilterBillers();
      setSelectedBillers(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billers, category]);

  const onFilterBillers = () => {
    const filtered = billers.filter(
      (biller: BillersState) =>
        biller.category.toLowerCase() === category?.toLowerCase() &&
        biller.active === '1',
    );
    return filtered;
  };

  const onSearchBiller = (text: string) => {
    const oldBillers = onFilterBillers();

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
      title={category}
      titleBorder
      withPadding
      titleAction={<SearchBar onChange={onSearchBiller} noMargin />}
      onBack={onBack}
    >
      {selectedBillers.map(b => (
        <Biller key={b.code} role="button" onClick={() => onSelect(b.code)}>
          <span className="biller-img">
            <img src={b.logo} alt={b.name} />
          </span>
          {b.name}
        </Biller>
      ))}
    </Box>
  );
}
