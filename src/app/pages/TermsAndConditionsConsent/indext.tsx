/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
// import Select from 'app/components/Elements/Select';
import Loading from 'app/components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectTermsAndConditionsData,
  // selectError,
} from './slice/selectors';

export function TermsAndConditionConsent() {
  // const [language, setLanguage] = React.useState('English');
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const loading = useSelector(selectLoading);
  const termsAndConditions = useSelector(selectTermsAndConditionsData);
  const [
    parseTermsAndConditions,
    setParseTermsAndConditions,
  ] = React.useState();

  React.useEffect(() => {
    dispatch(actions.getFetchLoading());
    return () => {
      dispatch(actions.getFetchReset());
    };
  }, []);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(termsAndConditions, 'text/html');
    if (doc.querySelector('body')?.textContent !== 'null') {
      const parse: any = doc.querySelector('body')?.innerHTML;
      setParseTermsAndConditions(parse);
    }
  }, [termsAndConditions]);

  const renderTC = (parseTermsAndConditions: any) => {
    if (loading) {
      return <Loading />;
    }

    if (parseTermsAndConditions) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: parseTermsAndConditions }}
        ></div>
      );
    }
  };

  return (
    <ProtectedContent>
      <Box
        title="Terms and Conditions"
        titleBorder
        withPadding
        // titleAction={
        //   <Select
        //     style={{ borderColor: 'transparent' }}
        //     value={language}
        //     onChange={e => {
        //       setLanguage(e.currentTarget.value);
        //     }}
        //   >
        //     <option value="English">English</option>
        //     <option value="Filipino">Filipino</option>
        //   </Select>
        // }
      >
        <div>{renderTC(parseTermsAndConditions)}</div>
      </Box>
    </ProtectedContent>
  );
}
