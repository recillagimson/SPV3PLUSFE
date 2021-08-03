import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useContainerSaga } from './slice';

// components
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import {
  selectLoading,
  // selectError,
  selectForeignExchangeData,
} from './slice/selectors';

export function ForeignExchangePage() {
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const foreignExchangeData: any = useSelector(selectForeignExchangeData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loading = useSelector(selectLoading);

  React.useEffect(() => {
    dispatch(actions.getForeignExchangeLoading());
  }, [actions, dispatch]);

  console.log(foreignExchangeData);
  return (
    <ProtectedContent>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <>test</>
    </ProtectedContent>
  );
}
