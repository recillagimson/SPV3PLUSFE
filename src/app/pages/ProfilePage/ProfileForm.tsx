/**
 * User Profile Form
 *
 */
import * as React from 'react';

import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Box from 'app/components/Box';

export default function UserProfileForm() {
  const [years, setYears] = React.useState<number[]>([]);

  React.useEffect(() => {
    loopYear(1960);
  }, []);

  const loopYear = (yyyy: number) => {
    const yearArray: number[] = [];
    let currentYear = new Date().getFullYear();
    let startYear = yyyy || 1960;

    while (startYear <= currentYear) {
      yearArray.push(startYear++);
    }
    setYears(yearArray);
  };

  // loop days for select option dropdown
  const days = Array.from(new Array(31), (v, i) => (
    <option key={i} value={i < 9 ? `0${i + 1}` : i + 1}>
      {i < 9 ? `0${i + 1}` : i + 1}
    </option>
  ));

  return (
    <>
      <Box title="Basic Info" withPadding titleBorder>
        <Field flex>
          <Label>First Name</Label>
          <Input value="Juan" onChange={() => {}} placeholder="First Name" />
        </Field>
        <Field flex>
          <Label>Middle Name</Label>
          <Input value="Dela" onChange={() => {}} placeholder="Middle Name" />
        </Field>
        <Field flex>
          <Label>Last Name</Label>
          <Input value="Cruz" onChange={() => {}} placeholder="Last Name" />
        </Field>
        <Field flex>
          <Label>Mobile Number</Label>
          <Input
            value="091711111111"
            onChange={() => {}}
            placeholder="Mobile Number"
          />
        </Field>
        <Field flex>
          <Label>Email Address</Label>
          <Input
            value="email@example.com"
            onChange={() => {}}
            placeholder="Email Address"
          />
        </Field>
        <Field flex>
          <Label>Birthdate</Label>
          <Select value="false" onChange={() => {}}>
            <option value="false" disabled>
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
          <Select value="false" onChange={() => {}}>
            <option value="false" disabled>
              dd
            </option>
            {days}
          </Select>
          <Select value="false" onChange={() => {}}>
            <option value="false">yyyy</option>
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
            value="East Avenue Medical Center"
            onChange={() => {}}
            placeholder="Place of Birth"
          />
        </Field>
        <Field flex>
          <Label>Marital</Label>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              Single
            </option>
          </Select>
        </Field>
        <Field flex>
          <Label>Nationality</Label>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              Filipino
            </option>
          </Select>
        </Field>
        <Field flex>
          <Label>Occupation</Label>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              Filipino
            </option>
          </Select>
        </Field>
        <Field flex>
          <Label>Occupation</Label>
          <Input
            value="East Avenue Medical Center"
            onChange={() => {}}
            placeholder="Place of Birth"
          />
        </Field>
      </Box>
      <Box title="Address" withPadding titleBorder>
        <Field flex>
          <Label>House no. / Street</Label>
          <Input
            value="Juan"
            onChange={() => {}}
            placeholder="House no. / Street"
          />
        </Field>
        <Field flex>
          <Label>City / Municipality</Label>
          <Input
            value="Dela"
            onChange={() => {}}
            placeholder="City / Municipality"
          />
        </Field>
        <Field flex>
          <Label>Province / State</Label>
          <Input
            value="Cruz"
            onChange={() => {}}
            placeholder="Province / State"
          />
        </Field>
        <Field flex>
          <Label>Country</Label>
          <Input
            value="091711111111"
            onChange={() => {}}
            placeholder="Country"
          />
        </Field>
        <Field flex>
          <Label>Postal Code</Label>
          <Input
            value="email@example.com"
            onChange={() => {}}
            placeholder="Postal Code"
          />
        </Field>
      </Box>
    </>
  );
}
