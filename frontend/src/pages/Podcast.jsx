import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Podcast = () => {
  const { t } = useTranslation();
  const [playingId, setPlayingId] = useState(null);

  // Sample podcast data - replace with your actual data
  const podcasts = [
    {
      id: 1,
      title: 'Podcast 1',
      description: 'Description of podcast 1',
      image: 'https://via.placeholder.com/300',
      audioUrl: 'https://example.com/podcast1.mp3',
    },
    {
      id: 2,
      title: 'Podcast 2',
      description: 'Description of podcast 2',
      image: 'https://via.placeholder.com/300',
      audioUrl: 'https://example.com/podcast2.mp3',
    },
    // Add more podcasts as needed
  ];

  const handlePlayPause = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {t('podcast')}
        </Typography>

        <Grid container spacing={4}>
          {podcasts.map((podcast) => (
            <Grid item xs={12} sm={6} md={4} key={podcast.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={podcast.image}
                  alt={podcast.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {podcast.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {podcast.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handlePlayPause(podcast.id)}
                    >
                      {playingId === podcast.id ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Podcast; 