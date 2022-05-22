import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Api from './backend';
import user from './slices/user';
import notification from './slices/notification';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    user,
    notification,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(Api.middleware),
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
