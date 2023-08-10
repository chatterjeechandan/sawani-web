import React from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import contactBack from "../assets/images/contact.png";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages contactPage">
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
              <div className="indFields exp names">
                <label className="fieldLabel">{t("Full Name")}*</label>
                <input
                  className="foeldInputs"
                  type="text"
                  placeholder={t("Enter Full Name")}
                />
              </div>
              <div className="indFields cvv emails">
                <label className="fieldLabel">{t("Email")}*</label>
                <input
                  className="foeldInputs"
                  type="email"
                  placeholder={t("Enter Email Id")}
                />
              </div>
            </div>
            <div className="indFields">
              <label className="fieldLabel">{t("Your Message")}</label>
              <textarea
                className="foeldInputsTextarea"
                type="text"
                placeholder={t("Enter Your Message")}
              ></textarea>
            </div>
            <button className="contactBtns">{t("Send Message")}</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
