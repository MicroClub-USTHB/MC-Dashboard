import { removeNotification, setNotification } from '../app/slices/notification';
import { useAppDispatch, useAppSelector } from '../app/store';

export default function useNotification() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notification);
  const set = ({ title, description, type, timeOut = 10000 }) => {
    dispatch(
      setNotification({
        title,
        description,
        type,
        timeOut,
      })
    );
  };
  const error = (err, timeOut = 10000) => {
    err = err.data ? err.data : err;
    dispatch(
      setNotification({
        title: err.Name ?? 'Unknown Error',
        description: err.message ?? 'Please try again',
        type: 'error',
        timeOut,
      })
    );
  };
  const closeNotification = () => {
    dispatch(removeNotification());
  };
  return { Notify: set, notification, closeNotification, Errofy: error };
}
