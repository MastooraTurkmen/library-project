import { Box } from '@mui/material';
import Navbar from '../Navbar';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onLanguageChange={handleLanguageChange} />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 