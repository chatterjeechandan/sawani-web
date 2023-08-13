import React, {
  useState,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import profileIcon from "../../assets/images/camelIcon.png";
import reward from "../../assets/images/rewardStar.png";
import edits from "../../assets/images/edits.png";
import qr from "../../assets/images/qr-code-2.png";
import routIcon1 from "../../assets/images/crypto.png";
import routIcon2 from "../../assets/images/loveIcon.png";
import routIcon3 from "../../assets/images/credit-card-4.png";
import routIcon4 from "../../assets/images/location@2x.png";
import barCode from "../../assets/images/barCode.png";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../utils/AuthContext";
import noUserImage from "../../assets/images/no-user.png";

const ProfileSidebar = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const { loginResponse } = useContext(AuthContext);
  const setIsQrOpenFn = () => {
    setIsQrOpen(!isQrOpen);
  };
  const { t } = useTranslation();

  return (
    <div className="profileSidebarWraper">
      <div className="sideProfileTop">
        <div className="profileImgWraper">
          <span className="profileImg">
            <img src={
                loginResponse?.avatar
                  ? `data:image/png;base64,${loginResponse?.avatar}`
                  : noUserImage
              } className="profileImages" alt="" />
            <img src={profileIcon} className="profileCamel" alt="" />
          </span>
          <p className="profileName">{loginResponse?.fullname}</p>
        </div>
        <div className="profilePointWraper">
          <span className="editPointsSec">
            <Link to="/profile/edit-profile"><img src={edits} alt="" /></Link>
          </span>
          <div className="pointsProfileWrapers">
            <h3>300</h3>
            <img src={reward} alt="" />
          </div>
          <p className="converstionRate">
            {t("Equals to")} <span>3.00 {t("SAR")}</span>
          </p>
          <p className="numberInfo">{t("Your Sawani Rewards Number")}</p>
          <div className="codeQr" onClick={setIsQrOpenFn}>
            <img src={qr} className="codeScan" />
            E01N-98OL-3D5U
          </div>
        </div>
      </div>

      <div className="sideProfileMid">
        <ul className="profileRouts">
          <li className="activated">
            <Link to="/profile" className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon1} className="routIcon" />
              </span>
              <span className="nameLink">{t("Points Analysis")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="">
            <Link to="/favourite-store" className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon2} className="routIcon" />
              </span>
              <span className="nameLink">{t("Favorites")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="">
            <Link className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon3} className="routIcon" />
              </span>
              <span className="nameLink">{t("My Cards")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="">
            <Link to="/saved-address" className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon4} className="routIcon" />
              </span>
              <span className="nameLink">{t("My Addresses")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </div>

      <div className="refferWraper">
        <h4>{t("Want more benefits!")}</h4>
        <p>
          {t("Refer a friend and enjoy more rewards")} <br /> {t("together")}
        </p>
        <button className="refferBtn">{t("Refer a friend")}</button>
      </div>

      {isQrOpen && (
        <div className="popup-overlay">
          <div className="popup-content barCodesPopup" onClick={setIsQrOpenFn}>
            <p className="barCodeHeadingP">
              {t("Scan to earn")}
              <br /> <span>SAWANI©</span> {t("POINTS")}
            </p>
            <img src={barCode} className="barCodeImg" />
            <p className="idBar">E01N-98OL-3D5U</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
