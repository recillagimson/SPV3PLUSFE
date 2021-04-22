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
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              mm
            </option>
            <option value="01">Jan</option>
          </Select>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              dd
            </option>
            <option value="01">Jan</option>
          </Select>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              yyyy
            </option>
            <option value="01">1970</option>
            <option value="01">2021</option>
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
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              mm
            </option>
            <option value="01">Jan</option>
          </Select>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              dd
            </option>
            <option value="01">Jan</option>
          </Select>
          <Select value="0" onChange={() => {}}>
            <option value="0" disabled>
              yyyy
            </option>
            <option value="01">1970</option>
            <option value="01">2021</option>
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
    </>
  );
}
