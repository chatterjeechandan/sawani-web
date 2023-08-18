import React, {
  useState,
  useContext,
  useRef
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
import {updateAvatar } from "../../api/customer";
import Loader from "../../components/common/Loader/Loader";
import CONFIG from '../../config/site.config';
import { useLocation, useParams } from "react-router-dom";

const ProfileSidebar = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginResponse, login: setLoginResponse } = useContext(AuthContext);
  const location = useLocation();
  const { id } = useParams();
  const setIsQrOpenFn = () => {
    setIsQrOpen(!isQrOpen);
  };
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      updateUserAvatar(base64String);
     
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const updateUserAvatar = async (img) => {
    setIsLoading(true);
    const updatedUserObject = {  ...loginResponse, "avatar": img };
    const response = await updateAvatar(updatedUserObject);
    if (response.succeeded) {
      const userInfo = {...loginResponse, "avatar": response.data.avatar};
      localStorage.setItem('loginInfo', JSON.stringify(userInfo));
      const image = document.querySelector('.profileImages');
      image.src = `data:image/png;base64,${img}`;
      const image2 = document.querySelector('img.profile');
      image2.src = `data:image/png;base64,${img}`;
      //setLoginResponse(userInfo);
      setIsLoading(false);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="profileSidebarWraper">
      <div className="sideProfileTop">
        <div className="profileImgWraper">
          <span className="profileImg">
           { isLoading && (
            <Loader
            showOverlay={false}
            size={15}
            color="#000"
            isLoading={false}
          />
           )} 
            <img src={
                loginResponse?.avatar
                ? `${CONFIG.baseUrl}/${loginResponse.avatar}`
                  : noUserImage
              } className="profileImages" alt="" />
            <img src={profileIcon} className="profileCamel" alt="" onClick={handleIconClick} />
            <input 
              type="file" 
              accept="image/*"
              style={{ display: 'none' }} 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
            />
          </span>
          <p className="profileName">{loginResponse?.fullname}</p>
        </div>
        <div className="profilePointWraper">
          <span className="editPointsSec">
            <Link to="/profile/edit-profile"><img src={edits} alt="" /></Link>
          </span>
          <div className="pointsProfileWrapers">
            <h3>{loginResponse.points}</h3>
            <img src={reward} alt="" />
          </div>
          <p className="converstionRate">
            {t("Equals to")} <span>{Number(loginResponse.points)/Number(10)} {t("SAR")}</span>
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
          {/* Kindly toogle the activated class if any li is clicked  */}
          <li className={location.pathname === "/profile" ? "activated" : ""}>
            <Link to="/profile" className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon1} className="routIcon" />
              </span>
              <span className="nameLink">{t("Points Analysis")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
          <li className={location.pathname === "/profile/favourite-store" || location.pathname === "/profile/favourite-product" ? "activated" : ""}>
            <Link to="/profile/favourite-product" className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon2} className="routIcon" />
              </span>
              <span className="nameLink">{t("Favorites")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
          <li className={location.pathname === "/profile/saved-card" || location.pathname === "/profile/card-add" || location.pathname === `/profile/card-edit/${id}` ? "activated" : ""}>
            <Link to="/profile/saved-card" className="profileLinksTag">
              <span className="iconName">
                <img src={routIcon3} className="routIcon" />
              </span>
              <span className="nameLink">{t("My Cards")}</span>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </li>
          <li className={location.pathname === "/profile/saved-address" || location.pathname === "/profile/address-add" || location.pathname === `/profile/edit-address/${id}` ? "activated" : ""}>
            <Link to="/profile/saved-address" className="profileLinksTag">
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
