import React, { useState, useContext, useEffect, useRef, useMemo } from 'react';
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
import cartIcon from "../../../../assets/images/cartIcon.png";
import menuArrow from "../../../../assets/images/checkoutArrow.png";
import deletes from "../../../../assets/images/delete.png";
import { CartContext } from '../../../../utils/CartContext';

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);
    const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
    const [isForgotPasswordPopupOpen, setForgotPasswordPopupOpen] = useState(false);
    const [toaster, setToaster] = useState(null);
    const { loginResponse, logout } = useContext(AuthContext);
    const { cartItems, updateCartItems } = useContext(CartContext);
    const menuRef = useRef(null);
    const cartRef = useRef(null);

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
            updateCartItems(null);
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

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setCheckoutOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const getCartCount = () => {
        if (cartItems && cartItems.items) {
            return cartItems.items.reduce((total, item) => total + item.quantity, 0);
        }
        return 0;
    };

    const calculateSubtotal = () => {
        if (!cartItems || !cartItems.items) return 0;

        return cartItems.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };


    const cartPopupClickHandler = (e) => {
        e.stopPropagation();
    };

    const subtotalPrice = useMemo(() => calculateSubtotal(), [cartItems]);


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
                <div className={`menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
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
                    <ul className="menu-items menuDrop">
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
                <div onClick={setCheckoutOpenFn} className="cart-icon" ref={cartRef}>
                    <img src={cartIcon} className='carticon' alt='' />
                    <span className="cart-count">{getCartCount()}</span>
                    {isCheckoutOpen && getCartCount() > 0 && (
                        <div className='menu-items cartPopup' onClick={cartPopupClickHandler}>
                            <div className="rightCheckoutWraper">
                                <h2 className="checkoutProductHeading">Shopping Cart</h2>
                                <div className="cartProductListings">
                                    {cartItems && cartItems.items && cartItems.items.map((item, index) => (
                                        <div className="individualCartProducts" key={index}>
                                            <span className="productCartImage">
                                                <img src={item.image || productInd} alt="" />
                                            </span>
                                            <span className="midCartDetailsEdit">
                                                <h5 className="indCartProductName">{item.name || 'Vanila Milk'}</h5>
                                                <p className="productPriceInd"><span>{item.price}</span> SAR</p>
                                                <span className="counterWraper checkoutcounters">
                                                    <span className="plusCounter">
                                                        <img src={counterPlus} alt="" />
                                                    </span>
                                                    <span className="counterInput">
                                                        <input type="number" className="inputCounter" value={item.quantity} />
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
                                    ))}
                                </div>

                                <div className="finalCartBills">
                                    <div className="subTotal">
                                        <span className="totalHeading">Subtotal</span>
                                        <span className="totalPrice">{subtotalPrice.toFixed(2)} SAR</span>
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
                                        {subtotalPrice.toFixed(2)} SAR
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