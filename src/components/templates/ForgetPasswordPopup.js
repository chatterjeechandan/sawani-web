import React, { useState, useEffect } from "react";
import "../../assets/css/forms.css";
import { forgotpassword, resetPassword } from "../../api/auth";
import Loader from "../common/Loader/Loader";
import Toaster from "../common/Toaster/Toaster";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const ForgetPasswordPopup = ({ onClose, onOpenLogin }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpassError, setConfirmpassError] = useState("");
  const { t } = useTranslation();

  const handleForgotPassword = async (e) => {
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

    try {
      setIsLoading(true);
      const response = await forgotpassword({ mobile });
      console.log("Forgot Password response:", response);
      if (response.message) {
        setIsLoading(false);
        setToaster({
          type: "success",
          message: response.message,
          duration: 3000,
        });
        setShowResetForm(true);
      } else {
        setIsLoading(false);
        setToaster({
          type: "error",
          message: response.Message,
          duration: 3000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        type: "error",
        message: t("Forgot Password failed"),
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const strongPasswordFormat =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (password) {
      setPasswordError("");
    }

    if (strongPasswordFormat.test(password)) {
      setPasswordError("");
    }

    if (confirmPassword) {
      setConfirmpassError("");
    }

    if (password == confirmPassword) {
      setConfirmpassError("");
    }
  }, [password, confirmPassword]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const strongPasswordFormat =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!otp) {
      setOtpError(t("Forgot Password failed"));
      return;
    }

    if (!password) {
      setPasswordError(t("Please enter password"));
      return;
    }

    if (!strongPasswordFormat.test(password)) {
      setPasswordError(
        t(
          "Password must contain at least 8 characters, including lowercase and uppercase letters, numbers, and special characters"
        )
      );
      return;
    }

    if (!confirmPassword) {
      setConfirmpassError(t("Please enter confirm password"));
      return;
    }

    if (password !== confirmPassword) {
      setConfirmpassError(t("Passwords do not match"));
      return;
    }

    try {
      setIsLoading(true);
      const response = await resetPassword({ mobile, otp, password });
      console.log("Reset Password response:", response);
      if (response.message) {
        setIsLoading(false);
        setToaster({
          type: "success",
          message: response.message,
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
            message: t("Password reset failed failed. Please try again."),
            duration: 3000,
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        type: "error",
        message: t("Password reset failed failed. Please try again"),
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

  const handleOpenLogin = (e) => {
    e.preventDefault();
    onClose();
    onOpenLogin();
  };

  const handleToggleResetForm = () => {
    setShowResetForm(!showResetForm);
  };

  if (!showResetForm) {
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
          <h2>{t("Forgot Password")}</h2>
          <button className="closeBtn" type="button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="loginFormWraper">
            <form onSubmit={handleForgotPassword}>
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
              <button className="submitpopup" type="submit">
                {isLoading ? (
                  <Loader
                    showOverlay={false}
                    size={12}
                    color="#ffffff"
                    isLoading={true}
                  />
                ) : (
                  t("Forgot Password")
                )}
              </button>
              <p className="joinNow">
                {t("You already have an account?")}{" "}
                <Link to="/login" onClick={(e) => handleOpenLogin(e)}>
                  <b>{t("Login now")}</b>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
        <h2>{t("Reset Password")}</h2>
        <button className="closeBtn" type="button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="loginFormWraper">
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="mobile">{t("Mobile Number")}</label>
              <div className="mobileContainer">
                <span>{mobile}</span>
                <button
                  className="editBtn"
                  type="button"
                  onClick={() => handleToggleResetForm()}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
            <input
              type="text"
              id="otp"
              className={`inputBox ${
                toaster && toaster.type === "error" ? "inputError" : ""
              }`}
              placeholder={t("Enter OTP")}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError && <span className="errorText">{otpError}</span>}
            <input
              type="password"
              id="password"
              className={`inputBox ${
                toaster && toaster.type === "error" ? "inputError" : ""
              }`}
              placeholder={t("Enter Password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <span className="errorText">{passwordError}</span>
            )}
            <input
              type="password"
              id="confirmPassword"
              className={`inputBox ${
                toaster && toaster.type === "error" ? "inputError" : ""
              }`}
              placeholder={t("Confirm Password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmpassError && (
              <span className="errorText">{confirmpassError}</span>
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
                t("Reset Password")
              )}
            </button>
            <p className="joinNow">
              {t("You already have an account?")}{" "}
              <Link to="/login" onClick={(e) => handleOpenLogin(e)}>
                <b>{t("Login now")}</b>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPopup;
