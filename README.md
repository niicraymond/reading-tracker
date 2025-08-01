# Reading Tracker

Demo: https://reading-tracker-app.netlify.app/

## Overview
React + Vite frontend for tracking books: search, add to a personal library, move to a Bookbag, return books, and basic authentication via JWT.

## Features
- Search for books  
- Add books to your library  
- Move books to a Bookbag/booklist  
- Return/remove books from the Bookbag  
- View library and bookbag contents  
- User registration/login with JWT  
- Session persistence via token in `localStorage`  
- Basic loading indicators and error handling  

## Technologies Used
- React (with hooks)  
- Vite  
- Tailwind CSS  
- axios  
- JWT authentication  

## Setup Instructions
```bash
git clone https://github.com/niicraymond/reading-tracker
cd client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_API_BASE_URL=https://reading-tracker-tybd.onrender.com
```
(defaults to `http://localhost:9090` if unset)

Start development:
```bash
npm run dev
```

Open in browser at the address Vite reports

## Scripts
- `npm run dev` – start development server  
- `npm run build` – production build  
- `npm run preview` – preview production build  
- `npm run lint` – run ESLint  

## API Reference
All requests (except login/register) include the JWT in the `Authorization: Bearer <token>` header.

- `POST /api/auth/login` – login, returns `{ token, user }`  
- `POST /api/auth/register` – register new user  
- `GET /api/search?q=...` – search books  
- `POST /api/library` – add a book to the library  
- `DELETE /api/library/{id}` – remove a book from the library  
- `POST /api/booklist` – move a book into the Bookbag  
- `DELETE /api/booklist/{id}` – return/remove a book from the Bookbag  


Developed by Nicole Raymond
