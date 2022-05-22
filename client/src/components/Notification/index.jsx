import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { useNotification } from '../../app/hooks';

export default function Notification() {
  const { notification, closeNotification } = useNotification();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeNotification();
    // setOpen(false);
  };
  if (notification === null) return null;
  return (
    <Snackbar open onClose={handleClose} autoHideDuration={notification.timeOut}>
      {/* @ts-ignore */}
      <Alert onClose={handleClose} severity={notification.type}>
        <AlertTitle>{notification.title}</AlertTitle>
        {notification.description}
      </Alert>
    </Snackbar>
  );
}
