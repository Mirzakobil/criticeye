import './App.css';
import Navbar from './header/navbar';
import Main from './pages/main';
import Login from './pages/login';
import CategoryReviews from './pages/categoryReviews';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import GlobalContext from './constants/globalContext';
import { IntlProvider } from 'react-intl';
import enMessages from './localization/en.json';
import ruMessages from './localization/ru.json';
import locales from './constants/locales';

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
      fetch('http://localhost:4000/login/success', {
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
          console.log(resObject);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
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
            <Navbar user={user} />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/review/category/:id"
                element={<CategoryReviews />}
              />
            </Routes>
          </ThemeProvider>
        </IntlProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
