import { useState } from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Library from "./components/Library";
import Booklist from "./components/Booklist";
import "./App.css";

function App() {
  const [user, setUser] = useState(null)
  // const [user, setUser] = useState({ id: 2, name: "Test User" });
  const [view, setView] = useState("search");

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  if (!user) {
    return (
      <div>
        <h1>Log In</h1>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Welcome, {user.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <nav>
        {["search", "library", "booklist"].map((v) => (
          <button key={v} onClick={() => setView(v)}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </nav>
      <main>
        {view === "search" && <Search />}
        {view === "library" && <Library />}
        {view === "booklist" && <Booklist />}
      </main>
    </div>
  );
}

export default App;
