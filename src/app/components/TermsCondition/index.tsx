/**
 * Terms and Conditions
 * for import only
 * NOTE: for testing on fetching data from the src instead using iframe, until the src allows cors
 */
import * as React from 'react';
// import styled from 'styled-components/macro';
// import Button from '../Elements/Button';
// import Loading from '../Loading';

// const Wrapper = styled.div<{ scroll?: boolean }>`
//   max-height: ${p => (p.scroll ? '70vh' : 'none')};
//   overflow-y: auto;
// `;

export default function TermsCondition({ scroll }: { scroll?: boolean }) {
  // const [loading, setLoading] = React.useState(true);
  // const [data, setData] = React.useState<any>(false);
  // const [error, setError] = React.useState(false);

  // const fetchTerms = async () => {
  //   const url = 'https://squidpay.ph/tac';

  //   try {
  //     setLoading(true);
  //     const request = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'text/html',
  //         'Content-Type': 'text/html; charset=UTF-8',
  //         Cookie: 'set-cookie',
  //         mode: 'cors',
  //       },
  //       redirect: 'manual',
  //     });

  //     console.log(request);

  //     const response = await request.text();

  //     console.log(response);

  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(response, 'text/html');
  //     if (doc.querySelector('body')?.textContent !== 'null') {
  //       const parse: any = doc.querySelector('body')?.innerHTML;
  //       setData(parse);
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     setError(true);
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchTerms();
  // }, []);

  // if (loading) {
  //   return <Loading position="relative" />;
  // }

  // if (error) {
  //   return (
  //     <Wrapper scroll={scroll}>
  //       <div style={{ maxWidth: 380, margin: '0 auto' }}>
  //         <p style={{ marginBottom: 30 }}>
  //           We have encountered an error loading the data. Please try again.
  //         </p>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={() => fetchTerms()}
  //           fullWidth
  //         >
  //           Refresh
  //         </Button>
  //       </div>
  //     </Wrapper>
  //   );
  // }

  return (
    <iframe
      id="termsConditionFrame"
      src="https://squidpay.ph/tac"
      title="Terms and Conditions"
      seamless
      loading="lazy"
      style={{
        width: '100%',
        minHeight: '70vh',
      }}
    />
    // <Wrapper dangerouslySetInnerHTML={{ __html: data }} />
  );
}
