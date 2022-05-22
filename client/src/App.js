import { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Notification from './components/Notification';
import { useNotification, useUser } from './hooks';
import { useGetUserDataMutation } from './app/backend';

// ----------------------------------------------------------------------

export default function App() {
  const [GetUserData] = useGetUserDataMutation();
  const { Notify } = useNotification();
  const { setUser, removeUser } = useUser();
  useEffect(() => {
    GetUserData()
      .unwrap()
      .then((user) => {
        Notify({
          title: `Welcome back ${user.firstName}`,
          description: '',
          type: 'success',
        });
        setUser(user);
      })
      .catch((e) => {
        console.error(e);
        removeUser();
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
      <Notification />
    </ThemeProvider>
  );
}
