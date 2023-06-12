import React from "react"
import { useNavigate } from 'react-router-dom';

import logo from '../images/docker.png';

import '../styles/Navbar.css';

export default function Navbar() {
      
  const usuario = localStorage.getItem('username');

  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.clear();
      navigate('/login');
  };

  return (
      <nav className='nav-navbar'>
          <img src={logo} className="nav-icon" alt="logo" />
          <h3 className="nav-title"> Docker Quiz App - {usuario}</h3>
          <button onClick={handleLogout} className="nav-logout">Cerrar sesion</button>
      </nav>
  );
}
