import { useState } from "react";
import api from "../api";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!q) return;
    try {
      const res = await api.get("/search", { params: { q } });
      setResults(res.data);
      setError("");
    } catch {
      setError("Search failed");
    }
  }

  async function handleAdd(book) {
    try {
      await api.post("/library", { bookId: book.id });
      alert(`Added "${book.title}"`);
    } catch {
      alert("Add failed");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-between w-full mb-4"
      >
        <input
          className="flex-1 p-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search books..."
        />
        <button
          type="submit"
          className="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
        >
          Search
        </button>
      </form>
      {error && <div>{error}</div>}
      <ul className="space-y-2">
        {results.map((book) => (
          <li
            key={book.google_book_id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <div className="font-semibold">{book.title}</div>
              <div className="text-sm text-gray-600">{book.authors.join(", ")}</div>
            </div>
            <button
              onClick={() => handleAdd(book)}
              className="px-2 py-1 text-sm bg-yellow-300 rounded hover:bg-yellow-400"
            >
              Add to Library
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
