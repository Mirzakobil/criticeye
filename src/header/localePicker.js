import React, { useContext } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import locales from '../constants/locales';
import GlobalContext from '../constants/globalContext';

function LocalePicker() {
  const { locale, setLocale } = useContext(GlobalContext);

  const setCurrentLocale = (e) => {
    const value = e.target.value;
    setLocale(value);
    localStorage.setItem('locale', value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>
          Locale
        </InputLabel>
        <Select
          labelStyle={{ color: '#ff0000' }}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white !important',
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={locale}
          label="Locale"
          onChange={setCurrentLocale}
        >
          <MenuItem value={locales.EN}>English</MenuItem>
          <MenuItem value={locales.RU}>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default LocalePicker;
