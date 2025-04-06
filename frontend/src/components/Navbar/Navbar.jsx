import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';

const Navbar = ({ onLanguageChange }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang) => {
    onLanguageChange(lang);
    handleClose();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
          >
            {t('header.home')}
          </Button>
          <Button
            component={RouterLink}
            to="/books"
            color="inherit"
          >
            {t('header.books')}
          </Button>
          <Button
            component={RouterLink}
            to="/news"
            color="inherit"
          >
            {t('header.news')}
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            color="inherit"
          >
            {t('header.about')}
          </Button>
        </Box>

        <IconButton
          color="inherit"
          onClick={handleMenu}
          aria-label="change language"
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleLanguageSelect('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageSelect('fa')}>دری</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 