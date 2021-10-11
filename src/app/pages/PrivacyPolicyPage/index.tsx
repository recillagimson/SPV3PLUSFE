import * as React from 'react';
// import { useLocation } from 'react-router';
import PrivacyPolicy from 'app/components/PrivacyPolicy';

export function PrivacyPolicyPage() {
  // const location = useLocation();
  // const [isEnglish, setIsEnglish] = React.useState(true);

  // React.useEffect(() => {
  //   if (location) {
  //     const params = location.search;
  //     setIsEnglish(!params.includes('tagalog'));
  //   }
  // }, [location]);

  // return <>{isEnglish ? <PrivacyPolicy /> : <PrivacyPolicyTagalog />}</>;
  return <PrivacyPolicy />;
}
