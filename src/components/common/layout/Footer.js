import React from "react";
import footerLogo from "../../../assets/images/footerLogo.png";
import s1 from "../../../assets/images/s1.png";
import s2 from "../../../assets/images/s2.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      {/* Your footer content goes here */}
      <div className="footerWraper">
        <div className="rowWraper firstRow rowSec">
          <div className="logoSec">
            <img src={footerLogo} alt="" />
          </div>
          <div className="footerMenu">
            <ul>
              <li>
                <Link to="/">الرئيسية</Link>
              </li>
              <li>
                <Link to="/">قصتنا</Link>
              </li>
              <li>
                <Link to="/">منتجاتنا</Link>
              </li>
              <li>
                <Link to="/">الفرص المستقبلية</Link>
              </li>
              <li>
                <Link to="/">عن الشركة</Link>
              </li>
              <li>
                <Link to="/">فريق العمل</Link>
              </li>
              <li>
                <Link to="/">كلمة الرئيس</Link>
              </li>
              <li>
                <Link to="/">المركز الاعلامي</Link>
              </li>
              <li>
                <Link to="/">اتصل بنا</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="rowWraper secondRow">
          <div className="socialIcons">
            <span className="social">
              <Link to="/">
                <img src={s1} alt="" />
              </Link>
            </span>
            <span className="social">
              <Link to="/">
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
