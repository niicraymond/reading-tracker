CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    google_book_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    authors TEXT[] NOT NULL,
    page_count INT, 
    genre TEXT
);

CREATE TABLE IF NOT EXISTS user_library (
    user_id INT NOT NULL REFERENCES users(id),
    book_id INT NOT NULL REFERENCES books(id),
    added_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, book_id)
);

CREATE TABLE IF NOT EXISTS user_booklist (
    user_id INT NOT NULL REFERENCES users(id),
    book_id INT NOT NULL REFERENCES books(id),
    status_tag TEXT,
    rating SMALLINT,
    added_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, book_id)
);