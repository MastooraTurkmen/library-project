import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const objectives = [
    {
      title: t('objective1'),
      content: t('objective1Text'),
    },
    {
      title: t('objective2'),
      content: t('objective2Text'),
    }
  ];

  const activities = [
    t('research'),
    t('awareness'),
    t('education'),
    t('publication'),
    t('documentation')
  ];

  const workAreas = [
    {
      title: t('advocacy'),
      content: t('advocacyText')
    },
    {
      title: t('training'),
      content: t('trainingText')
    },
    {
      title: t('justice'),
      content: t('justiceText')
    },
    {
      title: t('communities'),
      content: t('communitiesText')
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          {t('organizationName')}
        </Typography>

        <Grid container spacing={4}>
          {/* Vision Section */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h4" gutterBottom color="primary">
                  {t('vision')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('visionText')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Objectives Section */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h4" gutterBottom color="primary">
                  {t('objectives')}
                </Typography>
                {objectives.map((objective, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {objective.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {objective.content}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Activities Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom color="primary">
                  {t('activities')}
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {activities.map((activity, index) => (
                    <Typography key={index} component="li" variant="body1" sx={{ mb: 1 }}>
                      {activity}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Work Areas Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom color="primary">
                  {t('workAreas')}
                </Typography>
                {workAreas.map((area, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {area.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {area.content}
                    </Typography>
                    {index < workAreas.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 