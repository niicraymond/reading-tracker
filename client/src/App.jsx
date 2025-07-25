import { useState } from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Library from "./components/Library";
import Booklist from "./components/Booklist";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("search");

  const tabs = [
    { key: "search",   label: "Search Books" },
    { key: "library",  label: "My Library" },
    { key: "booklist", label: "My Bookbag" },
  ];

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1>Log In</h1>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {" "}
      <nav className="fixed top-0 left-0 w-full bg-black p-4 flex items-center justify-between z-10">
        <div className="flex space-x-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setView(t.key)}
              className="px-3 py-1 bg-green-200 rounded hover:bg-yellow-400"
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-400 text-black rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
      <header className="text-black font-bold text-4xl mb-4 text-center">
        <h1>Welcome, {user.name}</h1>
      </header>
      <div className="bg-yellow-100 p-8 rounded-lg max-w-lg w-full">
        <main>
          {view === "search" && <Search />}
          {view === "library" && <Library />}
          {view === "booklist" && <Booklist />}
        </main>
      </div>
    </div>
  );
}

export default App;
