import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AxiosInstance from "../Axios/instance";
import './login.css';

function Login() {
  const { user, login } = useContext(UserContext); // ✅ Get user state from context
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  }, [user, navigate]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await AxiosInstance.post('/', { email, password });
      
      console.log('Login Successful:', response.data);
  
      localStorage.setItem('token', response.data.token);

      const decodedToken = jwtDecode(response.data.token);
      console.log('Decoded Token:', decodedToken);
  
      const data = { userId: decodedToken.userId, role: decodedToken.role };
      console.log(data, "ftg");
  
      login(data); 
  
      if (decodedToken.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary btn-login">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
