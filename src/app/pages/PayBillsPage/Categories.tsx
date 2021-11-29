import * as React from 'react';

import H6 from 'app/components/Elements/H6';
import useFetch from 'utils/useFetch';

import { CATEGORIES } from './helpers';
import * as S from './PayBills.style';
import { BillersState } from './slice/types';

type CategoriesProps = {
  billers: BillersState[];
  onSelect: (cat: string) => void;
};

/**
 * Set display of different categories for the billers
 * @prop {array}    billers     list of all billers
 * @prop {function} onSelect    returns the selected category of the billers
 *
 */
export default function Categories({ billers, onSelect }: CategoriesProps) {
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

  return (
    <>
      <H6>Categories</H6>

      <S.BillersOptions>
        {categories.map((category, idx) => {
          // map the category with the saved icon in CATEGORIES helper
          let i = CATEGORIES.findIndex(j =>
            j.value.includes(category.substring(0, 4).toLowerCase()),
          );

          return (
            <S.BillerOptionsItem
              key={idx}
              onClick={() => onSelect(category)}
              role="button"
            >
              <img src={i !== -1 ? CATEGORIES[i].icon : ''} alt={category} />
              <p>{category}</p>
            </S.BillerOptionsItem>
          );
        })}
      </S.BillersOptions>
    </>
  );
}
