/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Update User Profile to Bronze
 * NOTE: this will be used in forcing the user to update their profile first to continue using the app
 *       system need to get their basic information
 *
 * @prop  {function}  onCancel        Callback when user cancelled the update
 * @prop  {function}  onSuccess       Callback when user successfully updated the profile
 * @prop  {boolean}   isTierUpgrade   if defined, will show a different success message
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Checkbox from 'app/components/Elements/Checkbox';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Flex from 'app/components/Elements/Flex';
import Logo from 'app/components/Assets/Logo';

import H3 from 'app/components/Elements/H3';
import H5 from 'app/components/Elements/H5';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import ParentalConsent from 'app/components/ParentalConsent';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';
import VerifyOTP from 'app/components/VerifyOTP';

/** selectors */
import {
  selectReferences,
  selectUser,
  selectIsAuthenticated,
} from 'app/App/slice/selectors';
import { useComponentSaga } from './slice';
import { appActions } from 'app/App/slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectOTPLoading,
  selectOTPError,
  selectOTPData,
} from './slice/selectors';
import { validatePhone } from 'app/components/Helpers';

type UserProfileFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  isTierUpgrade?: boolean;
  idPhotoID?: string[];
  selfieID?: string[];
};

export default function UserProfileForm({
  onCancel,
  onSuccess,
  isTierUpgrade,
  idPhotoID,
  selfieID,
}: UserProfileFormProps) {
  const { actions } = useComponentSaga();
  const dispatch = useDispatch();
  const refs: any = useSelector(selectReferences);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);
  const profile: any = useSelector(selectUser);

  const otpLoading = useSelector(selectOTPLoading);
  const otpError: any = useSelector(selectOTPError);
  const otpSuccess = useSelector(selectOTPData);

  // local states
  const [isLoading, setIsLoading] = React.useState(true); // we will show a loading indicator till we have the references
  const [showForm, setShowForm] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);

  // years array loop
  const [years, setYears] = React.useState<number[]>([]);

  // form fields
  const [firstName, setFirstName] = React.useState({ value: '', error: false });
  const [middleName, setMiddleName] = React.useState({
    value: '',
    error: false,
  });
  const [lastName, setLastName] = React.useState({ value: '', error: false });
  // const [mobile, setMobile] = React.useState({ value: '', error: false });
  // const [email, setEmail] = React.useState({ value: '', error: false });
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
  const [mothersMaidenName, setMothersMaidenName] = React.useState({
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

  // contact info
  const [contactNo, setContactNo] = React.useState({ value: '', error: false });

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
  const [occupation, setOccupation] = React.useState({
    value: '',
    error: false,
  });
  const [employer, setEmployer] = React.useState({
    value: '',
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
    // if (refs && Object.keys(refs).length === 0) {
    //   dispatch(appActions.getLoadAllReferences());
    // }

    if (refs && Object.keys(refs).length > 0) {
      let loadRef = false;

      if (!refs.maritalStatus || Object.keys(refs.maritalStatus).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadMaritalRef());
      }
      if (!refs.nationalities || Object.keys(refs.nationalities).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadNationalityRef());
      }
      if (!refs.countries || Object.keys(refs.countries).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadCountryRef());
      }
      if (!refs.sourceOfFunds || Object.keys(refs.sourceOfFunds).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadSourceOfFundsRef());
      }
      if (!refs.natureOfWork || Object.keys(refs.natureOfWork).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadNatureOfWorkRef());
      }

      // if (loadRef) {
      //   dispatch(appActions.getLoadAllReferences());
      // }

      if (!loadRef) {
        setIsLoading(false);

        if (profile && Object.keys(profile).length > 0) {
          writeProfileDetails(profile);
        }
        if (
          !profile &&
          refs.countries &&
          refs.nationalities &&
          Object.keys(refs.countries).length > 0 &&
          Object.keys(refs.nationalities).length > 0
        ) {
          const cI = refs.countries.findIndex(
            j => j.id === '0eceb736-9131-11eb-b44f-1c1b0d14e211',
          ); // ph id
          setCountry({ value: cI.toString(), error: false });
          const nI = refs.nationalities.findIndex(
            j => j.id === '700217f7-91b1-11eb-8d33-1c1b0d14e211',
          ); // ph id
          setNationality({ value: nI.toString(), error: false });
        }
      }
    }
  }, [refs, profile]);

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
    if (otpError && Object.keys(otpError).length > 0) {
      onApiError(otpError);
    }
  }, [error, otpError]);

  React.useEffect(() => {
    if (success && Object.keys(success).length > 0) {
      dispatch(appActions.getLoadUserProfile());
      setIsSuccess(true);
    }
    if (otpSuccess) {
      setShowConfirm(false);
      setShowOTP(true);
      dispatch(actions.getSendOTPReset());
    }
  }, [success, otpSuccess]);

  const onApiError = (err: any) => {
    let apiError: string | undefined = '';

    if (err.code && err.code === 422) {
      if (err.errors && err.errors.error_code) {
        const i110 = err.errors.error_code.findIndex(j => j === 110); // otp error 110
        if (i110 !== -1) {
          apiError += err.errors.message.join('\n');
        }
      }

      if (err.errors && !err.errors.error_code) {
        if (err.errors.last_name && err.errors.last_name.length > 0) {
          apiError += err.errors.last_name.join('\n');
        }
        if (err.errors.first_name && err.errors.first_name.length > 0) {
          apiError += err.errors.first_name.join('\n');
        }
        if (err.errors.birth_date && err.errors.birth_date.length > 0) {
          apiError += err.errors.birth_date.join('\n');
        }
        if (err.errors.middle_name && err.errors.middle_name.length > 0) {
          apiError += err.errors.middle_name.join('\n');
        }
        if (err.errors.nationality_id && err.errors.nationality_id.length > 0) {
          apiError += err.errors.nationality_id.join('\n');
        }
        if (err.errors.country_id && err.errors.country_id.length > 0) {
          apiError += err.errors.country_id.join('\n');
        }
        if (
          err.errors.house_no_street &&
          err.errors.house_no_street.length > 0
        ) {
          apiError += err.errors.house_no_street.join('\n');
        }
        if (err.errors.city && err.errors.city.length > 0) {
          apiError += err.errors.city.join('\n');
        }
        if (err.errors.province_state && err.errors.province_state.length > 0) {
          apiError += err.errors.province_state.join('\n');
        }
        if (err.errors.postal_code && err.errors.postal_code.length > 0) {
          apiError += err.errors.postal_code.join('\n');
        }
        if (err.errors.guardian_name && err.errors.guardian_name.length > 0) {
          apiError += err.errors.guardian_name.join('\n');
        }
        if (
          err.errors.guardian_mobile_number &&
          err.errors.guardian_mobile_number.length > 0
        ) {
          apiError += err.errors.guardian_mobile_number.join('\n');
        }
        if (
          err.errors.is_accept_parental_consent &&
          err.errors.is_accept_parental_consent.length > 0
        ) {
          apiError += err.errors.is_accept_parental_consent.join('\n');
        }
        if (err.errors.contact_no && err.errors.contact_no.length > 0) {
          apiError += err.errors.contact_no.join('\n');
        }

        // otp error
        if (err.errors.otp_type && err.errors.otp_type.length > 0) {
          apiError += err.errors.otp_type.join('\n');
        }
      }

      setApiErrorMsg(apiError || '');
      setIsError(true);
    }
    if (!err.code && err.response) {
      apiError = err.response.statusText;
      setApiErrorMsg(apiError || '');
      setIsError(true);
    }
    if (!err.response && !err.code) {
      apiError = err.message;
      setApiErrorMsg(apiError || '');
      setIsError(true);
    }
  };

  // function for looping year on birthday
  const loopYear = (yyyy: number) => {
    const yearArray: number[] = [];
    let currentYear = new Date().getFullYear() - 15;
    let startYear = yyyy || 1960;

    while (startYear <= currentYear) {
      yearArray.push(currentYear--);
    }
    setYears(yearArray);
  };

  /** Call this function if user has profile */
  const writeProfileDetails = (prof: any) => {
    setFirstName({ value: prof.first_name, error: false });
    setMiddleName({ value: prof.middle_name, error: false });
    setLastName({ value: prof.last_name, error: false });
    const nI = refs.nationalities.findIndex(j => j.id === prof.nationality_id);
    setNationality({ value: nI !== -1 ? nI.toString() : '', error: false });
    const bdate = prof.birth_date.split('-');
    setBirthDate({
      year: bdate[0],
      month: bdate[1],
      day: bdate[2],
      error: false,
    });
    setPlaceOfBirth({
      value: prof.place_of_birth || '',
      error: false,
    });
    setMothersMaidenName({
      value: prof.mother_maidenname || '',
      error: false,
    });
    const mI = refs.maritalStatus.findIndex(
      j => j.id === prof.marital_status_id,
    );
    setMarital({ value: mI !== -1 ? mI.toString() : '', error: false });

    const cI = refs.countries.findIndex(j => j.id === prof.country_id);
    setCountry({ value: cI !== -1 ? cI.toString() : '', error: false });
    setGuardianName({ value: prof.guardian_name || '', error: false });
    setGuardianMobile({
      value: prof.guardian_mobile_number || '',
      error: false,
    });
    setConsent({
      value: Boolean(prof.is_accept_parental_consent),
      error: false,
    });
    setHouseNo({ value: prof.house_no_street, error: false });
    setCity({ value: prof.city, error: false });
    setProvince({ value: prof.province_state, error: false });
    setPostal({ value: prof.postal_code, error: false });

    setContactNo({ value: prof.contact_no || '', error: false });

    const nwI = refs.natureOfWork.findIndex(
      j => j.id === prof.nature_of_work_id,
    );
    setNatureOfWork({
      value: nwI !== -1 ? nwI.toString() : '',
      encoded: prof.encoded_nature_of_work || '',
      error: false,
    });

    const sI = refs.sourceOfFunds.findIndex(
      j => j.id === prof.source_of_fund_id,
    );
    setSourceOfFunds({
      value: sI !== -1 ? sI.toString() : '',
      encoded: prof.encoded_source_of_fund || '',
      error: false,
    });
    setOccupation({
      value: prof.occupation || '',
      error: false,
    });
    setEmployer({
      value: prof.employer || '',
      error: false,
    });
  };

  const onChangeBirthDate = e => {
    const name = e.currentTarget.name;
    setBirthDate({
      ...birthDate,
      [name]: e.currentTarget.value,
      error: false,
    });
    setConsent({ value: false, error: false });
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

    if (placeOfBirth.value === '') {
      hasError = true;
      setPlaceOfBirth({ ...placeOfBirth, error: true });
    }

    if (mothersMaidenName.value === '') {
      hasError = true;
      setMothersMaidenName({ ...mothersMaidenName, error: true });
    }

    if (marital.value === '') {
      hasError = true;
      setMarital({ ...marital, error: true });
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
      if (!consent.value) {
        hasError = true;
        setConsent({ ...consent, error: true });
      }
    }

    // others for nature of work and source of funds, occupation, employer
    if (natureOfWork.value === '') {
      hasError = true;
      setNatureOfWork({ ...natureOfWork, error: true });
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

    if (sourceOfFunds.value === '') {
      hasError = true;
      setSourceOfFunds({ ...sourceOfFunds, error: true });
    }
    if (
      sourceOfFunds.value !== '' &&
      refs.sourceOfFunds[parseInt(sourceOfFunds.value)].id ===
        '0ed801a1-9131-11eb-b44f-1c1b0d14e211' &&
      sourceOfFunds.encoded === ''
    ) {
      hasError = true;
      setSourceOfFunds({ ...sourceOfFunds, error: true });
    }

    if (occupation.value === '') {
      hasError = true;
      setOccupation({ ...occupation, error: true });
    }

    if (employer.value === '') {
      hasError = true;
      setEmployer({ ...employer, error: true });
    }

    if (
      contactNo.value === '' ||
      (contactNo.value !== '' && !validatePhone(contactNo.value))
    ) {
      hasError = true;
      setContactNo({ ...contactNo, error: true });
    }

    if (!hasError) {
      setShowForm(prev => !prev);
      setShowConfirm(prev => !prev);
    }
  };

  const onBackToForm = () => {
    setShowForm(prev => !prev);
    setShowConfirm(prev => !prev);
  };

  // const onGenerateOTP = () => {
  //   const data = {
  //     otp_type: 'update_profile',
  //   };
  //   dispatch(actions.getSendOTPLoading(data));
  // };

  const onSubmit = () => {
    const data = {
      // "entity_id": "123",
      // "title": "sample",
      last_name: lastName.value,
      first_name: firstName.value,
      middle_name: middleName.value,
      // "name_extension": "jr",
      birth_date: `${birthDate.year}-${birthDate.month}-${birthDate.day}`,
      place_of_birth: placeOfBirth.value,
      mother_maidenname: mothersMaidenName.value,
      marital_status_id:
        marital.value !== ''
          ? refs.maritalStatus[parseInt(marital.value)].id
          : undefined,
      nationality_id:
        nationality.value !== ''
          ? refs.nationalities[parseInt(nationality.value)].id
          : undefined,
      house_no_street: houseNo.value,
      city: city.value,
      province_state: province.value,
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
        : undefined,

      contact_no: contactNo.value,
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
      occupation: occupation.value,
      employer: employer.value,
      id_photos_ids: isTierUpgrade ? idPhotoID : undefined,
      id_selfie_ids: isTierUpgrade ? selfieID : undefined,
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
    setShowConfirm(false);
    setShowForm(false);
    setShowOTP(false);
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
    if (
      refs.nationalities &&
      refs.nationalities.length > 0 &&
      refs.countries &&
      refs.countries.length > 0 &&
      refs.natureOfWork &&
      refs.natureOfWork.length > 0 &&
      refs.maritalStatus &&
      refs.maritalStatus.length > 0 &&
      refs.sourceOfFunds &&
      refs.sourceOfFunds.length > 0
    ) {
      hasRefs = true;
    }
  }

  return (
    <>
      {isLoading && <Loading position="fixed" />}

      {showForm && (
        <Box title="User Info" titleBorder withPadding>
          <form id="silverUpdateProfile">
            <Field flex>
              <Label>First Name</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={firstName.value}
                  onChange={
                    isAuthenticated
                      ? undefined
                      : e =>
                          setFirstName({
                            value: e.currentTarget.value,
                            error: false,
                          })
                  }
                  className={firstName.error ? 'error' : undefined}
                  placeholder="First Name"
                  disabled={isAuthenticated}
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
                  onChange={
                    isAuthenticated
                      ? undefined
                      : e =>
                          setMiddleName({
                            value: e.currentTarget.value,
                            error: false,
                          })
                  }
                  className={middleName.error ? 'error' : undefined}
                  placeholder="Middle Name"
                  disabled={isAuthenticated}
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
                  onChange={
                    isAuthenticated
                      ? undefined
                      : e =>
                          setLastName({
                            value: e.currentTarget.value,
                            error: false,
                          })
                  }
                  className={lastName.error ? 'error' : undefined}
                  placeholder="Last Name"
                  disabled={isAuthenticated}
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
              <Label>Date of Birth</Label>
              <div style={{ flexGrow: 1 }}>
                {!isAuthenticated && (
                  <>
                    <Select
                      name="month"
                      value={birthDate.month}
                      onChange={isAuthenticated ? undefined : onChangeBirthDate}
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
                      <option value="" disabled>
                        yyyy
                      </option>
                      {years.map(i => (
                        <option key={i} value={i < 9 ? `0${i}` : i}>
                          {i < 9 ? `0${i}` : i}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
                {isAuthenticated && (
                  <Input
                    value={`${birthDate.month}/${birthDate.day}/${birthDate.year}`}
                    disabled={isAuthenticated}
                  />
                )}
                {birthDate.error && (
                  <ErrorMsg formError>Date of Birth is required</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Place of Birth</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={placeOfBirth.value}
                  onChange={e =>
                    setPlaceOfBirth({
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={placeOfBirth.error ? 'error' : undefined}
                  placeholder="Place of birth"
                />
                {placeOfBirth.error && (
                  <ErrorMsg formError>Place of birth is required.</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Mothers Maiden Name</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={mothersMaidenName.value}
                  onChange={e =>
                    setMothersMaidenName({
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={mothersMaidenName.error ? 'error' : undefined}
                  placeholder="Mothers maiden name"
                />
                {mothersMaidenName.error && (
                  <ErrorMsg formError>Mothers maiden name required.</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Marital Status</Label>
              <div style={{ flexGrow: 1 }}>
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
                {marital.error && (
                  <ErrorMsg formError>Select marital status.</ErrorMsg>
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
                    Select country
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
              <Label>House Number and Street Address</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={houseNo.value}
                  onChange={e =>
                    setHouseNo({ value: e.currentTarget.value, error: false })
                  }
                  className={houseNo.error ? 'error' : undefined}
                  placeholder="House Number and Street Address"
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

            <H5>Contact Info</H5>
            <Field flex>
              <Label>Mobile Number</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={contactNo.value}
                  onChange={e =>
                    setContactNo({ value: e.currentTarget.value, error: false })
                  }
                  className={contactNo.error ? 'error' : undefined}
                  placeholder="Mobile number"
                />
                {contactNo.error && (
                  <ErrorMsg formError>
                    {contactNo.value === ''
                      ? 'Enter your mobile number'
                      : 'The mobile number is invalid. Use the format 09 + 9 digit mobile number.'}
                  </ErrorMsg>
                )}
              </div>
            </Field>

            <H5>Work Info</H5>
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
                      style={{ marginTop: 3 }}
                    />
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
                      style={{ marginTop: 3 }}
                    />
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
              <div style={{ flexGrow: 1 }}>
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
                {occupation.error && (
                  <ErrorMsg formError>Enter your occupation</ErrorMsg>
                )}
              </div>
            </Field>
            <Field flex>
              <Label>Employer</Label>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={employer.value}
                  onChange={e =>
                    setEmployer({
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={employer.error ? 'error' : undefined}
                  placeholder="Employer"
                />
                {employer.error && (
                  <ErrorMsg formError>Enter your employer</ErrorMsg>
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
                Next
              </Button>
            </Flex>
          </form>
        </Box>
      )}

      {showConfirm && (
        <Box title="Review User Info" titleBorder withPadding>
          {otpLoading && <Loading position="absolute" />}
          {loading && <Loading position="absolute" />}
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
                label="Date of Birth"
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
                label="Mothers Maiden Name"
                primary={mothersMaidenName.value}
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
                label="Country"
                primary={
                  refs.countries[parseInt(country.value, 10)].description
                }
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            {showGuardianFields && (
              <>
                <ListItem flex>
                  <ListItemText
                    label="Guardian's Name"
                    primary={guardianName.value}
                    style={{
                      flexGrow: 1,
                    }}
                  />
                </ListItem>
                <ListItem flex>
                  <ListItemText
                    label="Guardian's Mobile Number"
                    primary={guardianMobile.value}
                    style={{
                      flexGrow: 1,
                    }}
                  />
                </ListItem>
                <ListItem flex>
                  <ListItemText
                    label="Parent/Guardian Consent"
                    primary={consent.value ? 'Yes' : 'No'}
                    style={{
                      flexGrow: 1,
                    }}
                  />
                </ListItem>
              </>
            )}

            <ListItem flex>
              <ListItemText
                label="Current Address"
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
                label="Home Phone Number"
                primary={contactNo.value}
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
                label="Employer"
                primary={employer.value}
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
          </List>
          <Flex
            alignItems="center"
            justifyContent="flex-end"
            style={{ marginTop: '20px' }}
          >
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onBackToForm}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // onClick={isAuthenticated ? onGenerateOTP : onSubmit}
              onClick={onSubmit}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      )}

      {showOTP && (
        <Box title="4-Digit One Time PIN" titleBorder withPadding>
          {loading && <Loading position="absolute" />}
          <div
            className="text-center"
            style={{ maxWidth: 380, margin: '0 auto' }}
          >
            <VerifyOTP
              verifyURL="/auth/verify/otp"
              otpType="update_profile"
              onSuccess={onSubmit}
              isVerifyUserToken
              resendURL="/auth/generate/otp"
              resendPayload={JSON.stringify({
                otp_type: 'update_profile',
              })}
              isResendUserToken
            />
          </div>
        </Box>
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
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Update Error</H3>
          <p>{apiErrorMsg}</p>
          <Button
            fullWidth
            onClick={onCloseErrorDialog}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>

      {/* Show success */}
      <Dialog show={isSuccess} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">
            {isTierUpgrade ? 'Request sent!' : 'Successfully updated!'}
          </H3>
          <p>
            {isTierUpgrade
              ? 'Awesome! We have received your request to update your account. We will review and verify your request within 24 hours.'
              : 'You have successfully updated your account information.'}
          </p>
          <Button
            fullWidth
            onClick={onCloseSuccessDialog}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
}
