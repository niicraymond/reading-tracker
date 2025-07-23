import { useState, useEffect } from "react";
import api from "../api";

export default function Library() {
    const [books, setBooks] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api.get('/library')
                setBooks(res.data)
            } catch {
                setError('Failed to load library')
            }
        }
        fetchData()
    }, [])

    if (error) return <div>{error}</div>
    if (books.length === 0) return <div>Your library is empty</div>

    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    <div>{book.title}</div>
                    <div>{book.authors.join(', ')}</div>
                    <div>{book.genre}</div>
                </li>
            ))}
        </ul>
    )
}