const {
  getLibrary,
  addBookToLibrary,
  searchGoogleBooks,
} = require("../models/models");

async function fetchLibrary(req, res) {
  const userId = req.userId;
  const books = await getLibrary(userId);
  res.json(books);
}

async function addToLibrary(req, res) {
  const userId = req.userId;
  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ error: "BookId required" });
  await addBookToLibrary(userId, bookId);
  res.status(201).json({ message: "Book added" });
}

async function searchBooks(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Query param q required" });
  const items = await searchGoogleBooks(q);
  const books = items.map((i) => ({
    google_book_id: i.id,
    title: i.volumeInfo.title,
    authors: i.volumeInfo.authors || [],
    page_count: i.volumeInfo.pageCount || null,
    genre: i.volumeInfo.categories ? i.volumeInfo.categories[0] : null,
  }));
  res.json(books);
}
module.exports = { fetchLibrary, addToLibrary, searchBooks };
