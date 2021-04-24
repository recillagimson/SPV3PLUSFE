/* eslint-disable react-hooks/exhaustive-deps */
/**
 * User Profile Form
 *
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

/** selectors */
import { selectReferences } from 'app/App/slice/selectors';
import { appActions } from 'app/App/slice';
import { validateEmail, validatePhone } from 'app/components/Helpers';

export default function UserProfileForm({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const dispatch = useDispatch();
  const refs: any = useSelector(selectReferences);

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
    error: false,
  });
  const [sourceOfFunds, setSourceOfFunds] = React.useState({
    value: '',
    error: false,
  });

  React.useEffect(() => {
    loopYear(1950);
  }, []);

  React.useEffect(() => {
    if (refs && Object.keys(refs).length === 0) {
      dispatch(appActions.getLoadReferences());
    }

    if (refs && Object.keys(refs).length > 0) {
      setIsLoading(false);
    }
  }, [refs]);

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

    if (!hasError) {
      setShowForm(prev => !prev);
      setShowConfirm(prev => !prev);
    }
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
      {isLoading && <Loading position="fixed" />}
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
              />
            </Field>
            <Field flex>
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
            </Field>
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
              <Label>Marital</Label>
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
                  refs.nationalities.map(i => (
                    <option key={i.id} value={i.code}>
                      {i.description}
                    </option>
                  ))}
              </Select>
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

          <Box title="Address" withPadding titleBorder>
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
                  refs.countries.map(i => (
                    <option key={i.id} value={i.code}>
                      {i.description}
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
          </Box>

          <Box title="Work Info" withPadding titleBorder>
            <Field flex>
              <Label>Nature of Work</Label>
              <Select
                fullWidth
                value={natureOfWork.value}
                onChange={e =>
                  setNatureOfWork({
                    value: e.currentTarget.value,
                    error: false,
                  })
                }
                className={natureOfWork.error ? 'error' : undefined}
              >
                <option value="" disabled>
                  Select nature of work
                </option>
                {hasRefs &&
                  refs.natureOfWork.map(i => (
                    <option key={i.id} value={i.description}>
                      {i.description}
                    </option>
                  ))}
              </Select>
            </Field>
            <Field flex>
              <Label>Source of Funds</Label>
              <Select
                fullWidth
                value={sourceOfFunds.value}
                onChange={e =>
                  setSourceOfFunds({
                    value: e.currentTarget.value,
                    error: false,
                  })
                }
                className={sourceOfFunds.error ? 'error' : undefined}
              >
                <option value="" disabled>
                  Select source of funds
                </option>
                {hasRefs &&
                  refs.sourceOfFunds.map(i => (
                    <option key={i.id} value={i.description}>
                      {i.description}
                    </option>
                  ))}
              </Select>
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
                  primary={nationality.value}
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
                  primary={country.value}
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
                  primary={natureOfWork.value}
                  style={{
                    flexGrow: 1,
                  }}
                />
              </ListItem>
              <ListItem flex>
                <ListItemText
                  label="Source of Funds"
                  primary={sourceOfFunds.value}
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
              onClick={onValidateFields}
            >
              Update
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}
