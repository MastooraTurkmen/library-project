import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t('vision'),
      content: t('visionText'),
    },
    {
      title: t('whatWeDo'),
      items: [
        t('promoteHumanRights'),
        t('combatImpunity'),
        t('supportVoices'),
        t('preservingWomensVoices'),
      ],
    },
    {
      title: t('howWeWork'),
      items: [
        t('advancingKnowledge'),
        t('standingWithVictims'),
        t('engagingMechanisms'),
        t('documentingAtrocities'),
        t('upliftingWomensStories'),
        t('buildingAwareness'),
      ],
    },
    {
      title: t('structure'),
      items: [
        t('boardOfAdvisors'),
        t('executiveDirectors'),
        t('committees'),
      ],
      subItems: {
        [t('committees')]: [
          t('financialCommittee'),
          t('communicationsCommittee'),
          t('womenStudiesCommittee'),
          t('persianCultureCommittee'),
          t('educationCommittee'),
        ],
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          {t('organizationName')}
        </Typography>
        
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    {section.title}
                  </Typography>
                  
                  {section.content && (
                    <Typography variant="body1" paragraph>
                      {section.content}
                    </Typography>
                  )}
                  
                  {section.items && (
                    <Box component="ul" sx={{ pl: 2 }}>
                      {section.items.map((item, i) => (
                        <Box key={i}>
                          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                            {item}
                          </Typography>
                          {section.subItems && section.subItems[item] && (
                            <Box component="ul" sx={{ pl: 2 }}>
                              {section.subItems[item].map((subItem, j) => (
                                <Typography key={j} component="li" variant="body2" sx={{ mb: 0.5 }}>
                                  {subItem}
                                </Typography>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 