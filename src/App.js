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
