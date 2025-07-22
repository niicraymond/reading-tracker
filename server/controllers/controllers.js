const getLibrary = require("../models/models");

async function fetchLibrary(req, res) {
  const userId = req.userId;
  const books = await getLibrary(userId);
  res.json(books);
}

module.exports = fetchLibrary;
