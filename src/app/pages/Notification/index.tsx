import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
// import IconButton from 'app/components/Elements/IconButton';
import NoNotification from './components/NoNotification';
import NotificationMessage from './components/NotificationMessage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContainerSaga } from './slice';
import Loading from 'app/components/Loading';
import { selectLoading, selectNotifications } from './slice/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export function Notifications() {
  const { actions } = useContainerSaga();
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const notifications = useSelector(selectNotifications);

  const [selectedNotif, setSelectedNotif] = React.useState(null);

  React.useEffect(() => {
    dispatch(actions.getFetchLoading());
    return () => {
      dispatch(actions.getFetchReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (id!) {
      setSelectedNotif(notificationExist({ notifications, id }));
    } else {
      setSelectedNotif(notificationExist(null));
    }
  }, [id, loading, notifications]);

  const notificationExist = attrs => {
    if (attrs) {
      if (Array.isArray(attrs.notifications) && attrs.notifications.length) {
        return attrs.notifications.filter(data => data.id === attrs.id)[0];
      }
    }

    return null;
  };

  const renderSelectedNotif = (selectedNotif: any) => {
    return <NotificationMessage data={selectedNotif} isSelected={true} />;
  };

  const renderNotif = (notifications: any) => {
    if (loading) {
      return <Loading />;
    } else {
      if (notifications && notifications.length) {
        if (selectedNotif) {
          return renderSelectedNotif(selectedNotif);
        } else {
          return notifications.map(data => {
            return (
              <NotificationMessage
                key={data.id}
                data={data}
                isSelected={false}
              />
            );
          });
        }
      } else {
        return <NoNotification />;
      }
    }
  };

  return (
    <ProtectedContent>
      <Box
        title="Notifications"
        titleBorder
        withPadding
        // titleAction={
        //   <>
        //     {selectedNotif ? (
        //       <IconButton>
        //         <FontAwesomeIcon
        //           icon="trash"
        //           onClick={() => alert('Notification delete')}
        //         />
        //       </IconButton>
        //     ) : (
        //       <></>
        //       <IconButton>
        //         <FontAwesomeIcon
        //           icon="ellipsis-v"
        //           onClick={() => alert('Notification click')}
        //         />
        //       </IconButton>
        //     )}
        //   </>
        // }
      >
        <div>{renderNotif(notifications)}</div>
      </Box>
    </ProtectedContent>
  );
}
