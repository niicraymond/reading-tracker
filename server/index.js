const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: envFile });
const pool = require("./connection");
const login = require("./controllers/authController");
const authenticate = require("./middleware/auth");
const {
  fetchLibrary,
  addToLibrary,
  searchBooks,
  fetchBookList,
  updateBookList,
  removeFromLibrary,
  removeFromBooklist,
  register,
} = require("./controllers/controllers");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/login", login);
app.get("/api/library", authenticate, fetchLibrary);
app.post("/api/library", authenticate, addToLibrary);
app.get("/api/search", searchBooks);
app.get("/api/booklist", authenticate, fetchBookList);
app.post("/api/booklist", authenticate, updateBookList);
app.delete("/api/library/:bookId", authenticate, removeFromLibrary);
app.delete("/api/booklist/:bookId", authenticate, removeFromBooklist);
app.post("/api/auth/register", register);
app.get("/healthz", async (_req, res) => {
  try {
    await pool.query("SELECT 1"); // touches Supabase
    return res.status(200).send("OK");
  } catch (err) {
    console.error("healthz DB check failed:", err.message);
    return res.status(500).send("DB error");
  }
});


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
}

module.exports = app;
