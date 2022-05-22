import { removeUser, setUser } from '../app/slices/user';
import { useAppDispatch, useAppSelector } from '../app/store';

export default function useUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const set = (user) => {
    dispatch(setUser(user));
  };
  const remove = () => {
    dispatch(removeUser());
  };
  return { setUser: set, user, removeUser: remove };
}
