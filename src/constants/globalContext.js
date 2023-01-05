import { createContext } from 'react';
import locales from '../constants/locales';

const GlobalContext = createContext({
  locale: locales.EN,
});

export default GlobalContext;
