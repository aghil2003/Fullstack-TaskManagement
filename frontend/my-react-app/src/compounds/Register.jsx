import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import instance from "../Axios/instance"

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format!');
      return;
    }
  
   
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
  
    try {
      const response = await instance.post("/register", {
        username: formData.userName, 
        email: formData.email, 
        password: formData.password, 
      });
  
      console.log("Registration Successful:", response.data);
  
     
      localStorage.setItem('token', response.data.token);
  
     
      navigate('/user');
    } catch (error) {
      setError(error.response?.data?.message || 'Error registering user');
    }
  };
  
  
  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form id='form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            // required
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // required
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            // required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            // required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-register">Register</button>
        <p className="login-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;

