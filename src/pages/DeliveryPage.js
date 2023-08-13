import React, { useState } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import tab1 from "../assets/images/t1.png";
import tab2 from "../assets/images/t2.png";
import tab3 from "../assets/images/t3A.png";
import { GeoLocationComponent } from "../components/geoLocation/geoLocation";
import apple from "../assets/images/apple.png";
import android from "../assets/images/android.png";
import camel from "../assets/images/delhiveryBanner.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DeliveryPage = () => {
  document.title = "SAWANI DELIVERY";
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("delivery");
  const { t } = useTranslation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "inStore":
        navigate("/in-store");
        break;
      case "pickup":
        navigate("/pickup");
        break;
      case "delivery":
        navigate("/delivery");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboardPageMaimWraper">
      <Header />
      <div className="dashboardMidContentDelhivery">
        <div className="tabSearchWraper">
          <div className="tabWraper">
            <ul className="tabUl">
              <li
                className={activeTab === "inStore" ? "active" : ""}
                onClick={() => handleTabClick("inStore")}
              >
                <span>
                  <img src={tab1} alt="" />
                </span>
                {t("In-Store")}
              </li>
              <li
                className={activeTab === "pickup" ? "active" : ""}
                onClick={() => handleTabClick("pickup")}
              >
                <span>
                  <img src={tab2} alt="" />
                </span>                
                {t("Pick up")}
              </li>
              <li
                className={activeTab === "delivery" ? "active" : ""}
                onClick={() => handleTabClick("delivery")}
              >
                <span>
                  <img src={tab3} alt="" />
                </span>                
                {t("Delivery")}
              </li>
            </ul>
          </div>
          <GeoLocationComponent />
        </div>
        <div className="tabContentWraper delhiveryTabContent">
          <div className="leftInfoContent">
            <h3 className="blackHeading">{t("WANT IT DELIVERED?")}</h3>
            <h2 className="brownHeading">{t("Download the APP")}</h2>
            <p>
              {t("Earn points and redeem rewards. Order ahead")} <br />
              {t("and pay. And get it delivered!")}
            </p>
            <div className="appBtn Wrapers">
              <span className="appleWraper">
                <img src={apple} alt="" />
              </span>
              <span className="androidWraper">
                <img src={android} alt="" />
              </span>
            </div>
          </div>
          <div className="rightDivwraper">
            <img src={camel} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryPage;
