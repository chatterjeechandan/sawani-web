import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import CSS file for header styles
import LoginPopup from "../../../templates/LoginPopup";
import SignUpPopup from "../../../templates/SignupPopup";
import ForgetPasswordPopup from "../../../templates/ForgetPasswordPopup";
import logo from "../../../../assets/images/logo.png";
import profile from "../../../../assets/images/profile.png";
import translate from "../../../../assets/images/translate.png";
import { AuthContext } from "../../../../utils/AuthContext";
import Toaster from "../../../../components/common/Toaster/Toaster";
import minus from "../../../../assets/images/minusWhite.png";
import counterPlus from "../../../../assets/images/smallPlus.png";
import rewards from "../../../../assets/images/rewardPoint.png";
import cartIcon from "../../../../assets/images/cartIcon.png";
import deletes from "../../../../assets/images/delete.png";
import { CartContext } from "../../../../utils/CartContext";
import placeholderImage from "../../../../assets/images/no-image.png";
import { updateCartAPI, deleteCartAPI, getCartAPI } from "../../../../api/cart";
import { updateCartOwnerToCartAPI } from "../../../../api/cart";
import Loader from "../../../../components/common/Loader/Loader";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import noUserImage from "../../../../assets/images/no-user.png";

const Header = forwardRef((props, ref) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
  const [isForgotPasswordPopupOpen, setForgotPasswordPopupOpen] =
    useState(false);
  const [toaster, setToaster] = useState(null);
  const { loginResponse, logout } = useContext(AuthContext);
  const { cartItems, updateCartItems } = useContext(CartContext);
  const menuRef = useRef(null);
  const langmenuRef = useRef(null);
  const cartRef = useRef(null);
  const [cartinlineloader, setCartinlineloader] = useState(false);
  const [isShowWholePageLoader, setIsShowWholePageLoader] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
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

  const handleLogOutClick = async (e) => {
    e.preventDefault();
    if (cartItems) {
      try {
        setIsShowWholePageLoader(true);
        const response_new = await updateCartOwnerToCartAPI(cartItems.id);
        if (response_new.succeeded) {
          setToaster({
            type: "success",
            message: t("Logout successful"),
            duration: 3000,
          });
          updateCartItems(null);
          setTimeout(() => {
            logout();
            setIsShowWholePageLoader(false);
            setMenuOpen(false);
          }, 500);
        }
      } catch (error) {
        console.error("Error updating cart owner:", error);
      }
    } else {
      setToaster({
        type: "success",
        message: t("Logout successful"),
        duration: 3000,
      });
      setTimeout(() => {
        logout();
        setMenuOpen(false);
      }, 500);
    }
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
    if (langmenuRef.current && !langmenuRef.current.contains(event.target)) {
      setIsLangMenuOpen(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCheckoutOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
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

    const toalatPrice = cartItems.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return toalatPrice.toFixed(2);
  };

  const cartPopupClickHandler = (e) => {
    e.stopPropagation();
  };

  const handleCountChange = (index, count) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems.items[index].quantity += count;
    if (updatedCartItems.items[index].quantity >= 0) {
      if (updatedCartItems.items[index].quantity === 0) {
        updatedCartItems.items[index].quantity = 1;
        updatedCartItems.items[index].price = 1;
        deleteCartItem(updatedCartItems, updatedCartItems.items[index], index);
      } else {
        updateCartItem(updatedCartItems, index);
      }
    }
  };

  const deleteCartItemRow = (index) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems.items[index].quantity = 1;
    updatedCartItems.items[index].price = 1;
    deleteCartItem(updatedCartItems, updatedCartItems.items[index], index);
  };

  const deleteCartItem = async (cartItems, updatedCartItems, index) => {
    cartItems.items.splice(index, 1);
    updateCartItems(cartItems);
    const response = await deleteCartAPI(cartItems.id, updatedCartItems);
    if (response.succeeded) {
      updateCartItems(cartItems);
    }
  };

  const updateCartItem = async (cartItems, index) => {
    updateCartItems(cartItems);
    const response = await updateCartAPI(cartItems.id, cartItems.items[index]);
    if (response.succeeded) {
      updateCartItems(cartItems);
    }
  };

  useImperativeHandle(ref, () => ({
    loginClickedCheckout(e) {
      handleLoginClick(e);
    },
    async openCartPopup(e) {
      setCheckoutOpen(true);
    },
  }));

  const handleError = (errorMessage) => {
    setToaster({ type: "error", message: errorMessage, duration: 3000 });
  };

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const currentLang = i18next.language;
    document.body.classList.remove("lang-en", "lang-ar");
    if (currentLang === "en") {
      document.body.classList.add("lang-en");
    } else if (currentLang === "ar") {
      document.body.classList.add("lang-ar");
    }
  }, [i18next.language]);

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
      <div class="container">
        <div class="left-icons">
          <div class="icon-wrapper profile">
            {loginResponse && (
              <Link to="/profile" className="profileLink">
                <span className="translateNow cus-img-holder">
                  <img
                    src={
                      loginResponse.avatar
                        ? `data:image/png;base64,${loginResponse.avatar}`
                        : noUserImage
                    }
                    className="profile"
                    alt=""
                  />
                </span>
                <p className="profileNameHeader">{loginResponse.name}</p>
              </Link>
            )}
          </div>
          <div class="icon-wrapper" ref={langmenuRef}>
            <span className="translateNow">
              <img src={translate} alt="" onClick={toggleLangMenu} />
            </span>
            <ul
              className={`menu-items translation menuDrop ${
                isLangMenuOpen ? "open" : ""
              }`}
            >
              <li onClick={() => changeLanguage("en")}>{t("English")}</li>
              <li onClick={() => changeLanguage("ar")}>{t("Arabic")}</li>
            </ul>
          </div>
        </div>
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
        <div class="right-icons">
          <div class="icon-wrapper">
            <div className={`menu ${isMenuOpen ? "open" : ""}`} ref={menuRef}>
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
              <ul className="menu-items detail menuDrop">
                <li>
                  <Link to="/in-store">{t("Order Now")}</Link>
                </li>
                <li>
                  <Link to="/contact-us">{t("Contact Us")}</Link>
                </li>
                <li className="borderMenu"></li>
                {loginResponse ? (
                  <li>
                    <Link to="/logout" onClick={(e) => handleLogOutClick(e)}>
                      {t("Logout")}
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={(e) => handleLoginClick(e)}>
                        {t("Login")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" onClick={(e) => handleSignupClick(e)}>
                        {t("Sign Up")}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div class="icon-wrapper">
            {getCartCount() > 0 && (
              <div
                onClick={setCheckoutOpenFn}
                className="cart-icon"
                ref={cartRef}
              >
                <img src={cartIcon} className="carticon" alt="" />
                <span className="cart-count">
                  {cartinlineloader ? (
                    <Loader
                      showOverlay={false}
                      size={12}
                      color="#000"
                      isLoading={false}
                    />
                  ) : (
                    getCartCount()
                  )}
                </span>
                {isCheckoutOpen && (
                  <div
                    className="menu-items cartPopup"
                    onClick={cartPopupClickHandler}
                  >
                    <div className="rightCheckoutWraper">
                      <h2 className="checkoutProductHeading">
                        {t("Shopping Cart")}
                      </h2>
                      <div className="cartProductListings">
                        {cartItems &&
                          cartItems.items &&
                          cartItems.items.map((item, index) => (
                            <div className="individualCartProducts" key={index}>
                              <span className="productCartImage">
                                <img
                                  src={
                                    item?.image
                                      ? `data:image/png;base64,${item.image}`
                                      : placeholderImage
                                  }
                                  alt=""
                                />
                              </span>
                              <span className="midCartDetailsEdit">
                                <h5 className="indCartProductName">
                                  {item.name}
                                </h5>
                                <p className="productPriceInd">
                                  <span>{item.price}</span> {t("SAR")}
                                </p>
                                <span className="counterWraper checkoutcounters">
                                  <span
                                    className="plusCounter"
                                    onClick={() => handleCountChange(index, 1)}
                                  >
                                    <img src={counterPlus} alt="" />
                                  </span>
                                  <span className="counterInput">
                                    <input
                                      type="number"
                                      className="inputCounter"
                                      value={item.quantity}
                                      readOnly
                                    />
                                  </span>
                                  <span
                                    className="minusCounter"
                                    onClick={() => handleCountChange(index, -1)}
                                  >
                                    <img src={minus} alt="" />
                                  </span>
                                </span>
                              </span>
                              <span
                                className="deleteSpan"
                                onClick={() => deleteCartItemRow(index)}
                              >
                                <img src={deletes} alt="" />
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="finalCartBills">
                        <div className="subTotal">
                          <span className="totalHeading">{t("Subtotal")}</span>
                          <span className="totalPrice">
                            {calculateSubtotal()} {t("SAR")}
                          </span>
                        </div>
                        <div className="rewardSectionsWrapers">
                          <span className="totalHeading points">
                            {t("POINTS")}
                            {!loginResponse ? (
                              <span
                                className="subPoints"
                                onClick={(e) => handleLoginClick(e)}
                              >
                                {t("Sign in to earn")}
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                          <span className="totalPrice points">
                            <span className="rewardsIconImg">
                              <img src={rewards} alt="" />
                            </span>
                            +50 {t("POINTS")}
                          </span>
                        </div>
                      </div>
                      <div className="grandTotalWraper rewardSectionsWrapers">
                        <span className="grandHeading">{t("TOTAL")}</span>
                        <span className="grandHeading grandPrice">
                          {calculateSubtotal()} {t("SAR")}
                        </span>
                      </div>
                      <div className="cartBtnWraper">
                        <button className="pinkBtn">
                          <Link to="/category">{t("CONTINUE SHOPPING")}</Link>
                        </button>
                        <button className="checkBtn">
                          <Link to="/checkout">{t("CHECKOUT")}</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoginPopupOpen && (
        <LoginPopup
          onClose={handleCloseLoginPopup}
          onOpenSignup={handleSignupClickFromChild}
          onOpenForgotPassword={handleForgotPasswordClickFromChild}
        />
      )}
      {isSignupPopupOpen && (
        <SignUpPopup
          onClose={handleCloseSignupPopup}
          onOpenLogin={handleLoginClickFromChild}
        />
      )}
      {isForgotPasswordPopupOpen && (
        <ForgetPasswordPopup
          onClose={handleCloseForgotPasswordPopup}
          onOpenLogin={handleLoginClickFromChild}
        />
      )}
      {isShowWholePageLoader && (
        <Loader showOverlay={true} size={30} color="#fff" isLoading={false} />
      )}
    </header>
  );
});

export default Header;
