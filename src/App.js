import './App.css';
import Navbar from './navbar';
import Login from './login';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  createTheme,
  Button,
  ThemeProvider,
  Typography,
  CssBaseline,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
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
  const [user, setUser] = useState(null);
  const [themeColor, setTheme] = useState(
    localStorage.getItem('mode') || 'light'
  );
  const [locale, setLocale] = useState(
    localStorage.getItem('locale') || locales.EN
  );

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

  const handleChange = (event) => {
    const value = event.target.value;
    setTheme(value);
    localStorage.setItem('mode', value);
  };
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

  console.log(themeColor);
  return (
    <>
      <GlobalContext.Provider
        value={{
          locale,
          setLocale,
        }}
      >
        <IntlProvider locale={locale} messages={messages[locale]}>
          <ThemeProvider
            theme={themeColor === 'light' ? themeLight : themeDark}
          >
            <CssBaseline />
            <div>
              <Navbar user={user} />
              <Box sx={{ minWidth: 120 }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={themeColor}
                    label="Theme"
                    onChange={handleChange}
                  >
                    <MenuItem value={'light'}>light</MenuItem>
                    <MenuItem value={'dark'}>dark</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Routes>
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </IntlProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
