import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import { useTranslation } from "react-i18next";

const FavouriteStores = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper">
              <div className="favouriteTabs">
                <div className="favouritetabWraper">
                  <span className="activates">{t("Favorite Stores")}</span>
                </div>
                <div className="favouritetabWraper">
                  <Link to="/favourite-product" className="profileLinksTag">
                    {" "}
                    <span className="">{t("Favorite Products")}</span>
                  </Link>
                </div>
              </div>
              <div className="tabContents">
                <p className="noRecords">
                  {t("You don’t have favorite stores yet")}
                </p>
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

export default FavouriteStores;
