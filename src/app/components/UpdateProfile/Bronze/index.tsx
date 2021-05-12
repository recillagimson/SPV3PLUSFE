/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Update User Profile to Bronze
 * NOTE: this will be used in forcing the user to update their profile first to continue using the app
 *       system need to get their basic information
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Checkbox from 'app/components/Elements/Checkbox';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Flex from 'app/components/Elements/Flex';

import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import ParentalConsent from 'app/components/ParentalConsent';

import { validateEmail, validatePhone } from 'app/components/Helpers';

/** selectors */
import { useComponentSaga } from './slice';
import { selectReferences, selectUser } from 'app/App/slice/selectors';
import { appActions } from 'app/App/slice';
import { selectLoading, selectError, selectData } from './slice/selectors';
import H5 from 'app/components/Elements/H5';

export default function UserProfileForm({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const { actions } = useComponentSaga();
  const dispatch = useDispatch();
  const refs: any = useSelector(selectReferences);

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);
  const profile = useSelector(selectUser);

  // local states
  const [isLoading, setIsLoading] = React.useState(true); // we will show a loading indicator till we have the references
  const [showForm, setShowForm] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);
  // years array loop
  const [years, setYears] = React.useState<number[]>([]);

  // form fields
  const [firstName, setFirstName] = React.useState({ value: '', error: false });
  const [middleName, setMiddleName] = React.useState({
    value: '',
    error: false,
  });
  const [lastName, setLastName] = React.useState({ value: '', error: false });
  const [mobile, setMobile] = React.useState({ value: '', error: false });
  const [email, setEmail] = React.useState({ value: '', error: false });
  const [birthDate, setBirthDate] = React.useState({
    year: '',
    month: '',
    day: '',
    error: false,
  });

  const [nationality, setNationality] = React.useState({
    value: '',
    error: false,
  });

  // address
  const [houseNo, setHouseNo] = React.useState({
    value: '',
    error: false,
  });
  const [city, setCity] = React.useState({
    value: '',
    error: false,
  });
  const [province, setProvince] = React.useState({
    value: '',
    error: false,
  });
  const [country, setCountry] = React.useState({
    value: '',
    error: false,
  });
  const [postal, setPostal] = React.useState({
    value: '',
    error: false,
  });

  const [showGuardianFields, setShowGuardianFields] = React.useState(false);
  const [guardianName, setGuardianName] = React.useState({
    value: '',
    error: false,
  });
  const [guardianMobile, setGuardianMobile] = React.useState({
    value: '',
    error: false,
  });
  const [consent, setConsent] = React.useState({
    value: false,
    error: false,
  });
  const [showConsent, setShowConsent] = React.useState(false);

  // api related messages
  const [isError, setIsError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    loopYear(1950);
  }, []);

  React.useEffect(() => {
    if (
      birthDate.year !== '' &&
      birthDate.month !== '' &&
      birthDate.day !== ''
    ) {
      const currentYear = new Date().getFullYear();
      if (currentYear - parseInt(birthDate.year, 10) < 18) {
        setShowGuardianFields(true);
      } else {
        setShowGuardianFields(false);
      }
    }
  }, [birthDate]);

  React.useEffect(() => {
    if (refs && Object.keys(refs).length === 0) {
      dispatch(appActions.getLoadReferences());
    }

    if (refs && Object.keys(refs).length > 0) {
      setIsLoading(false);
    }
  }, [refs]);

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      let apiError: string | undefined;
      if (error && Object.keys(error).length > 0) {
        if (error.code && error.code === 422) {
          if (error.errors && error.errors.error_code) {
            error.errors.error_code.find(i => i === 101);
            apiError = error.errors.error_code.map((i: any) => {
              // if (i === 101 || i === 103 || i === 113) {
              //   return isEmail
              //     ? 'Email and password is invalid. Please try again.'
              //     : 'Mobile number and password is invalid. Please try again.';
              // }
              if (i === 102) {
                return 'Your login account is not yet verified. Click OK to Verify your Account.';
              }
              if (i === 104) {
                return 'You are attempting to login from an untrusted client. Please check your internet connection';
              }
              if (i === 105) {
                return 'Too many failed login attempts. This device is temporarily blocked. Please try again later.';
              }
              if (i === 151) {
                return 'There was a problem with the data you are sending. Please try again.';
              }
              return undefined;
            });
          }
          setApiErrorMsg(apiError || '');
          setIsError(true);
        }
        if (error.code && error.code !== 422) {
          apiError = error.response.statusText;
          setApiErrorMsg(apiError || '');
          setIsError(true);
        }
        if (!error.response && (!error.code || error.code !== 422)) {
          apiError = error.message;
          setApiErrorMsg(apiError || '');
          setIsError(true);
        }
      }
    }
  }, [error]);

  React.useEffect(() => {
    if (success && Object.keys(success).length > 0) {
      dispatch(appActions.getLoadUserProfile());
      setIsSuccess(true);
    }
  }, [success]);

  // function for looping year
  const loopYear = (yyyy: number) => {
    const yearArray: number[] = [];
    let currentYear = new Date().getFullYear() - 15;
    let startYear = yyyy || 1960;

    while (startYear <= currentYear) {
      yearArray.push(currentYear--);
    }
    setYears(yearArray);
  };

  const onChangeBirthDate = e => {
    const name = e.currentTarget.name;
    setBirthDate({
      ...birthDate,
      [name]: e.currentTarget.value,
      error: false,
    });
  };

  // validate fields before reviewing
  const onValidateFields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;

    if (firstName.value === '') {
      hasError = true;
      setFirstName({ ...firstName, error: true });
    }
    if (lastName.value === '') {
      hasError = true;
      setLastName({ ...lastName, error: true });
    }

    if (middleName.value === '') {
      hasError = true;
      setMiddleName({ ...middleName, error: true });
    }

    if (
      birthDate.day === '' ||
      birthDate.month === '' ||
      birthDate.year === ''
    ) {
      hasError = true;
      setBirthDate({ ...birthDate, error: true });
    }

    if (nationality.value === '') {
      hasError = true;
      setNationality({ ...nationality, error: true });
    }

    if (houseNo.value === '') {
      hasError = true;
      setHouseNo({ ...city, error: true });
    }

    if (city.value === '') {
      hasError = true;
      setCity({ ...city, error: true });
    }

    if (province.value === '') {
      hasError = true;
      setProvince({ ...province, error: true });
    }

    if (country.value === '') {
      hasError = true;
      setCountry({ ...country, error: true });
    }

    if (postal.value === '') {
      hasError = true;
      setPostal({ ...postal, error: true });
    }

    if (showGuardianFields) {
      if (guardianName.value === '') {
        hasError = true;
        setGuardianName({ ...guardianName, error: true });
      }
      if (guardianMobile.value === '') {
        hasError = true;
        setGuardianMobile({ ...guardianMobile, error: true });
      }
    }

    if (!hasError) {
      setShowForm(prev => !prev);
      setShowConfirm(prev => !prev);
    }
  };

  const onSubmit = () => {
    const data = {
      // "entity_id": "123",
      // "title": "sample",
      last_name: lastName.value,
      first_name: firstName.value,
      middle_name: middleName.value,
      // "name_extension": "jr",
      birth_date: `${birthDate.year}-${birthDate.month}-${birthDate.day}`,
      nationality_id:
        nationality.value !== ''
          ? refs.nationalities[parseInt(nationality.value)].id
          : undefined,
      house_no_street: houseNo.value,
      city: city.value,
      provice_state: province.value,
      municipality: city.value,
      country_id:
        country.value !== ''
          ? refs.countries[parseInt(country.value)].id
          : undefined,
      postal_code: postal.value,

      guardian_name: showGuardianFields ? guardianName.value : undefined,
      guardian_mobile_number: showGuardianFields
        ? guardianMobile.value
        : undefined,
      is_accept_parental_consent: showGuardianFields
        ? consent.value
          ? 1
          : 0
        : undefined,
    };
    dispatch(actions.getFetchLoading(data));
  };

  // close error dialog
  const onCloseErrorDialog = () => {
    setIsError(false);
    setApiErrorMsg('');
    dispatch(actions.getFetchReset());
  };

  const onCloseSuccessDialog = () => {
    setIsSuccess(false);
    setShowConfirm(prev => !prev);
    setShowForm(prev => !prev);
    dispatch(actions.getFetchReset());
    onSuccess();
  };

  // loop days for select option dropdown
  const days = Array.from(new Array(31), (v, i) => (
    <option key={i} value={i < 9 ? `0${i + 1}` : i + 1}>
      {i < 9 ? `0${i + 1}` : i + 1}
    </option>
  ));

  let hasRefs = false;
  if (refs && Object.keys(refs).length > 0) {
    hasRefs = true;
  }

  return (
    <>
      {isLoading && <Loading position="absolute" />}
      {loading && <Loading position="absolute" />}
      {showForm && (
        <>
          <form>
            <Field flex>
              <Label>First Name</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={firstName.value}
                  onChange={e =>
                    setFirstName({ value: e.currentTarget.value, error: false })
                  }
                  className={firstName.error ? 'error' : undefined}
                  placeholder="First Name"
                />
                {firstName.error && (
                  <ErrorMsg formError>First Name is required.</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Middle Name</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={middleName.value}
                  onChange={e =>
                    setMiddleName({
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={middleName.error ? 'error' : undefined}
                  placeholder="Middle Name"
                />
                {middleName.error && (
                  <ErrorMsg formError>Middle Name is required.</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Last Name</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={lastName.value}
                  onChange={e =>
                    setLastName({ value: e.currentTarget.value, error: false })
                  }
                  className={lastName.error ? 'error' : undefined}
                  placeholder="Last Name"
                />
                {lastName.error && (
                  <ErrorMsg formError>Last Name is required.</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Nationality</Label>
              <div style={{ flexGrow: 1 }}>
                <Select
                  fullWidth
                  value={nationality.value}
                  onChange={e =>
                    setNationality({
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={nationality.error ? 'error' : undefined}
                >
                  <option value="" disabled>
                    Select nationality
                  </option>
                  {hasRefs &&
                    refs.nationalities.map((o, i) => (
                      <option key={o.id} value={i}>
                        {o.description}
                      </option>
                    ))}
                </Select>
                {nationality.error && (
                  <ErrorMsg formError>Nationality is required.</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Birthdate</Label>
              <div style={{ flexGrow: 1 }}>
                <Select
                  name="month"
                  value={birthDate.month}
                  onChange={onChangeBirthDate}
                  className={birthDate.error ? 'error' : undefined}
                >
                  <option value="" disabled>
                    mm
                  </option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sept</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </Select>
                <Select
                  name="day"
                  value={birthDate.day}
                  onChange={onChangeBirthDate}
                  className={birthDate.error ? 'error' : undefined}
                >
                  <option value="" disabled>
                    dd
                  </option>
                  {days}
                </Select>
                <Select
                  name="year"
                  value={birthDate.year}
                  onChange={onChangeBirthDate}
                  className={birthDate.error ? 'error' : undefined}
                >
                  <option value="">yyyy</option>
                  {years.map(i => (
                    <option key={i} value={i < 9 ? `0${i}` : i}>
                      {i < 9 ? `0${i}` : i}
                    </option>
                  ))}
                </Select>
                {birthDate.error && (
                  <ErrorMsg formError>Date of Birth is required</ErrorMsg>
                )}
              </div>
            </Field>

            <Field flex>
              <Label>Country</Label>
              <div style={{ flexGrow: 1 }}>
                <Select
                  fullWidth
                  value={country.value}
                  onChange={e =>
                    setCountry({ value: e.currentTarget.value, error: false })
                  }
                  className={country.error ? 'error' : undefined}
                >
                  <option value="" disabled>
                    Select countries
                  </option>
                  {hasRefs &&
                    refs.countries.map((o, i) => (
                      <option key={o.id} value={i}>
                        {o.description}
                      </option>
                    ))}
                </Select>
                {country.error && (
                  <ErrorMsg formError>Country is required.</ErrorMsg>
                )}
              </div>
            </Field>

            {showGuardianFields && (
              <>
                <H5>Guardian Consent</H5>
                <Field flex>
                  <Label>Guardian's Name</Label>
                  <Input
                    value={guardianName.value}
                    onChange={e =>
                      setGuardianName({
                        value: e.currentTarget.value,
                        error: false,
                      })
                    }
                    className={guardianName.error ? 'error' : undefined}
                    placeholder="Guardian Name"
                  />
                </Field>
                <Field flex>
                  <Label>Guardian's Mobile Number</Label>
                  <div style={{ flexGrow: 1 }}>
                    <Input
                      value={guardianMobile.value}
                      onChange={e =>
                        setGuardianMobile({
                          value: e.currentTarget.value,
                          error: false,
                        })
                      }
                      className={guardianName.error ? 'error' : undefined}
                      placeholder="Guardian Mobile Number (09 + 9 digits)"
                    />
                    <div className="agreement" style={{ marginTop: '7px' }}>
                      <Checkbox
                        checked={consent.value}
                        name="parentalConsent"
                        onChange={() => {}}
                      />
                      <span>
                        I read and accept{' '}
                        <a
                          href="/"
                          onClick={e => {
                            if (e && e.preventDefault) e.preventDefault();
                            setShowConsent(true);
                          }}
                        >
                          parental consent
                        </a>
                      </span>
                      {consent.error && (
                        <ErrorMsg formError>
                          You must agree to parental consent before continuing.
                        </ErrorMsg>
                      )}
                    </div>
                  </div>
                </Field>
              </>
            )}

            <H5>Current Address</H5>
            <Field flex>
              <Label>House no. / Street</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={houseNo.value}
                  onChange={e =>
                    setHouseNo({ value: e.currentTarget.value, error: false })
                  }
                  className={houseNo.error ? 'error' : undefined}
                  placeholder="House no. / Street"
                />
                {houseNo.error && (
                  <ErrorMsg formError>
                    The House Number and Street Address is required
                  </ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>City / Municipality</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={city.value}
                  onChange={e =>
                    setCity({ value: e.currentTarget.value, error: false })
                  }
                  className={city.error ? 'error' : undefined}
                  placeholder="City / Municipality"
                />
                {city.error && <ErrorMsg formError>City is required</ErrorMsg>}
              </div>
            </Field>
            <Field flex>
              <Label>Province / State</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={province.value}
                  onChange={e =>
                    setProvince({ value: e.currentTarget.value, error: false })
                  }
                  className={province.error ? 'error' : undefined}
                  placeholder="Province / State"
                />
                {province.error && (
                  <ErrorMsg formError>Province / State is required</ErrorMsg>
                )}
              </div>
            </Field>

            <Field flex>
              <Label>Postal Code</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={postal.value}
                  onChange={e =>
                    setPostal({ value: e.currentTarget.value, error: false })
                  }
                  className={postal.error ? 'error' : undefined}
                  placeholder="Postal Code"
                />
                {postal.error && (
                  <ErrorMsg formError>Postal Code is required</ErrorMsg>
                )}
              </div>
            </Field>

            <Flex alignItems="center" justifyContent="flex-end">
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                size="large"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onValidateFields}
              >
                Update
              </Button>
            </Flex>
          </form>
        </>
      )}

      <ParentalConsent
        open={showConsent}
        onAgree={() => {
          setShowConsent(false);
          setConsent({ value: true, error: false });
        }}
        onCancel={() => {
          setShowConsent(false);
          setConsent({ value: false, error: false });
        }}
      />

      {/* Show api error */}
      <Dialog show={isError} size="small">
        <div className="text-center">
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Update Error</H3>
          <p>{apiErrorMsg}</p>
          <Button
            fullWidth
            onClick={onCloseErrorDialog}
            variant="outlined"
            color="secondary"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      {/* Show success */}
      <Dialog show={isSuccess} size="small">
        <div className="text-center">
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Successfully updated!</H3>
          <p>You have successfully updated your account information.</p>
          <Button
            fullWidth
            onClick={onCloseSuccessDialog}
            variant="outlined"
            color="secondary"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </>
  );
}
