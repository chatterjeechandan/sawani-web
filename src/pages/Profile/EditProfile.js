import React, {useContext, useState, useEffect} from "react";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../utils/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {updateProfile } from "../../api/customer";
import Loader from "../../components/common/Loader/Loader";
import Toaster from "../../components/common/Toaster/Toaster";
import { resetPassword } from "../../api/auth";

const EditProfile = () => {
  const { t } = useTranslation();
  const { loginResponse, login: setLoginResponse } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({
    fullName: loginResponse ? loginResponse.fullname || "" : "",
    phoneNumber: loginResponse ? loginResponse.mobile || "" : "",
    email: loginResponse ? loginResponse.email || "" : "",
    dob: null,
    gender: "",
    emailNotification: false,
    textNotification: false,
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toaster, setToaster] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (loginResponse) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        fullName: loginResponse.fullname || "",
        phoneNumber: loginResponse.mobile || "",
        email: loginResponse.email || "",
        dob: loginResponse.dob || null,
        gender: loginResponse.gender || "",
        emailNotification: loginResponse.emailNotification || false,
        textNotification: loginResponse.textNotification || false,
        password: "",
        confirmPassword: ""
      }));
    }
  }, [loginResponse]);


  const validateName = (nameValue) => {
    const newErrors = {};
    if (!nameValue) {
      newErrors.fullName = "Full Name is required";
    }
    else {
      newErrors.fullName = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.fullName ==''?true:false;
  };

  const validatePhone = (phoneValue) => {
    console.log(phoneValue);
    const newErrors = {};
    const mobileFormat = /^9665\d{8}$/;
    if (!phoneValue) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!phoneValue.match(mobileFormat)) {
      newErrors.phoneNumber = "Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit.";
    }
    else {
      newErrors.phoneNumber = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.phoneNumber ==''?true:false;
  };

  const validateEmail = (emailValue) => {
    const newErrors = {};
    const emailFormat = /\S+@\S+\.\S+/;
    if (!emailValue) {
      newErrors.email = "Email is required";
    } else if (emailValue && !emailFormat.test(emailValue)) {
      newErrors.email = "Invalid Email Address";
    }else {
      newErrors.email = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.email ==''?true:false;
  };

  const validatePassword = (passwordValue) => {
    const newErrors = {};
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordValue) {
      newErrors.password = "Password is required";
    } else if (passwordValue && !passwordFormat.test(passwordValue)) {
      newErrors.password =  "Password must contain at least 8 characters, including lowercase and uppercase letters, numbers, and special characters";
    }else {
      newErrors.password = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.password ==''?true:false;
  };

  const validateConfirmPassword = (confirmPasswordValue) => {
    const newErrors = {};
    if (!confirmPasswordValue) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPasswordValue != userInfo.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }else {
      newErrors.confirmPassword = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.confirmPassword ==''?true:false;
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: newValue }));
    if (name === "fullName") {
      validateName(newValue);
    } else if (name === "phoneNumber") {
      validatePhone(newValue);
    } else if (name === "email") {
      validateEmail(newValue);
    } else if (name === "password") {
      validatePassword(newValue);
    } else if (name === "confirmPassword") {
      validateConfirmPassword(newValue);
    }    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isNameValid = validateName(userInfo.fullName);
    const isPhoneValid = validatePhone(userInfo.phoneNumber);
    const isEmailValid = validateEmail(userInfo.email);    
    const isPasswordValid = showPasswordFields ? validatePassword(userInfo.password) && validateConfirmPassword(userInfo.confirmPassword) : true;
    if (isNameValid && isPhoneValid && isEmailValid && isPasswordValid) {
      updateCustProfile();
    }
  };

  const updateCustProfile = async () => {    
    setIsLoading(true);
      try {
        const updatedUserObject = removeBlankProperties(userInfo);
        const response = await updateProfile(updatedUserObject);
        if (response.succeeded) {
          if(showPasswordFields){
            const passwordUpdatePayoad = {
              "otp": "123456",
              "mobile": updatedUserObject.phoneNumber,
              "password": updatedUserObject.password
            };
            const response = await resetPassword(passwordUpdatePayoad);
          }
          setIsLoading(false);
          setToaster({
            type: "success",
            message: t('Profile updated successfully!'),
            duration: 3000,
          });
          setTimeout(() => {
            const userInfo = {...loginResponse,...response.data}
            const { password, ...userInfoWithoutPassword } = userInfo;        
            setLoginResponse(userInfoWithoutPassword);
          }, 1000);          
        } else {
          setIsLoading(false);
          Object.values(response.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              setToaster({
                type: "error",
                message: errorMessage,
                duration: 3000,
              });
            });
          });
        }
      } catch (error) {
        console.error("Error fetching favourite producucts:", error);
      }
  };

  const removeBlankProperties = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const setDob = (date) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ['dob']: date }));
  };

  const handleGenderChange = (event) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ['gender']: event.target.value }));
  };

  const handleEmailNotificationChange = (event) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ['emailNotification']: !userInfo.emailNotification }));
  };

  const handleTextNotificationChange = (event) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ['textNotification']: !userInfo.textNotification }));
  };

  const handleToasterClose = () => {
    setToaster(null);
  };

  const handleToggleClick = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
      {toaster && (
        <Toaster
          type={toaster.type}
          message={toaster.message}
          duration={toaster.duration}
          onClose={handleToasterClose}
        />
      )}
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper inputWrapers newAddressWraper">
              <h4 className="addressHeading">{t("Edit Profile")}</h4>
              <div className="addressListings gapTop">
                <div className="indFields">
                  <label className="fieldLabel">{t("Full Name")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Full Name")}
                    name="fullName"
                    value={userInfo.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.fullName && (
                    <p className="errorText">{errors.fullName}</p>
                  )}
                <div className="indFields">
                  <label className="fieldLabel">{t("Phone Number")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Phone Number")}
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="errorText">{errors.phoneNumber}</p>
                )}
                <div className="indFields">
                  <label className="fieldLabel">{t("Email")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Email Id")}
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.email && (
                    <p className="errorText">{errors.email}</p>
                )}
                <div className="indFields date-picker">
                  <label className="fieldLabel">{t("Date of Birth")}</label>                  
                  <DatePicker 
                    selected={userInfo.dob ? new Date(userInfo.dob) : null} 
                    onChange={(date) => setDob(date)} 
                    className="foeldInputs" 
                    type="number" 
                    maxDate={new Date()} 
                    placeholder={t("Select DOB")} 
                    showYearDropdown                    
                  />
                </div>
                {errors.dob && (
                    <p className="errorText">{errors.dob}</p>
                  )}
                <div className="indFields">
                  <div className="inlineOptions">
                    <label className="fieldLabel">{t("Gender")}</label>
                    <span className="optionsInline">
                      <input
                        type="radio"
                        id="Male"
                        name="fav_language"
                        className="radioGender"
                        value="M"
                        checked={userInfo.gender === "M"}
                        onChange={handleGenderChange}
                      />
                        <label for="Male">{t("Male")}</label> {" "}
                      <input
                        type="radio"
                        id="Female"
                        name="fav_language"
                        className="radioGender"
                        value="F"
                        checked={userInfo.gender === "F"}
                        onChange={handleGenderChange}
                      />
                        <label for="Female">{t("Female")}</label>
                    </span>                    
                  </div>
                </div>
                {errors.gender && (
                      <p className="errorText">{errors.gender}</p>
                    )}
                <div className="indFields">
                  <div className="inlineOptions">
                    <label className="fieldLabel switchOptions">
                      {t("I would like to receive")} <br /> {t("Notifications")}
                    </label>
                    <span className="optionsInline">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={userInfo.emailNotification}
                        onChange={handleEmailNotificationChange}
                      />
                      <span className="slider round"></span>
                    </label>
                    <label htmlFor="Male">{t("Email")}</label>{" "}
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={userInfo.textNotification}
                        onChange={handleTextNotificationChange}
                      />
                      <span className="slider round"></span>
                    </label>
                    <label htmlFor="Female">{t("Text Messages")}</label>
                  </span>
                  </div>
                </div>
                <p className="changePassOptions" onClick={handleToggleClick}>{t("Change Password")}</p>
                {showPasswordFields && (
                  <div>
                    <div className="indFields">
                      <label className="fieldLabel">{t("Password")} *</label>
                      <input
                        className="foeldInputs"
                        type="password"
                        placeholder={t("Enter Password")}
                        name="password"
                        value={userInfo.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.password && (
                      <p className="errorText">{errors.password}</p>
                    )}
                    <div className="indFields">
                      <label className="fieldLabel">{t("Confirm Password")} *</label>
                      <input
                        className="foeldInputs"
                        type="password"
                        placeholder={t("Enter Confirm Password")}
                        name="confirmPassword"
                        value={userInfo.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="errorText">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}
                <button className="submitInfo" onClick={handleSubmit}> 
                {isLoading ? (
                  <div className="buttonloader">
                    <Loader
                      showOverlay={false}
                      size={12}
                      color="#ffffff"
                      isLoading={true}
                    />
                  </div>                  
                  ) : (
                    t("Submit")
                  )}
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
