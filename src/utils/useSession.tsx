/**
 * Session Timeout
 * @prop {number}   idle        idle time in seconds (default: 300000) 5mins
 */
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { appActions } from 'app/App/slice';

export default function SessionTimeout({ idle = 300000 }: { idle?: number }) {
  const dispatch = useDispatch();

  let startTimerInterval = React.useRef<any>();

  React.useEffect(() => {
    ['click', 'load', 'scroll'].forEach(event => {
      window.addEventListener(event, onResetTimer);
    });

    onSetTimeout();

    return () => {
      clearTimeout(startTimerInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetTimeout = () => {
    startTimerInterval.current = setTimeout(() => {
      dispatch(appActions.getIsSessionExpired(true));
    }, idle);
  };

  const onResetTimer = () => {
    clearTimeout(startTimerInterval.current);
    onSetTimeout();
  };

  return null;
}
