import { useState } from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Library from "./components/Library";
import Booklist from "./components/Booklist";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("search");
  const [mode, setMode] = useState("login");

  const tabs = [
    { key: "search", label: "Search Books" },
    { key: "library", label: "My Library" },
    { key: "booklist", label: "My Bookbag" },
  ];

  function handleLogin(userData) {
    setUser(userData);
  }
  function handleRegister(userData) {
    setUser(userData);
  }
  function toggleMode() {
    setMode((m) => (m === "login" ? "register" : "login"));
  }
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    setMode("login");
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4">
          {mode === "login"
            ? <Login    onLogin={handleLogin} />
            : <Register onRegister={handleRegister} />
          }
          <button
            onClick={toggleMode}
            className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            {mode === "login" ? "Sign Up" : "Back to Log In"}
          </button>
        </div>
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
