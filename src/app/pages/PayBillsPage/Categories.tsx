import * as React from 'react';

import Loading from 'app/components/Loading';
import H6 from 'app/components/Elements/H6';
import Flex from 'app/components/Elements/Flex';

import { CATEGORIES } from './helpers';
import { CategoryButton } from './PayBills.style';
import { BillersState } from './types';

type CategoriesProps = {
  loading: boolean;
  billers: BillersState[];
  onSelect: (
    cat: string,
    label: string,
    selectedBillers: BillersState[],
  ) => void;
};

/**
 * Set display of different categories for the billers
 * @prop {array}    billers     list of all billers
 * @prop {function} onSelect    returns the selected category of the billers
 *
 */
export default function Categories({
  loading,
  billers,
  onSelect,
}: CategoriesProps) {
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (billers && billers.length > 0) {
      // Filter the list of billers, save only the active billers
      const filter = billers.filter(j => j.active === '1');

      // create a new set of categories
      // code will create a new array with unique categories
      const cats = Array.from(new Set(filter.map(j => j.category)));

      // return the new array
      // ie: ['Electricity', 'Toll', ..etc]
      setCategories(cats);
    }
  }, [billers]);

  const onSelectCategory = (cat: string, label: string) => {
    const filteredBillers = billers.filter(
      (biller: BillersState) =>
        biller.category.toLowerCase() === cat?.toLowerCase() &&
        biller.active === '1',
    );
    onSelect(cat, label, filteredBillers);
  };

  return (
    <>
      <H6>Categories</H6>
      <Flex alignItems="flex-start" justifyContent="flex-start" wrap="wrap">
        {loading && <Loading position="relative" />}
        {categories.map((category, idx) => {
          // map the category with the saved icon in CATEGORIES helper
          let i = CATEGORIES.findIndex(j =>
            j.value.includes(category.substring(0, 4).toLowerCase()),
          );

          return (
            <CategoryButton
              key={idx}
              onClick={() =>
                onSelectCategory(
                  category,
                  i !== -1 ? CATEGORIES[i].label : category,
                )
              }
              role="button"
            >
              <img
                src={i !== -1 ? CATEGORIES[i].icon : '/img/paybills/others.svg'}
                alt={i !== -1 ? CATEGORIES[i].label : category}
              />
              <span>{i !== -1 ? CATEGORIES[i].label : category}</span>
            </CategoryButton>
          );
        })}
      </Flex>
    </>
  );
}
