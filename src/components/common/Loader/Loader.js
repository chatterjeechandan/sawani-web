import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Loader.css";
import { useTranslation } from "react-i18next";
import profileIcon from "../../../assets/images/camelIcon.png";

const Loader = ({ showOverlay, color, size, isLoading, showImg }) => {
  const { t } = useTranslation();
  return (
    <div className={`loader ${showOverlay ? "overlay" : ""}`}>
      {showOverlay && <div className="loader-overlay"></div>}
      <div className="loader-content" style={{ color: color, fontSize: size }}>
        {showImg ? (
          <div className="loader-img-holder">
            <img src={profileIcon} alt="Loading..." />
            <span>{t("Loading...")}</span>
          </div>
        ) : (
          <FontAwesomeIcon icon={faSpinner} spin />
        )}
        {isLoading && <span>{t("Loading...")}</span>}
      </div>
    </div>
  );
};

export default Loader;
