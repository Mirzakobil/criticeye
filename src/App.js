import './App.css';
import Grid from '@mui/material/Grid';
import Navbar from './header/navbar';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import GlobalContext from './constants/globalContext';
import { IntlProvider } from 'react-intl';
import enMessages from './localization/en.json';
import ruMessages from './localization/ru.json';
import locales from './constants/locales';
import Sidebar from './sidebar';

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
};
function App() {
  const [themeColor, setTheme] = useState(
    localStorage.getItem('mode') || 'light'
  );
  const [locale, setLocale] = useState(
    localStorage.getItem('locale') || locales.EN
  );
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch('https://criticeye-api.onrender.com/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          localStorage.setItem('user', JSON.stringify(resObject.user));
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (JSON.parse(localStorage.getItem('user'))) {
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      getUser();
    }
  }, []);
  const themeLight = createTheme({
    palette: {
      mode: 'light',
    },
  });
  const themeDark = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <GlobalContext.Provider
        value={{
          locale,
          setLocale,
          themeColor,
          setTheme,
        }}
      >
        <IntlProvider locale={locale} messages={messages[locale]}>
          <ThemeProvider
            theme={themeColor === 'light' ? themeLight : themeDark}
          >
            <CssBaseline />
            <Grid container>
              <Grid item xs={12}>
                <Navbar user={user} />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Sidebar />
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10}>
                <AppRoutes />
              </Grid>
            </Grid>
          </ThemeProvider>
        </IntlProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
