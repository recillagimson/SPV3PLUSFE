import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import Button from 'app/components/Elements/Button';
import ComponentLoading from 'app/components/ComponentLoading';
import Dialog from 'app/components/Dialog';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';
import Logo from 'app/components/Assets/Logo';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Paragraph from 'app/components/Elements/Paragraph';

// Utils
import { requestTransactionField } from './helpers';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectRequestTransactionHistory,
} from './slice/selectors';
import { selectUser } from 'app/App/slice/selectors';

// Styles
import * as S from './TransactionHistory.style';

// Assets
import RequestTransactionLogo from 'app/components/Assets/request-transaction-history.svg';

function TransactionRequestPage() {
  const history = useHistory();
  const [isOpen, setOpen] = React.useState(false);
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const apiErrors: any = useSelector(selectError);
  const success: any = useSelector(selectRequestTransactionHistory);
  const profile: any = useSelector(selectUser);

  const initialFormData: object = {
    from: '',
    to: '',
    email: '',
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const [formErrors, setFormErrors] = React.useState(initialFormData);

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = form => {
    const keys = Object.keys(form);
    const errors = {};

    // Check if the field has an empty value
    keys.forEach(k => {
      if (form[k] === '') {
        errors[k] = 'This is a required field';
      }
    });

    setFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const onSubmit = () => {
    if (validate(formData)) return;
    dispatch(actions.getFetchRequestTransactionHistoryLoading(formData));
  };

  React.useEffect(() => {
    dispatch(actions.getFetchRequestTransactionHistoryReset()); // Clear all the data
    setFormData(initialFormData); // Reset in default state the forms
    setFormErrors(initialFormData); // Reset in error state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch(actions.getFetchRequestTransactionHistoryReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (apiErrors && apiErrors.code === 422) {
      const errorKeys = Object.keys(apiErrors.errors);

      errorKeys.map(err => {
        setFormErrors({
          ...formErrors,
          [err]: apiErrors.errors[err][0],
        });

        return err;
      });
    }

    if (success && success.length === 0) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiErrors, success]);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Request Transaction History</title>
      </Helmet>
      <S.Wrapper>
        <S.TransactionHeader>
          <h3>Request Transaction History</h3>
        </S.TransactionHeader>
        <ComponentLoading isLoading={loading}>
          <S.RequestTransactionForm>
            <img src={RequestTransactionLogo} alt="Request Transaction" />
            {requestTransactionField.map(field => (
              <S.FieldContainer key={field.name}>
                <Label>{field.label}</Label>
                <Field>
                  <Input
                    {...field}
                    value={formData[field.name]}
                    onChange={onChangeFormData}
                  />
                  {formErrors[field.name] && (
                    <ErrorMsg formError>{formErrors[field.name]}</ErrorMsg>
                  )}
                </Field>
              </S.FieldContainer>
            ))}
            <S.ButtonContainerRequestForm>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                onClick={onSubmit}
              >
                Send Request
              </Button>
            </S.ButtonContainerRequestForm>
          </S.RequestTransactionForm>
        </ComponentLoading>
        <Dialog show={isOpen} size="small">
          <S.PaddingWrapper>
            <Logo size="medium" />
            <div className="text-center">
              <CircleIndicator size="medium" color="primary">
                <FontAwesomeIcon icon="check" />
              </CircleIndicator>
              <H3 className="request-title" margin="15px 0 10px">
                Request sent!
              </H3>
              <Paragraph className="request-desc" margin="0 0 10px">
                Hi {profile.first_name}! Your request to upgrade limit is now
                being processed. You will receive feedback within 24-48 hours.
              </Paragraph>
              <Button
                fullWidth
                onClick={() => {
                  setOpen(false);
                  dispatch(actions.getFetchRequestTransactionHistoryReset());
                  history.push('/transaction-history');
                }}
                size="large"
                color="primary"
                variant="contained"
              >
                Ok
              </Button>
            </div>
          </S.PaddingWrapper>
        </Dialog>
      </S.Wrapper>
    </ProtectedContent>
  );
}

export { TransactionRequestPage };
