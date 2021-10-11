/**
 * Session Timeout
 * @prop {number}   idle        idle time in seconds (default: 300000) 5mins
 */
import * as React from 'react';
// import { useDispatch } from 'react-redux';
// import { appActions } from 'app/App/slice';

export default function IdleTimer({
  idle = 300000,
  onTimeout,
}: {
  idle?: number | string;
  onTimeout: () => void;
}) {
  // const dispatch = useDispatch();

  let startTimerInterval = React.useRef<any>();

  React.useEffect(() => {
    ['click', 'load', 'scroll'].forEach(event => {
      window.addEventListener(event, onResetTimer);
    });
    // run our timer after resetting it
    onSetTimeout();

    return () => {
      clearTimeout(startTimerInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetTimeout = () => {
    const timer = typeof idle === 'string' ? parseInt(idle) : idle;
    startTimerInterval.current = setTimeout(() => {
      // dispatch(appActions.getIsSessionExpired(true));
      onTimeout();
    }, timer);
  };

  const onResetTimer = () => {
    clearTimeout(startTimerInterval.current);
    onSetTimeout();
  };

  return null;
}
