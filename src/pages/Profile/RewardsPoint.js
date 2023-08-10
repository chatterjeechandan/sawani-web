import React from "react";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import circular from "../../assets/images/circular.png";
import smallLogo from "../../assets/images/smLogo.png";
import icon1 from "../../assets/images/icons1.png";
import icon2 from "../../assets/images/icons2.png";
import icon3 from "../../assets/images/icons3.png";
import { useTranslation } from "react-i18next";

const RewardsPointPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper">
              <div className="tabWrapers">
                <ul className="pointsTabs">
                  <li className="activeTab">{t("Month")}</li>
                  <li className="">{t("6 Months")}</li>
                  <li className="">{t("Annual")}</li>
                </ul>
                <p className="earnedInfos">
                  <span>{t("See how much you’ve earned")}</span>
                </p>
                <div className="pointDislayWraper">
                  <div className="circlePoints">
                    <img src={circular} className="circleBack" alt="" />
                    <span className="pointsMainInfo">
                      <span className="pointsSmLogo">
                        <img src={smallLogo} className="smLogo" alt="" />
                      </span>
                      <p className="pointsValue">2023</p>
                      <p className="pointsNames">{t("Point Balance")}</p>
                      <p className="equalConversion">
                        {t("Equals to")} <span>20.32</span> {t("SAR")}
                      </p>
                    </span>
                  </div>
                  <div className="pointsListings">
                    <ul className="pointListUl">
                      <li>
                        <span className="pointListIcons">
                          <img src={icon1} className="iconsLists" alt="" />
                        </span>
                        <span className="pointsName">{t("Redeemed")}</span>
                        <span className="pointsPercent">15%</span>
                      </li>
                      <li className="activated">
                        <span className="pointListIcons">
                          <img src={icon2} className="iconsLists" alt="" />
                        </span>
                        <span className="pointsName">{t("Purchases")}</span>
                        <span className="pointsPercent">25%</span>
                      </li>
                      <li>
                        <span className="pointListIcons">
                          <img src={icon3} className="iconsLists" alt="" />
                        </span>
                        <span className="pointsName">
                          {t("Weekly logins & other")}
                        </span>
                        <span className="pointsPercent">35%</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button className="pointDetail">{t("Details")}</button>
              </div>
            </div>

            <div className="questionsWrapers">
              <h3>{t("We want to get to know you")}</h3>
              <button className="qusBtn">{t("Answer Questionnaire")}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RewardsPointPage;
