/**
 * Update Password Component
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from 'app/components/Elements/Input';

/** selectors, slice */
import { useComponentSaga } from './slice';
import { selectData, selectLoading, selectError } from './slice/selectors';

type Props = {
  initialValue: string;
};

export default function UpdatePasswordComponent(props: Props) {
  const { actions } = useComponentSaga();
  const success = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [newPass, setNewPass] = React.useState({ value: '', error: false });
  const [confirmPass, setConfirmPass] = React.useState({
    value: '',
    error: false,
  });

  React.useEffect(() => {
    const sampleData = {
      password: 'sample payload',
    };
    dispatch(actions.getFetchLoading(sampleData));
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (success) {
      // console.log('success');
    }
  }, [success]);

  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPass({
      value: e.currentTarget.value,
      error: false,
    });
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass({
      value: e.currentTarget.value,
      error: false,
    });
  };

  return (
    <>
      <Input
        type="password"
        value={newPass.value}
        placeholder="New password"
        onChange={onChangeNewPassword}
      />
      <Input
        type="password"
        value={confirmPass.value}
        placeholder="Confirm password"
        onChange={onChangeConfirmPassword}
      />
    </>
  );
}
