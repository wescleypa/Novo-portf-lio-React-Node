import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Ícone de lua (dark mode)
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Ícone de sol (light mode)

const ThemeToggle = ({ mode, toggleTheme }) => {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ThemeToggle;