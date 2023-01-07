import React, { useContext, useMemo, useEffect, useState } from 'react';
import GlobalContext from '../constants/globalContext';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
function ThemePicker() {
  const { themeColor, setTheme } = useContext(GlobalContext);
  const [color, setColor] = useState('light');
  const handleChange = (event) => {
    console.log(event);
    const value = event.target.value;
    setTheme(value);
    localStorage.setItem('mode', value);
  };

  return (
    <Box sx={{ minWidth: 120, color: 'white' }}>
      <FormControl sx={{ color: 'white' }}>
        <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>
          Theme
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
          value={themeColor}
          label="Theme"
          onChange={handleChange}
        >
          <MenuItem value={'light'}>light</MenuItem>
          <MenuItem value={'dark'}>dark</MenuItem>
        </Select>
      </FormControl>
      {/* <IconButton
        sx={{ ml: 1 }}
        value={themeColor}
        onClick={handleChange}
        color="inherit"
      >
        {color === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
    </Box>
  );
}

export default ThemePicker;
