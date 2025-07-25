const {
  getLibrary,
  addBookToLibrary,
  searchGoogleBooks,
  getBookList,
  upsertBookListEntry,
  removeBookFromLibrary,
  removeBookFromBooklist,
} = require("../models/models");

async function fetchLibrary(req, res) {
  const userId = req.userId;
  const books = await getLibrary(userId);
  res.json(books);
}

async function addToLibrary(req, res) {
  const userId = req.userId;
  const { google_book_id, title, authors, page_count, genre } = req.body;
  if (!google_book_id)
    return res.status(400).json({ error: "Book data required" });
  await addBookToLibrary(
    userId,
    google_book_id,
    title,
    authors,
    page_count,
    genre
  );
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

async function fetchBookList(req, res) {
  const userId = req.userId;
  const list = await getBookList(userId);
  res.json(list);
}

async function updateBookList(req, res) {
  const userId = req.userId;
  const { bookId, status_tag, rating } = req.body;
  if (!bookId) {
    return res
      .status(400)
      .json({ error: "bookId, status_tag and rating required" });
  }

  await upsertBookListEntry(userId, bookId, status_tag, rating);

  await removeBookFromLibrary(userId, bookId);

  res
    .status(200)
    .json({ message: "Book moved to Booklist and removed from Library" });
}

async function removeFromBooklist(req, res) {
  const userId = req.userId;
  const { bookId } = req.params;
  await removeBookFromBooklist(userId, bookId);
  res.json({ message: "Book removed from booklist" });
}

async function removeFromLibrary(req, res) {
  const userId = req.userId;
  const { bookId } = req.params;
  await removeBookFromLibrary(userId, bookId);
  res.json({ message: "Book removed" });
}
module.exports = {
  fetchLibrary,
  addToLibrary,
  searchBooks,
  fetchBookList,
  updateBookList,
  removeFromLibrary,
  removeFromBooklist,
};
