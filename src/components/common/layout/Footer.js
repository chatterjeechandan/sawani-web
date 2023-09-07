import React from "react";
import footerLogo from "../../../assets/images/footerLogo.png";
import s1 from "../../../assets/images/s1.png";
import s2 from "../../../assets/images/s2.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === "en" ? i18n.language : "";
  return (
    <footer>
      {/* Your footer content goes here */}
      <div className="footerWraper">
        <div className="rowWraper firstRow rowSec">
          <div className="footerMenu">
            <ul>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}`}>
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}`}>
                  {t("Our Story")}
                </Link>
              </li>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}#products`}>
                  {t("Products")}
                </Link>
              </li>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}#about`}>
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}#team`}>
                  {t("Our Team")}
                </Link>
              </li>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}#ceo`}>
                  {t("CEO Message")}
                </Link>
              </li>
              <li>
                <Link to={`https://www.sawani.com/${currentLanguage}#media`}>
                  {t("Media Center")}
                </Link>
              </li>
              <li>
                <Link to="/contact-us">{t("Contact Us")}</Link>
              </li>
            </ul>
          </div>
          <div className="logoSec">
            <img src={footerLogo} alt="" />
          </div>
        </div>
        <div className="rowWraper secondRow">
          <div className="socialIcons">
            <span className="social">
              <Link
                to="https://www.linkedin.com/company/sawanisaudi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={s1} alt="" />
              </Link>
            </span>
            <span className="social">
              <Link
                to="https://twitter.com/NougSaudi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={s2} alt="" />
              </Link>
            </span>
          </div>
          <p>{t("2023 © All right Reversed. SAWANI")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
