import React, { useState, useContext } from "react";
import "../../assets/css/forms.css";
import { login } from "../../api/auth";
import Loader from "../common/Loader/Loader";
import Toaster from "../common/Toaster/Toaster";
import login1 from "../../assets/images/loginG.png";
import login2 from "../../assets/images/loginApple.png";
import login3 from "../../assets/images/loginPhone.png";
import { AuthContext } from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../utils/CartContext";
import { getActiveCart, updateCartOwnerToCartAPI } from "../../api/cart";
import { updateCartAPI, addCartAPI } from "../../api/cart";
import { getSessionCusertomerDetails } from "../../api/customer";
import { useTranslation } from "react-i18next";

const LoginPopup = ({ onClose, onOpenSignup, onOpenForgotPassword }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginFormState, setLoginFormState] = useState(true);
  const [toaster, setToaster] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login: setLoginResponse } = useContext(AuthContext);
  const { cartItems, updateCartItems } = useContext(CartContext);
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const mobileFormat = /^9665\d{8}$/;

    if (!mobile) {
      setMobileError(t("Please enter mobile number"));
      return;
    }

    if (!mobile.match(mobileFormat)) {
      setMobileError(
        t(
          "Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit."
        )
      );
      return;
    }

    if (!password) {
      setPasswordError(t("Please enter password"));
      return;
    }

    try {
      setIsLoading(true);
      const response = await login({ mobile, password });
      if (response.id) {
        const cusDetailresponse = await getSessionCusertomerDetails(
          response.token
        );
        const customerobject = { ...response, ...cusDetailresponse.data };
        setLoginResponse(customerobject);
        setIsLoading(false);
        setToaster({
          type: "success",
          message: "Login successful",
          duration: 3000,
        });
        setTimeout(() => {
          onClose();
        }, 500);
        updateCart();
      } else {
        setIsLoading(false);
        if (Array.isArray(response.errors)) {
          response.errors.forEach((errorMessage) => {
            setToaster({
              type: "error",
              message: errorMessage,
              duration: 3000,
            });
          });
        } else if (response.Message) {
          setToaster({
            type: "error",
            message: response.Message,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({ type: "error", message: t("Login failed"), duration: 3000 });
    }
  };

  const addCartItem = async (cartId, newCartItem) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await addCartAPI(cartId, newCartItem);
    } catch (error) {
      console.log("Cart add failed");
    }
  };

  const updateCartItem = async (cartId, updatedItem) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await updateCartAPI(cartId, updatedItem);
    } catch (error) {
      console.log("Cart update failed");
    }
  };

  const updateCart = async () => {
    try {
      const response = await getActiveCart();
      if (response.succeeded) {
        const loggedInCartItems = response.data.items;
        if (cartItems) {
          const guestCartItems = cartItems.items;
          const mergedItems = [];
          guestCartItems.forEach((guestCartItem) => {
            const loggedInItemIndex = loggedInCartItems.findIndex(
              (loggedInItem) =>
                loggedInItem.productVariantId === guestCartItem.productVariantId
            );

            if (loggedInItemIndex !== -1) {
              guestCartItem.quantity +=
                loggedInCartItems[loggedInItemIndex].quantity;
              mergedItems.push(guestCartItem);
              loggedInCartItems.splice(loggedInItemIndex, 1);
              updateCartItem(response.data.id, guestCartItem);
            } else {
              mergedItems.push(guestCartItem);
              addCartItem(response.data.id, guestCartItem);
            }
          });
          mergedItems.push(...loggedInCartItems);
          const mergedCart = { ...response.data, items: mergedItems };
          updateCartItems(mergedCart);
        } else {
          updateCartItems(response.data);
        }

        try {
          const response_new = await updateCartOwnerToCartAPI(response.data.id);
          if (response_new.succeeded) {
            setIsLoading(false);
            setToaster({
              type: "success",
              message: "Login successful",
              duration: 3000,
            });
            setTimeout(() => {
              onClose();
            }, 500);
          }
        } catch (error) {
          console.error("Error updating cart owner:", error);
        }
      } else {
        if (cartItems) {
          try {
            const response = await updateCartOwnerToCartAPI(cartItems.id);
            if (response.succeeded) {
              setIsLoading(false);
              setToaster({
                type: "success",
                message: "Login successful",
                duration: 3000,
              });
              setTimeout(() => {
                onClose();
              }, 500);
            }
          } catch (error) {
            console.error("Error login into account:", error);
          }
        } else {
          setIsLoading(false);
          setToaster({
            type: "success",
            message: "Login successful",
            duration: 3000,
          });
          setTimeout(() => {
            onClose();
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error login into account:", error);
    }
  };

  const toggleLoginFormFn = () => {
    setLoginFormState(!loginFormState);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToasterClose = () => {
    setToaster(null);
  };

  const handleOpenSignup = (e) => {
    e.preventDefault();
    onClose();
    onOpenSignup();
  };

  const handleOpenForgotPassword = (e) => {
    e.preventDefault();
    onClose();
    onOpenForgotPassword();
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      {toaster && (
        <Toaster
          type={toaster.type}
          message={toaster.message}
          duration={toaster.duration}
          onClose={handleToasterClose}
        />
      )}
      <div className="popup-content">
        {loginFormState ? (
          <h2>{t("Login")}</h2>
        ) : (
          <h2>{t("Please sign in or up to continue")}</h2>
        )}
        <button className="closeBtn" type="button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {loginFormState ? (
          <div className="loginFormWraper">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                className={`inputBox ${mobileError ? "inputError" : ""}`}
                placeholder={t("Mobile Number")}
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setMobileError("");
                }}
              />
              {mobileError && <span className="errorText">{mobileError}</span>}
              <span className="passwordWraper">
                <input
                  type="password"
                  className={`inputBox ${passwordError ? "inputError" : ""}`}
                  placeholder={t("Password")}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
              </span>
              {passwordError && (
                <span className="errorText">{passwordError}</span>
              )}
              <p className="forgotPassword">
                <Link
                  to="/forgot-password"
                  onClick={(e) => handleOpenForgotPassword(e)}
                >
                  {t("Forgot your password?")}
                </Link>
              </p>
              <button className="submitpopup" type="submit">
                {isLoading ? (
                  <Loader
                    showOverlay={false}
                    size={12}
                    color="#ffffff"
                    isLoading={true}
                  />
                ) : (
                  t("Login")
                )}
              </button>
              <p className="joinNow">
                {t("You don’t have an account?")}{" "}
                <Link to="/signup" onClick={(e) => handleOpenSignup(e)}>
                  <b>{t("Join now")}</b>
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <div className="loginFormWraper">
            <div className="individualLoginOptions">
              <img src={login1} className="loginImgs" alt="" />
            </div>
            <div className="individualLoginOptions">
              <img src={login2} className="loginImgs" alt="" />
            </div>
            <div className="individualLoginOptions" onClick={toggleLoginFormFn}>
              <img src={login3} className="loginImgs" alt="" />
            </div>
            <p style={{ marginTop: "18px" }} className="joinNow">
              {t("You don’t have an account?")}{" "}
              <Link to="/signup" onClick={(e) => handleOpenSignup(e)}>
                <b>{t("Join now")}</b>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
