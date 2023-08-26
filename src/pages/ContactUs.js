import React, { useState } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import contactBack from "../assets/images/contact.png";
import { useTranslation } from "react-i18next";
import Loader from "../components/common/Loader/Loader";
import { contactusAPI } from "../api/lookup";
import Toaster from "../components/common/Toaster/Toaster";

const ContactUs = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [toaster, setToaster] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    if (name === "name") {
      validateName(value);
    } else if (name === "email") {
      validateEmail(value);
    } else if (name === "message") {
      validateMessage(value);
    }    
  };

  const validateName = (nameValue) => {
    const newErrors = {};
    if (!nameValue.trim()) {
      newErrors.name = t("Full Name is required");
    }
    else {
      newErrors.name = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.name ===''? true:false;
  };

  const validateEmail = (emailValue) => {
    const newErrors = {};
    const emailFormat = /\S+@\S+\.\S+/;
    if (!emailValue) {
      newErrors.email = t("Email is required");
    } else if (emailValue && !emailFormat.test(emailValue)) {
      newErrors.email = t("Invalid Email Address");
    }else {
      newErrors.email = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.email ===''?true:false;
  };

  const validateMessage = (messageValue) => {
    const newErrors = {};
    if (!messageValue.trim()) {
      newErrors.message = t("Message is required");
    }
    else {
      newErrors.message = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return newErrors.message ==='' ? true:false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isNameValid = validateName(userInfo.name);
    const isEmailValid = validateEmail(userInfo.email);    
    const isMessageValid = validateMessage(userInfo.message);   
    if (isNameValid && isEmailValid && isMessageValid) {
      submitContactUs();
    }
  };

  const submitContactUs = async () => {    
    setIsLoading(true);
      try {
       const contactUsPayload = {
          "fromEmail": userInfo.email,
          "subject": "Contact Us",
          "body": userInfo.message,
          "name": userInfo.name,
          "phone": " "
        }
        const response = await contactusAPI(contactUsPayload);
        if(response){
          setIsLoading(false);
          setToaster({
            type: "success",
            message: t("Submitted successfully!"),
            duration: 3000,
          });
          setUserInfo({
            name: "",
            email: "",
            message: ""
          });
        }        
      } catch (error) {
        console.error("Error submitting contact form:", error);
      }
  };

  const handleToasterClose = () => {
    setToaster(null);
  };

  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages contactPage">
      {toaster && (
        <Toaster
          type={toaster.type}
          message={toaster.message}
          duration={toaster.duration}
          onClose={handleToasterClose}
        />
      )}
        <div className="contactUsWraper">
          <h4 className="contactHeading">{t("Talk to Us")}</h4>
          <p className="contactPagePara">
            {t("We love to hear from you our valued customer")}
          </p>
          <div className="contactPageImg">
            <img src={contactBack} className="contactLeftImg" alt="" />
          </div>
          <div className="contactFieldsWraper">
            <div className="sortFieldInput">
              <div className="input-wrapper">
                <div className="indFields exp names">
                  <label className="fieldLabel">{t("Full Name")}*</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Full Name")}
                    value={userInfo.name}
                    name="name"
                    onChange={handleInputChange}
                    maxLength={50}
                  />
                </div>
                {errors.name && (
                    <p className="errorText">{errors.name}</p>
                )}
              </div>
              <div className="input-wrapper">
                <div className="indFields cvv emails">
                  <label className="fieldLabel">{t("Email")}*</label>
                  <input
                    className="foeldInputs"
                    type="email"
                    placeholder={t("Enter Email Id")}
                    value={userInfo.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                {errors.email && (
                  <p className="errorText">{errors.email}</p>
                )}
              </div>             
            </div>
            <div className="input-wrapper contact">
              <div className="indFields">
                <label className="fieldLabel">{t("Your Message")}</label>
                <textarea
                  className="foeldInputsTextarea"
                  placeholder={t("Enter Your Message")}
                  name="message"
                  value={userInfo.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {errors.message && (
                <p className="errorText">{errors.message}</p>
              )}
            </div>
            <button className="contactBtns" onClick={handleSubmit}>
              {isLoading ? (
                <div className="buttonloader">
                  <Loader
                    showOverlay={false}
                    size={12}
                    color="#000"
                    isLoading={true}
                  />
                </div>                  
                ) : (
                  t("Send Message")
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
