import { useState } from 'react'
import Login from './components/Login'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  function handleLogin(userData){
    setUser(userData)
  }

  function handleLogout(){
    localStorage.removeItem('token');
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin}/>
  }

  return (
      <div>
        <header>
          <h1>Welcome, {user.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </header>
        <main>
          <p>more stuff goes here</p>
        </main>
      </div>
  )
}

export default App
