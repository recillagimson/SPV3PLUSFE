/**
 * Loading Page
 * @prop {isLoading} boolean trigger loading state of the component to show the Loading GIF
 * @props {children} React Node/Element show the element after the loading state becames false
 */
import * as React from 'react';

import loading from './loading_light.gif';
import loadingDark from './loading_dark.gif';

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
      {props.isLoading ? (
        <div className="loading-container">
          <img src={props.invert ? loading : loadingDark} alt="Loading..." />
        </div>
      ) : (
        props.children
      )}
    </S.Wrapper>
  );
}

export default ComponentLoading;
