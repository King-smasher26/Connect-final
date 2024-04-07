import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav">
        <h3>Con<a href="#home">nect</a></h3>
        
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
    
        <ul className={isMenuOpen ? 'show' : ''}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
    </div>
  );
}

export default Header;