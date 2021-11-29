/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import useFetch from 'utils/useFetch';

import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import { VIEWS } from './helpers';

import { BillersState } from './slice/types';

import Categories from './Categories';
import Billers from './Biller';

export function PayBillsPage() {
  const { loading, error, response, goFetch, fetchReset } = useFetch();

  const [view, setView] = React.useState(''); // initial view (no display)
  const [billers, setBillers] = React.useState<BillersState[]>([]); // empty set of all billers
  const [category, setCategory] = React.useState(''); // selected category

  React.useEffect(() => {
    // initial retrieval of all the billers
    onGetBillers();
  }, []);

  React.useEffect(() => {
    if (response && response.data && response.data.length > 0) {
      setBillers(response.data);
      setView(VIEWS.categories); // display the categories
      fetchReset();
    }
  }, [response]);

  React.useEffect(() => {}, [error]);

  const onGetBillers = () => {
    goFetch('/pay/bills', 'GET', '', '', true, true);
  };

  const onSelectCategory = (category: string) => {
    setCategory(category);
    setView(VIEWS.subCategories);
  };

  const onSelectBiller = (code: string) => {
    console.log(code);
  };

  let title = 'Pay Bills';
  if (view === VIEWS.subCategories) {
    title = category;
  }
  if (view === VIEWS.review) {
    title = 'Review Payment';
  }

  return (
    <ProtectedContent>
      <Helmet title="Pay Bills" />
      {view === VIEWS.categories && (
        <Box title={title} titleBorder withPadding>
          {loading && <Loading position="relative" />}

          <Categories billers={billers} onSelect={onSelectCategory} />
        </Box>
      )}
      {view === VIEWS.subCategories && (
        <Billers
          category={category}
          billers={billers}
          onSelect={onSelectBiller}
        />
      )}
    </ProtectedContent>
  );
}
