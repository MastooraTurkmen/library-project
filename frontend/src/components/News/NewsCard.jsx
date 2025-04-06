import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/news/${news._id}`);
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
      }
    }}>
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={news.imageUrl}
          alt={news.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {t(`news.${news._id}.title`, news.title)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('by')} {news.author} • {new Date(news.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(`news.${news._id}.summary`, news.summary)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard; 