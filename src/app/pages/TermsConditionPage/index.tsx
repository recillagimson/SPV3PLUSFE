/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useLocation } from 'react-router';

import TermsCondition from 'app/components/TermsCondition';
import TermsConditionTagalog from 'app/components/TermsCondition/Tagalog';

export function TermsAndConditionPage() {
  const location = useLocation();
  const [isEnglish, setIsEnglish] = React.useState(true);

  React.useEffect(() => {
    if (location) {
      const params = location.search;
      setIsEnglish(!params.includes('tagalog'));
    }
  }, [location]);

  return <>{isEnglish ? <TermsCondition /> : <TermsConditionTagalog />}</>;
}
