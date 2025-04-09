import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/news/${id}`);
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news detail:", error);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!news) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          {t("news.articleNotFound")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {t(`news.${news._id}.title`, news.title)}
        </Typography>

        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {t("by")} {news.author} • {new Date(news.date).toLocaleDateString()}
          </Typography>
        </Box>

        <Box
          component="img"
          src={news.imageUrl}
          alt={news.title}
          sx={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            borderRadius: 2,
            mb: 4,
          }}
        />

        <Box sx={{ typography: "body1" }}>
          {news.content.map((paragraph, index) => (
            <Typography
              key={index}
              paragraph
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                textAlign: "justify",
              }}
            >
              {t(`news.${news._id}.content.${index}`, paragraph)}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default NewsDetailPage;
