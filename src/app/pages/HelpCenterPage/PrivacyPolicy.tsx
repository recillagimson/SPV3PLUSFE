import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
// import Select from 'app/components/Elements/Select';

import PrivacyPolicy from 'app/components/PrivacyPolicy';

export function PrivacyPolicyConsent() {
  // const [isEnglish, setIsEnglish] = React.useState(true);

  return (
    <ProtectedContent>
      <Box
        title="Privacy Policy"
        titleBorder
        withPadding
        // titleAction={
        //   <Select
        //     style={{ borderColor: 'transparent' }}
        //     value={isEnglish.toString()}
        //     onChange={e => {
        //       setIsEnglish(prev => !prev);
        //     }}
        //   >
        //     <option value="true">English</option>
        //     <option value="false">Tagalog</option>
        //   </Select>
        // }
      >
        {/* {isEnglish ? <PrivacyPolicy /> : <PrivacyPolicyTagalog />} */}
        <PrivacyPolicy />
      </Box>
    </ProtectedContent>
  );
}
