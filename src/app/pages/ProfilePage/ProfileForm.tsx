/* eslint-disable react-hooks/exhaustive-deps */
/**
 * User Profile Form
 *
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
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Box from 'app/components/Box';
import Flex from 'app/components/Elements/Flex';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

import H3 from 'app/components/Elements/H3';
import H5 from 'app/components/Elements/H5';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import { validateEmail, validatePhone } from 'app/components/Helpers';

/** selectors */
import { useContainerSaga } from './slice';
import { selectReferences, selectUser } from 'app/App/slice/selectors';
import { appActions } from 'app/App/slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

export default function UserProfileForm({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const { actions } = useContainerSaga();
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
  const [placeOfBirth, setPlaceOfBirth] = React.useState({
    value: '',
    error: false,
  });
  const [marital, setMarital] = React.useState({
    value: '',
    error: false,
  });
  const [nationality, setNationality] = React.useState({
    value: '',
    error: false,
  });
  const [occupation, setOccupation] = React.useState({
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

  //work info
  const [natureOfWork, setNatureOfWork] = React.useState({
    value: '',
    encoded: '',
    error: false,
  });
  const [sourceOfFunds, setSourceOfFunds] = React.useState({
    value: '',
    encoded: '',
    error: false,
  });

  // api related messages
  const [isError, setIsError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    loopYear(1950);
  }, []);

  React.useEffect(() => {
    if (refs && Object.keys(refs).length === 0) {
      dispatch(appActions.getLoadAllReferences());
    }

    if (refs && Object.keys(refs).length > 0) {
      setIsLoading(false);
    }

    if (
      profile &&
      Object.keys(profile).length > 0 &&
      refs &&
      Object.keys(refs).length > 0
    ) {
      writeProfileDetails(profile);
    }
  }, [refs, profile]);

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
    let currentYear = new Date().getFullYear();
    let startYear = yyyy || 1960;

    while (startYear <= currentYear) {
      yearArray.push(currentYear--);
    }
    setYears(yearArray);
  };

  const writeProfileDetails = (p: any) => {
    setFirstName({ value: p.first_name, error: false });
    setMiddleName({ value: p.middle_name, error: false });
    setLastName({ value: p.last_name, error: false });
    setOccupation({ value: p.occupation, error: false });

    const bdate = p.birth_date.split('-');
    setBirthDate({
      year: bdate[0],
      month: bdate[1],
      day: bdate[2],
      error: false,
    });
    setPlaceOfBirth({ value: p.place_of_birth, error: false });

    const msI = refs.maritalStatus.findIndex(j => j.id === p.marital_status_id);
    setMarital({ value: msI !== -1 ? msI : '', error: false });

    const nI = refs.nationalities.findIndex(j => j.id === p.nationality_id);
    setNationality({ value: nI !== -1 ? nI : '', error: false });

    // const cI = refs.countries.findIndex(j => j.id === p.country_id);
    setCountry({ value: nI !== -1 ? nI : '', error: false });

    setHouseNo({ value: p.house_no_street, error: false });
    setProvince({ value: p.provice_state, error: false });
    setCity({ value: p.city, error: false });
    setPostal({ value: p.postal_code, error: false });

    const nwI = refs.natureOfWork.findIndex(j => j.id === p.nature_of_work_id);
    setNatureOfWork({
      value: nwI !== -1 ? nwI : '',
      encoded: p.encoded_nature_of_work || '',
      error: false,
    });

    const sI = refs.sourceOfFunds.findIndex(j => j.id === p.source_of_fund_id);
    setSourceOfFunds({
      value: sI !== -1 ? sI : '',
      encoded: p.encoded_source_of_fund || '',
      error: false,
    });
  };

  // validate fields before reviewing
  const onValidateFields = () => {
    let hasError = false;

    // if (mobile.value === '') {
    //   hasError = true;
    //   setMobile({ ...mobile, error: true });
    // }
    if (mobile.value !== '' && !validatePhone(mobile.value)) {
      hasError = true;
      setMobile({ ...mobile, error: true });
    }

    if (email.value !== '' && !validateEmail(email.value)) {
      hasError = true;
      setEmail({ ...email, error: true });
    }

    if (
      birthDate.day === '' ||
      birthDate.month === '' ||
      birthDate.year === ''
    ) {
      hasError = true;
      setBirthDate({ ...birthDate, error: true });
    }

    if (
      natureOfWork.value !== '' &&
      refs.natureOfWork[parseInt(natureOfWork.value)].id ===
        '0ed96f01-9131-11eb-b44f-1c1b0d14e211' &&
      natureOfWork.encoded === ''
    ) {
      hasError = true;
      setNatureOfWork({ ...natureOfWork, error: true });
    }

    if (
      sourceOfFunds.value !== '' &&
      refs.sourceOfFunds[parseInt(sourceOfFunds.value)].id ===
        '0ed96f01-9131-11eb-b44f-1c1b0d14e211' &&
      sourceOfFunds.encoded === ''
    ) {
      hasError = true;
      setSourceOfFunds({ ...sourceOfFunds, error: true });
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
      birth_date: `${birthDate.month}/${birthDate.day}/${birthDate.year}`,
      place_of_birth: placeOfBirth.value,
      marital_status_id:
        marital.value !== ''
          ? refs.maritalStatus[parseInt(marital.value)].id
          : undefined,
      nationality_id:
        nationality.value !== ''
          ? refs.nationalities[parseInt(nationality.value)].id
          : undefined,
      encoded_nationality:
        nationality.value !== ''
          ? refs.nationalities[parseInt(nationality.value)].description
          : undefined,
      occupation: occupation.value,
      house_no_street: houseNo.value,
      city: city.value,
      provice_state: province.value,
      municipality: city.value,
      country_id:
        country.value !== ''
          ? refs.countries[parseInt(country.value)].id
          : undefined,
      postal_code: postal.value,
      nature_of_work_id:
        natureOfWork.value !== ''
          ? refs.natureOfWork[parseInt(natureOfWork.value)].id
          : undefined,
      encoded_nature_of_work: natureOfWork.encoded,
      source_of_fund_id:
        sourceOfFunds.value !== ''
          ? refs.sourceOfFunds[parseInt(sourceOfFunds.value)].id
          : undefined,
      encoded_source_of_fund: sourceOfFunds.encoded,
      mother_maidenname: 'Test Mothers Name',
      currency_id: '0ed21e2c-9131-11eb-b44f-1c1b0d14e211',
      signup_host_id: '38e9a8f5-91b8-11eb-8d33-1c1b0d14e211',
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
  // const days = Array.from(new Array(31), (v, i) => (
  //   <option key={i} value={i < 9 ? `0${i + 1}` : i + 1}>
  //     {i < 9 ? `0${i + 1}` : i + 1}
  //   </option>
  // ));

  let hasRefs = false;
  if (refs && Object.keys(refs).length > 0) {
    hasRefs = true;
  }

  return (
    <>
      {isLoading && <Loading position="fixed" />}
      {loading && <Loading position="fixed" />}
      {showForm && (
        <>
          <Box title="Basic Info" withPadding titleBorder>
            <Field flex>
              <Label>First Name</Label>
              <Input
                value={firstName.value}
                onChange={e =>
                  setFirstName({ value: e.currentTarget.value, error: false })
                }
                className={firstName.error ? 'error' : undefined}
                placeholder="First Name"
                disabled
              />
            </Field>
            <Field flex>
              <Label>Middle Name</Label>
              <Input
                value={middleName.value}
                onChange={e =>
                  setMiddleName({ value: e.currentTarget.value, error: false })
                }
                className={middleName.error ? 'error' : undefined}
                placeholder="Middle Name"
                disabled
              />
            </Field>
            <Field flex>
              <Label>Last Name</Label>
              <Input
                value={lastName.value}
                onChange={e =>
                  setLastName({ value: e.currentTarget.value, error: false })
                }
                className={lastName.error ? 'error' : undefined}
                placeholder="Last Name"
                disabled
              />
            </Field>
            <Field flex>
              <Label>Nationality</Label>
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
            </Field>
            <Field flex>
              <Label>Date of Birth</Label>
              <Input
                value={`${birthDate.month}/${birthDate.day}/${birthDate.year}`}
                disabled
              />
            </Field>
            {/* <Field flex>
              <Label>Mobile Number</Label>
              <Input
                value={mobile.value}
                onChange={e =>
                  setMobile({ value: e.currentTarget.value, error: false })
                }
                className={mobile.error ? 'error' : undefined}
                placeholder="Mobile Number"
              />
            </Field>
            <Field flex>
              <Label>Email Address</Label>
              <Input
                value={email.value}
                onChange={e =>
                  setEmail({ value: e.currentTarget.value, error: false })
                }
                className={email.error ? 'error' : undefined}
                placeholder="Email Address"
              />
            </Field>
            <Field flex>
              <Label>Birthdate</Label>
              <Select
                value={birthDate.month}
                onChange={e =>
                  setBirthDate({
                    ...birthDate,
                    month: e.currentTarget.value,
                    error: false,
                  })
                }
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
                value={birthDate.day}
                onChange={e =>
                  setBirthDate({
                    ...birthDate,
                    day: e.currentTarget.value,
                    error: false,
                  })
                }
              >
                <option value="" disabled>
                  dd
                </option>
                {days}
              </Select>
              <Select
                value={birthDate.year}
                onChange={e =>
                  setBirthDate({
                    ...birthDate,
                    year: e.currentTarget.value,
                    error: false,
                  })
                }
              >
                <option value="">yyyy</option>
                {years.map(i => (
                  <option key={i} value={i < 9 ? `0${i}` : i}>
                    {i < 9 ? `0${i}` : i}
                  </option>
                ))}
              </Select>
            </Field> */}
            <Field flex>
              <Label>Place of Birth</Label>
              <Input
                value={placeOfBirth.value}
                onChange={e =>
                  setPlaceOfBirth({
                    value: e.currentTarget.value,
                    error: false,
                  })
                }
                className={placeOfBirth.error ? 'error' : undefined}
                placeholder="Place of Birth"
              />
            </Field>
            <Field flex>
              <Label>Marital Status</Label>
              <Select
                fullWidth
                value={marital.value}
                onChange={e =>
                  setMarital({
                    value: e.currentTarget.value,
                    error: false,
                  })
                }
                className={marital.error ? 'error' : undefined}
              >
                <option value="" disabled>
                  Select marital status
                </option>
                {hasRefs &&
                  refs.maritalStatus.map((o, i) => (
                    <option key={o.id} value={i}>
                      {o.description}
                    </option>
                  ))}
              </Select>
            </Field>

            <H5>Current Address</H5>
            <Field flex>
              <Label>House no. / Street</Label>
              <Input
                value={houseNo.value}
                onChange={e =>
                  setHouseNo({ value: e.currentTarget.value, error: false })
                }
                className={houseNo.error ? 'error' : undefined}
                placeholder="House no. / Street"
              />
            </Field>
            <Field flex>
              <Label>City / Municipality</Label>
              <Input
                value={city.value}
                onChange={e =>
                  setCity({ value: e.currentTarget.value, error: false })
                }
                className={city.error ? 'error' : undefined}
                placeholder="City / Municipality"
              />
            </Field>
            <Field flex>
              <Label>Province / State</Label>
              <Input
                value={province.value}
                onChange={e =>
                  setProvince({ value: e.currentTarget.value, error: false })
                }
                className={province.error ? 'error' : undefined}
                placeholder="Province / State"
              />
            </Field>
            <Field flex>
              <Label>Country</Label>
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
            </Field>
            <Field flex>
              <Label>Postal Code</Label>
              <Input
                value={postal.value}
                onChange={e =>
                  setPostal({ value: e.currentTarget.value, error: false })
                }
                className={postal.error ? 'error' : undefined}
                placeholder="Postal Code"
              />
            </Field>

            <H5>Contact Info</H5>
            <Field flex>
              <Label>Home Phone/Mobile Number</Label>
              <Input
                value={mobile.value}
                onChange={e =>
                  setMobile({ value: e.currentTarget.value, error: false })
                }
                className={mobile.error ? 'error' : undefined}
                placeholder="Home Phone/Mobile Number"
                disabled
              />
            </Field>
          </Box>

          <Box title="Work Info" withPadding titleBorder>
            <Field flex>
              <Label>Nature of Work</Label>
              <div style={{ flexGrow: 1 }}>
                <Select
                  fullWidth
                  value={natureOfWork.value}
                  onChange={e =>
                    setNatureOfWork({
                      value: e.currentTarget.value,
                      encoded: '',
                      error: false,
                    })
                  }
                  className={natureOfWork.error ? 'error' : undefined}
                >
                  <option value="" disabled>
                    Select nature of work
                  </option>
                  {hasRefs &&
                    refs.natureOfWork.map((o, i) => (
                      <option key={o.id} value={i}>
                        {o.description}
                      </option>
                    ))}
                </Select>
                {natureOfWork.value !== '' &&
                  refs.natureOfWork[parseInt(natureOfWork.value)].id ===
                    '0ed96f01-9131-11eb-b44f-1c1b0d14e211' && (
                    <>
                      <Label style={{ marginTop: '5px' }}>Others</Label>
                      <Input
                        value={natureOfWork.encoded}
                        onChange={e =>
                          setNatureOfWork({
                            ...natureOfWork,
                            encoded: e.currentTarget.value,
                            error: false,
                          })
                        }
                        className={natureOfWork.error ? 'error' : undefined}
                        placeholder="Please specify"
                      />
                    </>
                  )}
                {natureOfWork.error && (
                  <ErrorMsg formError>
                    {natureOfWork.value === ''
                      ? 'Please select your nature of work'
                      : 'Please fill out the others field.'}
                  </ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Source of Funds</Label>
              <div style={{ flexGrow: 1 }}>
                <Select
                  fullWidth
                  value={sourceOfFunds.value}
                  onChange={e =>
                    setSourceOfFunds({
                      value: e.currentTarget.value,
                      encoded: '',
                      error: false,
                    })
                  }
                  className={sourceOfFunds.error ? 'error' : undefined}
                >
                  <option value="" disabled>
                    Select source of funds
                  </option>
                  {hasRefs &&
                    refs.sourceOfFunds.map((o, i) => (
                      <option key={o.id} value={i}>
                        {o.description}
                      </option>
                    ))}
                </Select>
                {sourceOfFunds.value !== '' &&
                  refs.sourceOfFunds[parseInt(sourceOfFunds.value)].id ===
                    '0ed801a1-9131-11eb-b44f-1c1b0d14e211' && (
                    <>
                      <Label style={{ marginTop: '5px' }}>Others</Label>
                      <Input
                        value={sourceOfFunds.encoded}
                        onChange={e =>
                          setSourceOfFunds({
                            ...sourceOfFunds,
                            encoded: e.currentTarget.value,
                            error: false,
                          })
                        }
                        className={sourceOfFunds.error ? 'error' : undefined}
                        placeholder="Please specify"
                      />
                    </>
                  )}
                {sourceOfFunds.error && (
                  <ErrorMsg formError>
                    {sourceOfFunds.value === ''
                      ? 'Please select your source of funds'
                      : 'Please fill out the others field.'}
                  </ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Occupation</Label>
              <Input
                value={occupation.value}
                onChange={e =>
                  setOccupation({
                    value: e.currentTarget.value,
                    error: false,
                  })
                }
                className={occupation.error ? 'error' : undefined}
                placeholder="Occupation"
              />
            </Field>
          </Box>
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
              Next
            </Button>
          </Flex>
        </>
      )}

      {showConfirm && (
        <>
          <Box title="Review Information" withPadding titleBorder>
            <List divider>
              <ListItem flex>
                <ListItemText
                  label="First Name"
                  primary={firstName.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Middle Name"
                  primary={middleName.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Last Name"
                  primary={lastName.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Birthdate"
                  primary={`${birthDate.month}/${birthDate.day}/${birthDate.year}`}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Place of Birth"
                  primary={placeOfBirth.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Marital Status"
                  primary={
                    refs.maritalStatus[parseInt(marital.value, 10)].description
                  }
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Nationality"
                  primary={
                    refs.nationalities[parseInt(nationality.value, 10)]
                      .description
                  }
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Occupation"
                  primary={occupation.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Country"
                  primary={
                    refs.countries[parseInt(country.value, 10)].description
                  }
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="House No / Street"
                  primary={houseNo.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Province / State"
                  primary={province.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="City"
                  primary={city.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Postal Code"
                  primary={postal.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Nature of Work"
                  primary={
                    natureOfWork.encoded !== ''
                      ? natureOfWork.encoded
                      : refs.natureOfWork[parseInt(natureOfWork.value, 10)]
                          .description
                  }
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Source of Funds"
                  primary={
                    sourceOfFunds.encoded !== ''
                      ? sourceOfFunds.encoded
                      : refs.sourceOfFunds[parseInt(sourceOfFunds.value, 10)]
                          .description
                  }
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
            </List>
          </Box>
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => {
                setShowConfirm(prev => !prev);
                setShowForm(prev => !prev);
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onSubmit}
            >
              Update
            </Button>
          </Flex>
        </>
      )}

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
