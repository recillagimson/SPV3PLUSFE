import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Loading from 'app/components/Loading';
import Field from 'app/components/Elements/Fields';
import Label from 'app/components/Elements/Label';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Note from 'app/components/Elements/Note';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

export function SettingsChangePasswordPage() {
  const [currentPass, setCurrentPass] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [newPass, setNewPass] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [confirmPass, setConfirmPass] = React.useState({
    value: '',
    error: false,
    show: false,
  });

  return (
    <ProtectedContent>
      <Helmet>
        <title>Settings - Change Password</title>
      </Helmet>

      <Box
        title="Change Password"
        titleBorder
        withPadding
        footerBorder
        footerAlign="right"
        footer={
          <>
            <Button
              onClick={() => {}}
              variant="outlined"
              color="secondary"
              size="large"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {}}
              variant="contained"
              color="primary"
              size="large"
            >
              Save Changes
            </Button>
          </>
        }
      >
        <Field flex>
          <Label>Current Password</Label>
          <InputIconWrapper>
            <Input
              type={currentPass.show ? 'text' : 'password'}
              value={currentPass.value}
              onChange={e =>
                setCurrentPass({
                  ...currentPass,
                  value: e.currentTarget.value,
                  error: false,
                })
              }
              className={currentPass.error ? 'error' : undefined}
              placeholder="Current Password"
              required
              autoComplete="off"
            />
            <IconButton
              type="button"
              onClick={() =>
                setCurrentPass({
                  ...currentPass,
                  show: !currentPass.show,
                })
              }
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={currentPass.show ? 'eye-slash' : 'eye'} />
            </IconButton>
          </InputIconWrapper>
        </Field>
        <Field flex>
          <Label>New Password</Label>
          <div style={{ flexGrow: 1 }}>
            <InputIconWrapper>
              <Input
                type={newPass.show ? 'text' : 'password'}
                value={newPass.value}
                onChange={e =>
                  setNewPass({
                    ...newPass,
                    value: e.currentTarget.value,
                    error: false,
                  })
                }
                className={newPass.error ? 'error' : undefined}
                placeholder="New Password"
                required
                autoComplete="off"
              />
              <IconButton
                type="button"
                onClick={() =>
                  setNewPass({
                    ...newPass,
                    show: !newPass.show,
                  })
                }
                tabIndex={-1}
              >
                <FontAwesomeIcon icon={newPass.show ? 'eye-slash' : 'eye'} />
              </IconButton>
            </InputIconWrapper>
            <Note>
              Must have at least 12 characters, one upper and lower case letter,
              one numeric and one special character (@$!%*#?&amp;_)
            </Note>
          </div>
        </Field>
        <Field flex>
          <Label>Retype Password</Label>
          <InputIconWrapper>
            <Input
              type={confirmPass.show ? 'text' : 'password'}
              value={confirmPass.value}
              onChange={e =>
                setConfirmPass({
                  ...confirmPass,
                  value: e.currentTarget.value,
                  error: false,
                })
              }
              className={confirmPass.error ? 'error' : undefined}
              placeholder="Retype Password"
              required
              autoComplete="off"
            />
            <IconButton
              type="button"
              onClick={() =>
                setConfirmPass({
                  ...confirmPass,
                  show: !confirmPass.show,
                })
              }
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={confirmPass.show ? 'eye-slash' : 'eye'} />
            </IconButton>
          </InputIconWrapper>
        </Field>
      </Box>
    </ProtectedContent>
  );
}
