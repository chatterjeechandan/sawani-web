import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for header styles
import LoginPopup from '../../../templates/LoginPopup/LoginPopup';
import logo from "../../../../assets/images/logo.png";
import translate from "../../../../assets/images/translate.png";
import menu from "../../../../assets/images/menu.png";

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


        
        <header className="header headerWrapers">
            <div className="header-left translateWraper">
                {/* Language change icon */}
                <span className="translateNow">
                <img src={translate} alt="" />
                </span>
            </div>
            <div className="header-center logoWrapers">
                {/* Logo */}
                <Link to="/" className="logo">
                <span className="logoHere">
                    <img src={logo} alt="" />
                 </span>
                </Link>
                
            </div>
            <div className="header-right menuWraper">
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
                        <li>
                            <Link to="/category">Order Now</Link>
                        </li>
                        <li>
                            <Link to="/">Sawani Rewards</Link>
                        </li>
                        <li>
                            <Link to="/">About Us</Link>
                        </li>
                        {/* Login and Registration options */}
                        <li className='borderMenu'></li>
                        <li>
                            <Link to="/">Media Coverage</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                        <li className='borderMenu'></li>
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