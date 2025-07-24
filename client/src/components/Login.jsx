import { useState } from "react";
import api from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm flex flex-col gap-4">
        {error && <div className="text-red-600 text-center">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Log In</button>
    </form>
    </div>
  );
}
