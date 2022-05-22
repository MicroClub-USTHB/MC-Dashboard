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
