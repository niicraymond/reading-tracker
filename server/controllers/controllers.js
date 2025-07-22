const {getLibrary, addBookToLibrary} = require("../models/models");

async function fetchLibrary(req, res) {
  const userId = req.userId;
  const books = await getLibrary(userId);
  res.json(books);
}

async function addToLibrary(req, res) {
  const userId = req.userId
  const {bookId} = req.body
  if (!bookId) return res.status(400).json({error: 'BookId required'})
  await addBookToLibrary(userId, bookId)
  res.status(201).json({message: 'Book added'})
}

module.exports = {fetchLibrary, addToLibrary};
