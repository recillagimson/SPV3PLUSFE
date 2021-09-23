/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Select from 'app/components/Elements/Select';
import TermsCondition from 'app/components/TermsCondition';
import TermsConditionTagalog from 'app/components/TermsCondition/Tagalog';

export function TermsAndConditionConsent() {
  const [lang, setLang] = React.useState('English');

  return (
    <ProtectedContent>
      <Box
        title="Terms and Conditions"
        titleBorder
        withPadding
        titleAction={
          <Select
            style={{ borderColor: 'transparent' }}
            value={lang}
            onChange={e => {
              setLang(e.currentTarget.value);
            }}
          >
            <option value="English">English</option>
            <option value="Filipino">Filipino</option>
          </Select>
        }
      >
        {lang === 'English' && <TermsCondition />}
        {lang === 'Filipino' && <TermsConditionTagalog />}
      </Box>
    </ProtectedContent>
  );
}
