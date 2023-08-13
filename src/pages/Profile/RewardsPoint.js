import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
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
  const [isTabOpen1, setTabOpen1] = useState(true);
  const [isTabOpen2, setTabOpen2] = useState(false);
  const [isTabOpen3, setTabOpen3] = useState(false);

  const setTabOpen1Fn = () => {
    setTabOpen1(true);
    setTabOpen2(false);
    setTabOpen3(false);
  };
  const setTabOpen2Fn = () => {
    setTabOpen1(false);
    setTabOpen2(true);
    setTabOpen3(false);
  };
  const setTabOpen3Fn = () => {
    setTabOpen1(false);
    setTabOpen2(false);
    setTabOpen3(true);
  };

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
                  <li className={isTabOpen1 ? "activeTab" : ""} onClick={setTabOpen1Fn}>{t("Month")}</li>
                  <li className={isTabOpen2 ? "activeTab" : ""} onClick={setTabOpen2Fn}>{t("6 Months")}</li>
                  <li className={isTabOpen3 ? "activeTab" : ""} onClick={setTabOpen3Fn}>{t("Annual")}</li>
                </ul>

                {/* Tab Component are here */}
                {isTabOpen1 && (
                  <div className="tabContentCompenents">
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
                )}

                {isTabOpen2 && (
                  <div className="tabContentCompenents">
                  <p className="earnedInfos">
                    <span>{t("See how much you’ve earned half-yearly")}</span>
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
                )}
                

                {isTabOpen3 && (
                  <div className="tabContentCompenents">
                  <p className="earnedInfos">
                    <span>{t("See how much you’ve earned anually")}</span>
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
                )}

                 {/* Tab Component end here*/}

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
