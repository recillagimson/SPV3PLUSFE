/**
 * Loading Page
 * @prop {string} position      CSS position value, default: relative
 */
import * as React from 'react';

import Wrapper from './Wrapper';
import loading from './loading.gif';

type Props = {
  position?: string;
};

function Loading(props: Props) {
  return (
    <Wrapper position={props.position}>
      <img src={loading} alt="" />
    </Wrapper>
  );
}

export default Loading;
