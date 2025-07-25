import { useState, useEffect } from "react";
import api from "../api";

export default function Booklist() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");

  async function handleRemoveFromBooklist(bookId) {
    try {
      await api.delete(`/booklist/${bookId}`);
      setList(list.filter((item) => item.id !== bookId));
    } catch {
      alert("Failed to return to library");
    }
  }

  useEffect(() => {
    async function loadBookList() {
      try {
        const res = await api.get("/booklist");
        setList(res.data);
      } catch {
        setError("Failed to load booklist");
      }
    }
    loadBookList();
  }, []);

  async function handleUpdate(bookId, status = null, rating = null) {
    try {
      await api.post("/booklist", {
        bookId,
        status_tag: status,
        rating,
      });
      const res = await api.get("/booklist");
      setList(res.data);
    } catch {
      alert("Update Failed");
    }
  }

  if (error) {
    return <div>{error}</div>;
  }
  const sorted = [...list].sort((a, b) => {
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
      case "status":
        return (a.status_tag || "").localeCompare(b.status_tag || "");
      case "rating-asc":
        return (a.rating || 0) - (b.rating || 0);
      case "rating-desc":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  if (sorted.length === 0) {
    return <div>Your bookbag is empty.</div>;
  }

  return (
    <div>
      <div className="p-4 mb-4 bg-white rounded-lg shadow-sm flex items-center space-x-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring"
        >
          <option value="">Sort by…</option>
          <option value="title">Title A→Z</option>
          <option value="author">Author A→Z</option>
          <option value="genre">Genre A→Z</option>
          <option value="pages-asc">Pages ↑</option>
          <option value="pages-desc">Pages ↓</option>
          <option value="status">Status A→Z</option>
          <option value="rating-asc">Rating ↑</option>
          <option value="rating-desc">Rating ↓</option>
        </select>
      </div>

      <ul className="space-y-6 p-6">
        {sorted.map((b) => (
          <li
            key={b.id}
            className="flex flex-col bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="mb-4">
              <div className="font-semibold text-xl">{b.title}</div>
              <div className="text-sm text-gray-600">{b.authors.join(", ")}</div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={b.status_tag}
                onChange={(e) => handleUpdate(b.id, e.target.value, b.rating)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              >
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
                <option value="abandoned">Abandoned</option>
              </select>

              <input
                type="number"
                min="1"
                max="5"
                defaultValue={b.rating || ""}
                placeholder="★"
                onBlur={(e) =>
                  handleUpdate(
                    b.id,
                    b.status_tag,
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-20 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2"
              />

              <button
                onClick={() => handleRemoveFromBooklist(b.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2"
              >
                Return
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
