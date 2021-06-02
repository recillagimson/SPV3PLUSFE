import * as React from 'react';
// import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

// Components
import ComponentLoading from 'app/components/ComponentLoading';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import ErrorMsg from 'app/components/Elements/ErrorMsg';

/** slice */
import { selectData } from 'app/pages/DashboardPage/slice/selectors';

import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectBillers,
  selectBillerCode,
  selectValidatedBiller,
} from './slice/selectors';
import { BillersState, BillerStateOptions } from './slice/types';

// Helpers
import { numberCommas } from 'app/components/Helpers';
import { CATEGORIES } from './helpers';
import { RENDER_FIELDS, RENDER_SELECT_ITEMS } from './fields';

// Styles
import * as S from './PayBills.style';

export function PayBillsPage(props) {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const dashData: any = useSelector(selectData);
  const billers: any = useSelector(selectBillers);
  const billerCode: string = useSelector(selectBillerCode);
  const validatedBiller: any = useSelector(selectValidatedBiller);
  const [steps, setSteps] = React.useState(0);
  const [selectedBillers, setSelectedBillers] = React.useState([]);
  const [filteredBillers, setSelectedFilteredBillers] = React.useState([]);

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(
      parseFloat(dashData.balance_info.available_balance).toFixed(2),
    );
  }

  const initialFormData = {};

  const [formData, setFormData] = React.useState(initialFormData);
  const [formErrors, setFormErrors] = React.useState(initialFormData);

  React.useEffect(() => {
    setSteps(0); // Reset in first step the pay bills page
    setFormData(initialFormData); // Reset in default state the forms
    dispatch(actions.getBillersLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (Object.keys(validatedBiller).length) {
      setSteps(steps + 1);
    }
  }, [steps, validatedBiller]);

  const selectCategory = (category?: string) => {
    const filtered = billers.filter(
      (biller: BillersState) =>
        biller.category.toLowerCase() === category?.toLowerCase(),
    );
    console.log('filtered', filtered);
    setSelectedBillers(filtered);
    setSelectedFilteredBillers(filtered);
    setSteps(1);
  };

  const onSearchBillers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;

    const filtered = selectedBillers?.filter((biller: BillersState) => {
      return (
        biller.name.toLowerCase().search(searchString.toLowerCase()) !== -1 ||
        biller.description.toLowerCase().search(searchString.toLowerCase()) !==
          -1
      );
    });

    setSelectedFilteredBillers(filtered);
  };

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!validate(formData)) {
      dispatch(actions.validatePayBillsLoading(formData));
    }
  };

  const activeCategories = () => {
    const filteredCategories = CATEGORIES.map(cat => {
      const isActive = !!billers?.find(
        biller => biller.category.toLowerCase() === cat.value.toLowerCase(),
      );

      return {
        ...cat,
        isActive,
      };
    });
    return filteredCategories;
  };

  const renderView = step => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <h3 className="title">Categories</h3>
            <S.BillersOptions>
              {activeCategories()?.map(
                (category: BillerStateOptions, i: number) => {
                  // eslint-disable-next-line array-callback-return
                  if (!category.isActive) return;

                  return (
                    <S.BillerOptionsItem
                      key={i}
                      onClick={() => selectCategory(category.value)}
                    >
                      <img src={category.icon} alt={category.label} />
                      <p>{category.label}</p>
                    </S.BillerOptionsItem>
                  );
                },
              )}
            </S.BillersOptions>
          </React.Fragment>
        );
      case 1:
        return (
          <S.BillersList>
            {filteredBillers.map((biller: BillersState) => (
              <S.BillersListItem
                key={biller.code}
                onClick={() => {
                  console.log('biller code', biller.code);
                  // Clear form data
                  setFormData(initialFormData);
                  setFormErrors(initialFormData);

                  const fields = {};
                  RENDER_FIELDS(biller.code).map((field: any) => {
                    if (field.required) {
                      fields[field.name] = '';
                    }

                    return {};
                  });

                  // Set form data based on the biller fields
                  setFormData(fields);
                  setFormErrors(fields);
                  // Set selected code for the biller
                  dispatch(actions.setBillerCode(biller.code));
                  // Render next steps after selecting a biller
                  setSteps(2);
                }}
              >
                <img
                  src={biller.logo}
                  alt={biller.category}
                  onError={e => {
                    e.currentTarget.src = 'https://via.placeholder.com/150x50';
                  }}
                />
                <p>{biller.name}</p>
              </S.BillersListItem>
            ))}
          </S.BillersList>
        );
      case 2:
        return (
          <S.FormWrapper>
            {RENDER_FIELDS(billerCode).map((field: any, i) => {
              const items = RENDER_SELECT_ITEMS(
                billerCode.toLowerCase() + `_` + field.name,
              );
              if (field.type === 'select') {
                return (
                  <Field key={i}>
                    <Label>
                      {field.label} {field.required ? <i>*</i> : ''}
                    </Label>
                    <Select
                      fullWidth
                      value={formData[field.name]}
                      name={field.name}
                      onChange={e => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      className={formErrors[field.name] ? 'error' : undefined}
                    >
                      <option value="">Please select</option>
                      {items.map(d => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </Select>
                    {formErrors[field.name] && (
                      <ErrorMsg formError>{formErrors[field.name]}</ErrorMsg>
                    )}
                  </Field>
                );
              } else {
                switch (field.name) {
                  case 'amount':
                    return (
                      <Field key={i}>
                        <Label>
                          {field.label} {field.required ? <i>*</i> : ''}
                        </Label>
                        <Input
                          {...field}
                          required={field.required}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChangeFormData}
                          placeholder={field.placeholder}
                        />
                        <S.FieldSubtext>
                          Available balance: PHP {balanceInfo}
                        </S.FieldSubtext>
                        {formErrors[field.name] && (
                          <ErrorMsg formError>
                            {formErrors[field.name]}
                          </ErrorMsg>
                        )}
                      </Field>
                    );
                  default:
                    return (
                      <Field key={i}>
                        <Label>
                          {field.label} {field.required ? <i>*</i> : ''}
                        </Label>
                        <Input
                          required={field.required}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChangeFormData}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                        />
                        {formErrors[field.name] && (
                          <ErrorMsg formError>
                            {formErrors[field.name]}
                          </ErrorMsg>
                        )}
                      </Field>
                    );
                }
              }
            })}
            <S.FormFooter>
              <Button
                size="medium"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setFormData(initialFormData);
                  setFormErrors(initialFormData);
                  setSelectedFilteredBillers(selectedBillers);
                  setSteps(steps - 1);
                }}
              >
                Back
              </Button>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                onClick={onSubmit}
              >
                Next
              </Button>
            </S.FormFooter>
          </S.FormWrapper>
        );
      default:
        return <React.Fragment />;
    }
  };

  const renderHeader = (step: number) => {
    switch (step) {
      case 0:
      case 2:
        return <h3>Pay Bills</h3>;
      case 1:
        return (
          <React.Fragment>
            <h3>Electric Utility</h3>
            {false && ( // Temporary hidden
              <Input
                type="text"
                placeholder="Search"
                onChange={onSearchBillers}
              />
            )}
          </React.Fragment>
        );
      case 3:
        return <h3>Review Payments</h3>;
      default:
        return <React.Fragment />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Pay bills</title>
      </Helmet>
      <S.Wrapper>
        <S.WrapperHeader isCustom={steps === 1}>
          {renderHeader(steps)}
        </S.WrapperHeader>
        <ComponentLoading isLoading={loading}>
          <S.WrapperContent>{renderView(steps)}</S.WrapperContent>
        </ComponentLoading>
      </S.Wrapper>
    </>
  );
}
