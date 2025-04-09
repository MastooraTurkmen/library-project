import { Container, Typography, Paper, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {t("about.title", "About Sindokht")}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography paragraph>
            {t(
              "about.description1",
              "Sindokht is a digital platform dedicated to preserving and promoting Persian literature and culture. Our mission is to make Persian literature accessible to readers worldwide while supporting contemporary authors and cultural initiatives."
            )}
          </Typography>

          <Typography paragraph>
            {t(
              "about.description2",
              "We provide a curated collection of both classic and contemporary Persian literature, along with news and updates about literary events, new publications, and cultural developments in the Persian-speaking world."
            )}
          </Typography>

          <Typography paragraph>
            {t(
              "about.description3",
              "Our platform serves as a bridge between traditional Persian literary heritage and modern digital accessibility, ensuring that these valuable cultural resources are preserved and shared with future generations."
            )}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
