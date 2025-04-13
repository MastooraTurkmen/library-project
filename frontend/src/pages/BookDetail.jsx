import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readDialogOpen, setReadDialogOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Book not found");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Error loading book details");
        setSnackbarMessage("Error loading book details");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBack = () => {
    navigate("/books");
  };

  const handleReadBook = () => {
    if (!book?.readUrl) {
      setSnackbarMessage("PDF file not available");
      setSnackbarOpen(true);
      return;
    }
    setReadDialogOpen(true);
  };

  const handleCloseReadDialog = () => {
    setReadDialogOpen(false);
  };

  const handleDownload = async () => {
    if (!book?.downloadUrl) {
      setSnackbarMessage("PDF file not available");
      setSnackbarOpen(true);
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}/download`);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${book.title[currentLang]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading book:", error);
      setSnackbarMessage("Error downloading book");
      setSnackbarOpen(true);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error || "Book not found"}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            component="button"
            onClick={() => navigate("/")}
            sx={{ textDecoration: "none" }}
          >
            {t("home")}
          </Link>
          <Link
            color="inherit"
            component="button"
            onClick={() => navigate("/books")}
            sx={{ textDecoration: "none" }}
          >
            {t("books")}
          </Link>
          <Typography color="text.primary">
            {book.title[currentLang]}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={`http://localhost:5000${book.imageUrl}`}
              alt={book.title[currentLang]}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "600px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {book.title[currentLang]}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t("author")}
              </Typography>
              <Typography variant="h5">{book.author[currentLang]}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t("category")}
              </Typography>
              <Typography variant="h5">{book.category[currentLang]}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t("publishYear")}
              </Typography>
              <Typography variant="h5">{book.publishYear}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t("pages")}
              </Typography>
              <Typography variant="h5">{book.pages}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t("description")}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {book.description[currentLang]}
              </Typography>
            </Box>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MenuBookIcon />}
                onClick={handleReadBook}
                size="large"
                disabled={!book.readUrl}
              >
                {t("readBook")}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                disabled={downloading || !book.downloadUrl}
                size="large"
              >
                {downloading ? t("downloadingBook") : t("downloadBook")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog fullScreen open={readDialogOpen} onClose={handleCloseReadDialog}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">{book.title[currentLang]}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseReadDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {book.readUrl && (
            <iframe
              src={`http://localhost:5000/api/books/${id}/read`}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title={book.title[currentLang]}
            />
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default BookDetail;
