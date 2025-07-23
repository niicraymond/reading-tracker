require("dotenv").config();
const express = require("express");
const cors = require("cors");
const login = require("./controllers/authController");
const authenticate = require("./middleware/auth");
const {
  fetchLibrary,
  addToLibrary,
  searchBooks,
  fetchBookList,
  updateBookList
} = require("./controllers/controllers");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/login", login);
app.get("/api/library", authenticate, fetchLibrary);
app.post("/api/library", authenticate, addToLibrary);
app.get("/api/search", searchBooks);
app.get('/api/booklist', authenticate, fetchBookList)
app.post('/api/booklist', authenticate, updateBookList)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
