import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"; // Import CSS file for header styles
import LoginPopup from "../../../templates/LoginPopup";
import SignUpPopup from "../../../templates/SignupPopup";
import ForgetPasswordPopup from "../../../templates/ForgetPasswordPopup";
import logo from "../../../../assets/images/logo.png";
import translate from "../../../../assets/images/translate.png";
import { AuthContext } from "../../../../utils/AuthContext";
import Toaster from "../../../../components/common/Toaster/Toaster";
import minus from "../../../../assets/images/minusWhite.png";
import counterPlus from "../../../../assets/images/addCounter.png";
import rewards from "../../../../assets/images/rewardPoint.png";
import cartIcon from "../../../../assets/images/cartIcon.png";
import { CartContext } from "../../../../utils/CartContext";
import {
  updateCartAPI,
  deleteCartAPI,
  getCartAPI,
  addCartAPI,
} from "../../../../api/cart";
import { updateCartOwnerToCartAPI } from "../../../../api/cart";
import Loader from "../../../../components/common/Loader/Loader";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import noUserImage from "../../../../assets/images/no-user.png";
import { getConfig } from "../../../../config/site.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import productInd from "../../../../assets/images/pr1.png";

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
  const [isShowWholePageLoader, setIsShowWholePageLoader] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const SITE_CONFIG = getConfig();

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

    const isProfileRoute = () => {
      const profileRoutes = [
        "/rewards-point",
        "/saved-address",
        "/address-add",
        "/saved-card",
        "/card-add",
        "/favourite-store",
        "/favourite-product",
        "/edit-profile",
      ];
      return profileRoutes.includes(pathname);
    };

    const performLogoutActions = () => {
      logout();
      setIsShowWholePageLoader(false);
      setMenuOpen(false);
      if (isProfileRoute()) {
        navigate("/");
      }
    };

    const storedCartInfo = localStorage.getItem("cartInfo");
    console.log(storedCartInfo);
    if (storedCartInfo) {
      try {
        setIsShowWholePageLoader(true);
        const cartObj = JSON.parse(storedCartInfo);
        const getActualCartResponse = await getCartAPI(cartObj.id);

        if (cartObj.items.length > 0) {
          for (const item of cartObj.items) {
            const existingCartItemIndex =
              getActualCartResponse.data.items.findIndex(
                (innerItem) =>
                  innerItem.productVariantId === item.productVariantId
              );
            if (existingCartItemIndex !== -1) {
              await updateCartAPI(cartObj.id, item);
            } else {
              await addCartAPI(cartObj.id, item);
            }
          }

          for (const item1 of getActualCartResponse.data.items) {
            const existingCartItemIndex1 = cartObj.items.findIndex(
              (innerItem) =>
                innerItem.productVariantId === item1.productVariantId
            );
            if (existingCartItemIndex1 === -1) {
              await deleteCartAPI(cartObj.id, item1);
            }
          }
        } else {
          for (const item1 of getActualCartResponse.data.items) {
            await deleteCartAPI(cartObj.id, item1);
          }
        }

        await updateCartOwnerToCartAPI(cartItems.id);

        setToaster({
          type: "success",
          message: t("Logout successful"),
          duration: 3000,
        });
        updateCartItems(null);
        setTimeout(performLogoutActions, 500);
      } catch (error) {
        console.error("Error updating cart owner:", error);
      }
    } else {
      setToaster({
        type: "success",
        message: t("Logout successful"),
        duration: 3000,
      });
      setTimeout(performLogoutActions, 500);
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
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18next.changeLanguage(savedLang);
    }
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

    return cartItems.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const calculateRewardstotal = () => {
    if (!cartItems || !cartItems.items) return 0;
    return cartItems.items.reduce(
      (acc, item) => acc + item.rewards * item.quantity,
      0
    );
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
    const newCartItems = [...cartItems.items];
    newCartItems.splice(index, 1);
    updateCartItems({ ...cartItems, items: newCartItems });
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

  const changeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    setIsLangMenuOpen(false);
    localStorage.setItem("lang", lang);
    //window.location.reload();
  };

  useEffect(() => {
    const currentLang = i18next.language;
    document.body.classList.remove("lang-en", "lang-ar");
    if (currentLang === "en") {
      document.body.classList.add("lang-en");
    } else if (currentLang === "ar") {
      document.body.classList.add("lang-ar");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18next.language]);

  const selectedDeliveryMode = localStorage.getItem("selectedDeliveryType");

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
      <div className="container">
        <div className="left-icons">
          <div className="icon-wrapper profile">
            {loginResponse && (
              <Link to="/profile" className="profileLink">
                <span className="translateNow cus-img-holder">
                  <img
                    src={
                      loginResponse.avatar
                        ? `${SITE_CONFIG.apiUrl}/${loginResponse.avatar}`
                        : noUserImage
                    }
                    className="profile"
                    alt=""
                  />
                </span>
                <p className="profileNameHeader">{loginResponse.fullname}</p>
              </Link>
            )}
          </div>
          <div className="icon-wrapper menu" ref={langmenuRef}>
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
        <div className="right-icons">
          <div className="icon-wrapper">
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
                  {(Number(selectedDeliveryMode) === 1 ||
                    !selectedDeliveryMode) && (
                    <Link to="/in-store">{t("Order Now")}</Link>
                  )}
                  {Number(selectedDeliveryMode) === 2 && (
                    <Link to="/pickup">{t("Order Now")}</Link>
                  )}
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
          <div className="icon-wrapper">
            {cartItems?.items.length > 0 && (
              <div
                onClick={setCheckoutOpenFn}
                className="cart-icon"
                ref={cartRef}
              >
                <img src={cartIcon} className="carticon" alt="" />
                <span className="cart-count">{getCartCount()}</span>
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
                                      : productInd
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
                                    className="minusCounter"
                                    onClick={() => handleCountChange(index, -1)}
                                  >
                                    <img src={minus} alt="" />
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
                                    className="plusCounter"
                                    onClick={() => handleCountChange(index, 1)}
                                  >
                                    <img src={counterPlus} alt="kolaImg" />
                                  </span>
                                </span>
                              </span>
                              <span
                                className="deleteSpan"
                                onClick={() => deleteCartItemRow(index)}
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="finalCartBills">
                        <div className="subTotal">
                          <span className="totalHeading">{t("Subtotal")}</span>
                          <span className="totalPrice">
                            {calculateSubtotal().toFixed(2)} {t("SAR")}
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
                            +{calculateRewardstotal().toFixed(2)} {t("POINTS")}
                          </span>
                        </div>
                      </div>
                      <div className="grandTotalWraper rewardSectionsWrapers">
                        <span className="grandHeading">{t("TOTAL")}</span>
                        <span className="grandHeading grandPrice">
                          {calculateSubtotal().toFixed(2)} {t("SAR")}
                        </span>
                      </div>
                      <div className="cartBtnWraper">
                        {(Number(selectedDeliveryMode) === 1 ||
                          !selectedDeliveryMode) && (
                          <Link to="/in-store">
                            <button className="pinkBtn">
                              {t("CONTINUE SHOPPING")}
                            </button>
                          </Link>
                        )}
                        {Number(selectedDeliveryMode) === 2 && (
                          <Link to="/pickup">
                            <button className="pinkBtn">
                              {t("CONTINUE SHOPPING")}
                            </button>
                          </Link>
                        )}
                        <Link to="/checkout">
                          <button className="checkBtn">{t("CHECKOUT")}</button>
                        </Link>
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
