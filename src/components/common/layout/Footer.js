import React from "react";
import footerLogo from "../../../assets/images/footerLogo.png";
import translate from "../../../assets/images/translate.png";
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
              <Link to="/">Order Now</Link>
            </li>
            <li>
              <Link to="/">Sawani Rewards</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Media Coverage</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="rowWraper secondRow">
        <div className="socialIcons">
          <span className="social">
            <img src={s1} alt="" />
          </span>
          <span className="social">
            <img src={s2} alt="" />
          </span>
        </div>
        <p>2023 copyrights. All right reserved</p>
      </div>
    </div>

        </footer>
    );
};

export default Footer;