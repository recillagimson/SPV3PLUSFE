/**
 * Loading Page
 * @prop {isLoading} boolean trigger loading state of the component to show the Loading GIF
 * @props {children} React Node/Element show the element after the loading state becames false
 */
import * as React from 'react';

import Loading from 'app/components/Loading';
// Styles
import * as S from './ComponentLoading.style';

type Props = {
  isLoading?: boolean;
  children: React.ReactNode;
  invert?: boolean;
};

function ComponentLoading(props: Props) {
  return (
    <S.Wrapper>
      {props.isLoading ? <Loading position="relative" /> : props.children}
    </S.Wrapper>
  );
}

export default ComponentLoading;
