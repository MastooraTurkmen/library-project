import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/about', label: t('about') },
    { path: '/podcast', label: t('podcast') },
    { path: '/books', label: t('books') },
    { path: '/news', label: t('news') },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Sindokht
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              color="inherit"
            >
              {item.label}
            </Button>
          ))}
          
          <IconButton
            color="inherit"
            onClick={() => onLanguageChange(i18n.language === 'en' ? 'fa' : 'en')}
          >
            <LanguageIcon />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {i18n.language === 'en' ? 'فارسی' : 'English'}
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 