import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Sindokht
        </Typography>

        <Grid container spacing={4}>
          {/* Books Section */}
          <Grid item xs={12} md={6}>
            <Paper
              component={RouterLink}
              to="/books"
              sx={{
                p: 4,
                height: '100%',
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <Typography variant="h4" gutterBottom>
                {t('header.books')}
              </Typography>
              <Typography color="text.secondary">
                {t('home.booksDescription', 'Explore our collection of Persian literature and contemporary books.')}
              </Typography>
            </Paper>
          </Grid>

          {/* News Section */}
          <Grid item xs={12} md={6}>
            <Paper
              component={RouterLink}
              to="/news"
              sx={{
                p: 4,
                height: '100%',
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <Typography variant="h4" gutterBottom>
                {t('header.news')}
              </Typography>
              <Typography color="text.secondary">
                {t('home.newsDescription', 'Stay updated with the latest news in Persian literature and culture.')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage; 