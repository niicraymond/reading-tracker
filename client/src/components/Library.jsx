import { useState, useEffect } from "react";
import api from "../api";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState("");

  async function handleRemoveFromLibrary(bookId) {
    try {
      await api.delete(`/library/${bookId}`);
      setBooks(books.filter((b) => b.id !== bookId));
    } catch {
      alert("Remove from library failed");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/library");
        setBooks(res.data);
      } catch {
        setError("Failed to load library");
      }
    }
    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (books.length === 0) return <div>Your library is empty</div>;

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQ.toLowerCase()) ||
      b.authors.join(" ").toLowerCase().includes(searchQ.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return (a.authors[0] || "").localeCompare(b.authors[0] || "");
      case "genre":
        return (a.genre || "").localeCompare(b.genre || "");
      case "pages-asc":
        return (a.page_count || 0) - (b.page_count || 0);
      case "pages-desc":
        return (b.page_count || 0) - (a.page_count || 0);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search library…"
          className="w-full p-2 border rounded mb-4"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort by…</option>
          <option value="title">Title A→Z</option>
          <option value="author">Author A→Z</option>
          <option value="genre">Genre A→Z</option>
          <option value="pages-asc">Pages ↑</option>
          <option value="pages-desc">Pages ↓</option>
        </select>
      </div>
      <ul className="space-y-6 p-4">
        {sorted.map((book) => (
          <li
            key={book.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col"
          >
            <h2 className="font-semibold text-lg mb-1">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {book.authors.join(", ")}
            </p>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Genre: {book.genre || "—"}</span>
              <span>Pages: {book.page_count || "—"}</span>
            </div>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() =>
                  api
                    .post("/booklist", {
                      bookId: book.id,
                      status_tag: "reading",
                      rating: null,
                    })
                    .then(() =>
                      alert(`"${book.title}" added to Bookbag`)
                    )
                    .catch(() =>
                      alert("Add to Bookbag failed")
                    )
                }
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Bookbag
              </button>
              <button
                onClick={() => handleRemoveFromLibrary(book.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
