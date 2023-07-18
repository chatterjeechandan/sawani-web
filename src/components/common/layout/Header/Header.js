import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for header styles
import LoginPopup from '../../../templates/LoginPopup';
import SignUpPopup from '../../../templates/SignupPopup';
import ForgetPasswordPopup from '../../../templates/ForgetPasswordPopup';
import logo from "../../../../assets/images/logo.png";
import translate from "../../../../assets/images/translate.png";
import { AuthContext } from '../../../../utils/AuthContext';
import Toaster from '../../../../components/common/Toaster/Toaster';
import minus from "../../../../assets/images/minusWhite.png";
import productInd from "../../../../assets/images/pr1.png";
import counterPlus from "../../../../assets/images/smallPlus.png";
import rewards from "../../../../assets/images/rewardPoint.png";
import dropimg from "../../../../assets/images/drop.png";
import deletes from "../../../../assets/images/delete.png";

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
    const [isForgotPasswordPopupOpen, setForgotPasswordPopupOpen] = useState(false);
    const [toaster, setToaster] = useState(null);
    const { loginResponse, logout } = useContext(AuthContext);


    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const setCheckoutOpenFn = () => {
        setCheckoutOpen(!isCheckoutOpen);
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

    const handleForgotPasswordClickFromChild = () => {
        setForgotPasswordPopupOpen(true);
    };

    const handleCloseForgotPasswordPopup = () => {
        setForgotPasswordPopupOpen(false);
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
                <div onClick={setCheckoutOpenFn} className="cart-icon">
                    <span className="cart-count">0</span>
                    <i className="fas fa-shopping-cart"></i>
                    {isCheckoutOpen && (
                        <div className='menu-items cartPopup'>
<div className="rightCheckoutWraper">
                   <h2 className="checkoutProductHeading">Shopping Cart</h2>
                   <div className="cartProductListings">
                        <div className="individualCartProducts">
                            <span className="productCartImage">
                                <img src={productInd} alt="" />
                            </span>
                            <span className="midCartDetailsEdit">
                                <h5 className="indCartProductName">Vanila Milk</h5>
                                <p className="productPriceInd"><span>250</span> SAR</p>
                                <span className="counterWraper checkoutcounters">
                                    <span className="plusCounter">
                                        <img src={counterPlus} alt="" />
                                    </span>
                                    <span className="counterInput">
                                        <input type="number" className="inputCounter" value={1} />
                                    </span>
                                    <span className="minusCounter">
                                        <img src={minus} alt="" />
                                    </span>
                                </span>
                            </span>
                            <span className="deleteSpan">
                                <img src={deletes} alt="" />
                            </span>
                        </div>
                   </div>
                   
                    <div className="finalCartBills">
                        <div className="subTotal">
                            <span className="totalHeading">Subtotal</span>
                            <span className="totalPrice">250.00 SAR</span>
                        </div>
                        <div className="rewardSectionsWrapers">
                            <span className="totalHeading points">POINTS  <span className="subPoints">Sign in to earn</span></span>
                            <span className="totalPrice points">
                                <span className="rewardsIconImg">
                                    <img src={rewards} alt="" />
                                </span>
                                +50 points</span>
                        </div>
                    </div>
                    <div className="grandTotalWraper rewardSectionsWrapers">
                        <span className="grandHeading">
                            TOTAL
                        </span>
                        <span className="grandHeading grandPrice">
                            250.00 SAR
                        </span>
                    </div>
                    <div className="cartBtnWraper">
                        <button className='pinkBtn'>CONTINUE SHOPPING</button>
                        <button className='checkBtn'><Link to="/checkout">CHECKOUT</Link></button>
                    </div>
                </div>
                        </div>
                    )}
                </div>
            </div>
            {isLoginPopupOpen && <LoginPopup onClose={handleCloseLoginPopup} onOpenSignup={handleSignupClickFromChild} onOpenForgotPassword={handleForgotPasswordClickFromChild} />}
            {isSignupPopupOpen && <SignUpPopup onClose={handleCloseSignupPopup} onOpenLogin={handleLoginClickFromChild} />}
            {isForgotPasswordPopupOpen && <ForgetPasswordPopup onClose={handleCloseForgotPasswordPopup} onOpenLogin={handleLoginClickFromChild} />}

        </header>
    );
};

export default Header;