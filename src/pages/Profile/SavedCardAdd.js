import React from "react";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import { useTranslation } from "react-i18next";
import ProfileSidebar from "./ProfileSidebar";

const SavedCardAdd = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper inputWrapers">
              <h4 className="addressHeading">Add/Edit Card</h4>
              <div className="addressListings gapTop">
                <div className="indFields">
                  <label className="fieldLabel">Card Number</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder="Enter Card Number"
                  />
                </div>
                <div className="indFields">
                  <label className="fieldLabel">{t("Card Name")}</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Card Name")}
                  />
                </div>
                <div className="sortFieldInput">
                  <div className="indFields exp">
                    <label className="fieldLabel">{t("Exp Date")}</label>
                    <input
                      className="foeldInputs"
                      type="text"
                      placeholder={t("Enter Exp Date")}
                    />
                  </div>
                  <div className="indFields cvv">
                    <label className="fieldLabel">{t("CVV")}</label>
                    <input
                      className="foeldInputs"
                      type="number"
                      placeholder={t("Enter Card CVV")}
                    />
                  </div>
                </div>
                <button className="submitInfo">{t("Submit")}</button>
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

export default SavedCardAdd;
