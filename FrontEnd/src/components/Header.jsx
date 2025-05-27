// src/components/Header.jsx
import React from "react";
import "../Header.css"; // Opcional si usas CSS externo
import logo from '../assets/logo_dtic.png';

const Header = () => {
  return (
    <header className="header">
       <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">Departamento de las Tecnologías y Sistemas de Información y de las Comunicaciones</h1>
      </div>
    </header>
  );
};

export default Header;
