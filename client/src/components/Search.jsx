import {useState} from 'react'
import api from '../api'

export default function Search() {
    const [q, setQ] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState('')

    async function handleSearch(e) {
        e.preventDefault()
        if (!q) return;
        try {
            const res = await api.get('/search', {params: {q}})
            setResults(res.data)
            setError('')
        } catch {
            setError('Search failed')
        }
    }

    async function handleAdd(book) {
        try {
            await api.post('/library', {bookId: book.id})
            alert(`Added "${book.title}"`)
        } catch {
            alert ('Add failed')
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search books..."
                />
                <button type="submit">
                    Search
                </button>
            </form>
            {error && <div>{error}</div>}
            <ul>
                {results.map(book => (
                    <li key={book.google_book_id}>
                        <div>{book.title}</div>
                        <div>{book.authors.join(', ')}</div>
                        <button onClick={() => handleAdd(book)}>
                            Add to Library
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}