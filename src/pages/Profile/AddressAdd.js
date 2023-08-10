import React from "react";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import { useTranslation } from "react-i18next";

const AddressAdd = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper inputWrapers newAddressWraper">
              <h4 className="addressHeading">Add/Edit Address</h4>
              <div className="addressListings gapTop">
                <div className="indFields">
                  <label className="fieldLabel">{t("Full Name")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Full Name")}
                  />
                </div>
                <div className="indFields">
                  <label className="fieldLabel">{t("Phone Number")} *</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Phone Number")}
                  />
                </div>
                <div className="indFields">
                  <label className="fieldLabel">{t("Email")}</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Email Id")}
                  />
                </div>
                <div className="indFields">
                  <label className="fieldLabel">{t("Address")}</label>
                  <input
                    className="foeldInputs"
                    type="text"
                    placeholder={t("Enter Address")}
                  />
                </div>
                <div className="indFields">
                  <label className="fieldLabel">{t("Date of Birth")}</label>
                  <input
                    className="foeldInputs"
                    type="number"
                    placeholder={t("Enter DOB")}
                  />
                </div>
                <div className="indFields">
                  <div className="inlineOptions">
                    <label className="fieldLabel">{t("Gender")}</label>
                    <span className="optionsInline">
                      <input
                        type="radio"
                        id="Male"
                        name="fav_language"
                        className="radioGender"
                        value="Male"
                      />
                        <label for="Male">{t("Male")}</label> {" "}
                      <input
                        type="radio"
                        id="Female"
                        name="fav_language"
                        className="radioGender"
                        value="Female"
                      />
                        <label for="Female">{t("Female")}</label>
                    </span>
                  </div>
                </div>
                <div className="indFields">
                  <div className="inlineOptions">
                    <label className="fieldLabel switchOptions">
                      {t("I would like to receive")} <br /> {t("Notifications")}
                    </label>
                    <span className="optionsInline">
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                        <label for="Male">{t("Email")}</label> {" "}
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                        <label for="Female">{t("Text Messages")}</label>
                    </span>
                  </div>
                </div>
                <p className="changePassOptions">{t("Change Password")}</p>
                <button className="submitInfo">{t("Submit")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressAdd;
