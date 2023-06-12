import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Por favor, introduce Username y Password');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name: username,
        password: password
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('userID', data.userID);
        navigate('/');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className='register-form'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <button type="submit" className='register-button'>Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
