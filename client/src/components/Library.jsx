import { useState, useEffect } from "react";
import api from "../api";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <li
          key={book.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="font-semibold text-lg mb-1">{book.title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {book.authors.join(", ")}
          </p>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Genre: {book.genre || "—"}</span>
            <span>Pages: {book.page_count || "—"}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
