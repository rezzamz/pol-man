import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform authentication logic here
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');  // Changed from history.push to navigate
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container"> 
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;