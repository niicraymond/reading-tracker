import { useState } from "react";
import api from "../api";

export default function Register({ onRegister }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      onRegister(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && <div className="text-red-600">{error}</div>}
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
        Sign Up
      </button>
    </form>
  );
}
