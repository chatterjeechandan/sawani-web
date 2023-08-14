import React, { useState } from "react";
import "../../assets/css/forms.css";
import { register } from "../../api/auth";
import Loader from "../common/Loader/Loader";
import Toaster from "../common/Toaster/Toaster";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const SignUpPopup = ({ onClose, onOpenLogin }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { t } = useTranslation();

  const handleSignup = async (e) => {
    e.preventDefault();

    const mobileFormat = /^9665\d{8}$/;
    const passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    if (!name) {
      setNameError(t("Please enter your full name"));
      return;
    }

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

    if (!password.match(passwordFormat)) {
      setPasswordError(
        t(
          "Password must contain at least 8 characters, including lowercase and uppercase letters, numbers, and special characters"
        )
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await register({ name, mobile, password });
      console.log("Signup response:", response);
      if (response.id) {
        setToaster({
          type: "success",
          message: t("Signup successful"),
          duration: 3000,
        });
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        setIsLoading(false);
        if (response.errors) {
          Object.values(response.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              setToaster({
                type: "error",
                message: errorMessage,
                duration: 3000,
              });
            });
          });
        } else {
          setToaster({
            type: "error",
            message: response.Message,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        type: "error",
        message: t("Signup failed"),
        duration: 3000,
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToasterClose = () => {
    setToaster(null);
  };

  const handleOpenSignin = (e) => {
    e.preventDefault();
    onClose();
    onOpenLogin();
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
        <h2>{t("Sign Up")}</h2>
        <button className="closeBtn" type="button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="loginFormWraper">
          <form onSubmit={handleSignup}>
            <input
              type="text"
              className={`inputBox ${nameError ? "inputError" : ""}`}
              placeholder={t("Full Name")}
              value={name}
              maxLength="20"
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
            />
            {nameError && <span className="errorText">{nameError}</span>}
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
            <span className="passwordWraper signupPasswordWraper">
              <input
                type={t("password")}
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
            <button className="submitpopup" type="submit">
              {isLoading ? (
                <Loader
                  showOverlay={false}
                  size={12}
                  color="#ffffff"
                  isLoading={true}
                />
              ) : (
                t("Sign Up")
              )}
            </button>
            <p className="joinNow">
              {t("You already have an account?")}{" "}
              <Link to="/login" onClick={(e) => handleOpenSignin(e)}>
                <b>{t("Login now")}</b>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
