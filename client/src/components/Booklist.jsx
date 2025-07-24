import { useState, useEffect } from "react";
import api from "../api";

export default function Booklist() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

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

  if (list.length === 0) {
    return <div>Your booklist is empty.</div>;
  }

  return (
    <ul>
      {list.map((b) => (
        <li key={b.id}>
          <div>{b.title}</div>
          <div>{b.authors.join(", ")}</div>
          <div>
            <select
              value={b.status_tag}
              onChange={(e) => handleUpdate(b.id, e.target.value, b.rating)}
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
              placeholder="Rating 1-"
              onBlur={(e) =>
                handleUpdate(
                  b.id,
                  b.status_tag,
                  e.target.value ? Number(e.target.value) : null
                )
              }
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
