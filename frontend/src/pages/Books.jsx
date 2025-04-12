import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import InfiniteScroll from "react-infinite-scroll-component";

const Books = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const currentLang = i18n.language;

  const fetchBooks = async (resetPage = false) => {
    try {
      const currentPage = resetPage ? 0 : page;
      const response = await fetch(
        `http://localhost:5000/api/books?page=${currentPage}&limit=12&search=${search}&lang=${currentLang}`
      );
      const data = await response.json();

      if (data.books.length === 0 && currentPage === 0) {
        setBooks([]);
        setHasMore(false);
        return;
      }

      if (currentPage === 0) {
        setBooks(data.books);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...data.books]);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        setPage(0);
        fetchBooks(true);
      }, 500)
    );

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [search, currentLang]);

  useEffect(() => {
    if (page > 0) {
      fetchBooks();
    }
  }, [page]);

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  if (loading && page === 0) {
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        {t("books")}
      </Typography>

      <Box sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t("searchBooks")}
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} edge="end" size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {books.length === 0 && !loading ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          {t("noBooksFound")}
        </Typography>
      ) : (
        <InfiniteScroll
          dataLength={books.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          }
          endMessage={
            <Typography align="center" sx={{ my: 2 }}>
              {t("noMoreBooks")}
            </Typography>
          }
        >
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                  onClick={() => handleBookClick(book._id)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={book.imageUrl}
                    alt={book.title[currentLang]}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "3em"
                      }}
                    >
                      {book.title[currentLang]}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {t("author")}: {book.author[currentLang]}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {t("category")}: {book.category[currentLang]}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {t("publishYear")}: {book.publishYear}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default Books;
