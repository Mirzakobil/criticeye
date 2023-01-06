import { createContext } from 'react';
import locales from '../constants/locales';

const GlobalContext = createContext({
  locale: locales.EN,
  theme: 'light',
  toggleColorMode: () => {},
});

export default GlobalContext;
