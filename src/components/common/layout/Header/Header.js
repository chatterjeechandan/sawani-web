import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for header styles
import LoginPopup from '../../../templates/LoginPopup/LoginPopup';

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setLoginPopupOpen(true);
        setMenuOpen(false);
    };

    const handleCloseLoginPopup = () => {
        setLoginPopupOpen(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                {/* Language change icon */}
                <span className="language-icon">Language</span>
            </div>
            <div className="header-center">
                {/* Logo */}
                <Link to="/" className="logo">
                    Your Logo
                </Link>
            </div>
            <div className="header-right">
                {/* Hamburger menu */}
                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <input
                        type="checkbox"
                        id="menu-toggle"
                        className="menu-toggle"
                        checked={isMenuOpen}
                        onChange={toggleMenu}
                    />
                    <label htmlFor="menu-toggle" className="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <ul className="menu-items">
                        {/* Login and Registration options */}
                        <li>
                            <Link to="/login" onClick={(e) => handleLoginClick(e)}>Login</Link>
                        </li>
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                    </ul>
                </div>
                {/* Cart icon */}
                <Link to="/cart" className="cart-icon">
                    <span className="cart-count">0</span>
                    <i className="fas fa-shopping-cart"></i>
                </Link>
            </div>
            {isLoginPopupOpen && <LoginPopup onClose={handleCloseLoginPopup} />}
        </header>
    );
};

export default Header;