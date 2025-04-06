import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NewsCard from '../components/News/NewsCard';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        {t('news.latestNews')}
      </Typography>
      <Grid container spacing={4}>
        {news.map((newsItem) => (
          <Grid item xs={12} sm={6} md={4} key={newsItem._id}>
            <NewsCard news={newsItem} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage; 