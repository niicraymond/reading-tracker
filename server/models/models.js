const pool = require("../connection");

async function getLibrary(userId) {
  const result = await pool.query(
    `SELECT books.*
    FROM books
    JOIN user_library 
        ON books.id = user_library.book_id
    WHERE user_library.user_id = $1`,
    [userId]
  );
  return result.rows;
}

async function addBookToLibrary(userId, bookId) {
  await pool.query(
    `INSERT INTO user_library (user_id, book_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING`,
    [userId, bookId]
  );
}

module.exports = { getLibrary, addBookToLibrary };
