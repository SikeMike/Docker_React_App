import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/LoginPage.css';

import LoginForm from '../components/LoginForm';


const LoginPage = () => {

  return (
    <div className='login-page'>
      <h1>Bienvenido a Docker Quiz App!</h1>
      <LoginForm />
      <div className='login-redirectToReg'>
        <p>No tienes cuenta?</p>
        <Link to='/register'>Registrar cuenta</Link>
      </div>
    </div>
  );
};

export default LoginPage;
