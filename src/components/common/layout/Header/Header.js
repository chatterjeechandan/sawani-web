import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for header styles
import LoginPopup from '../../../templates/LoginPopup/LoginPopup';
import SignUpPopup from '../../../templates/SignupPopup/SignupPopup';
import logo from "../../../../assets/images/logo.png";
import translate from "../../../../assets/images/translate.png";
import { AuthContext } from '../../../../utils/AuthContext';
import Toaster from '../../../../components/common/Toaster/Toaster';

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
    const [toaster, setToaster] = useState(null);
    const { loginResponse, logout } = useContext(AuthContext);


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

    const handleSignupClick = (e) => {
        e.preventDefault();
        setSignupPopupOpen(true);
        setMenuOpen(false);
    };

    const handleCloseSignupPopup = () => {
        setSignupPopupOpen(false);
    };

    const handleLogOutClick = (e) => {
        e.preventDefault();
        setToaster({ type: 'success', message: 'Logout successful', duration: 3000 });
        setTimeout(() => {
            logout();
            setMenuOpen(false);
        }, 500);
    };

    const handleToasterClose = () => {
        setToaster(null);
    };

    const handleSignupClickFromChild = () => {
        setSignupPopupOpen(true);
    };

    const handleLoginClickFromChild = () => {
        setLoginPopupOpen(true);
    };

    return (
        <header className="header headerWrapers">
            {toaster && (
                <Toaster
                    type={toaster.type}
                    message={toaster.message}
                    duration={toaster.duration}
                    onClose={handleToasterClose}
                />
            )}
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
                        {loginResponse ? (
                            <li>
                                <Link to="/logout" onClick={(e) => handleLogOutClick(e)}>Logout</Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" onClick={(e) => handleLoginClick(e)}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" onClick={(e) => handleSignupClick(e)}>Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                {/* Cart icon */}
                <Link to="/cart" className="cart-icon">
                    <span className="cart-count">0</span>
                    <i className="fas fa-shopping-cart"></i>
                </Link>
            </div>
            {isLoginPopupOpen && <LoginPopup onClose={handleCloseLoginPopup} onOpenSignup={handleSignupClickFromChild} />}
            {isSignupPopupOpen && <SignUpPopup onClose={handleCloseSignupPopup} onOpenLogin={handleLoginClickFromChild} />}
        </header>
    );
};

export default Header;