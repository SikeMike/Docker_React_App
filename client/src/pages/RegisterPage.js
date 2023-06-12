import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/RegisterPage.css';

import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className='register-page'>
      <h1>Bienvenido a Docker Quiz App!</h1>
      <RegisterForm />
      <div className='register-redirectToLog'>
        <p>Ya tienes cuenta?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
