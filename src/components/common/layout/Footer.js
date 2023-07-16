import React from "react";
import footerLogo from "../../../assets/images/footerLogo.png";
import s1 from "../../../assets/images/s1.png";
import s2 from "../../../assets/images/s2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer >
      {/* Your footer content goes here */}
      <div className="footerWraper">

        <div className="rowWraper firstRow">
          <div className="logoSec">
            <img src={footerLogo} alt="" />
          </div>
          <div className="footerMenu">
            <ul>
              <li>
                <Link to="/">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/">الاعلامي</Link>
              </li>
              <li>
                <Link to="/">المركز</Link>
              </li>
              <li>
                <Link to="/">العمل كلمة الرئيس</Link>
              </li>
              <li>
                <Link to="/">الشركة فريق</Link>
              </li>
              <li>
                <Link to="/">المستقبلية عن</Link>
              </li>
              <li>
                <Link to="/">الرئيسية قصتنا</Link>
              </li>
              <li>
                <Link to="/"> منتجاتنا الفرص</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="rowWraper secondRow">
          <div className="socialIcons">
            <span className="social">
              <Link to="/"><img src={s1} alt="" /></Link>
            </span>
            <span className="social">
              <Link to="/"><img src={s2} alt="" /></Link>
            </span>
          </div>
          <p>2023 جميع الحقوق محفوظة لشركة سواني السعودية</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;