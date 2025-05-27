import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false); // Cierra el sidebar

    return (
        <>
            <button className="toggle-btn" onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/estudiantes" onClick={handleLinkClick}>Estudiantes</Link></li>
                    <li><Link to="/salas" onClick={handleLinkClick}>Salas</Link></li>
                    <li><Link to="/prestamos" onClick={handleLinkClick}>Préstamos</Link></li>
                    <li><Link to="/reportes" onClick={handleLinkClick}>Reportes</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
