import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import CategoryCard from "../components/category/CategoryCard";
import tab1 from "../assets/images/t1.png";
import tab2 from "../assets/images/t2A.png";
import tab3 from "../assets/images/t3.png";
import pots from "../assets/images/pots.png";
import Loader from "../components/common/Loader/Loader";
import { fetchCategories } from "../api/category";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../utils/CategoryContext";
import { useTranslation } from "react-i18next";
import { GeoLocationComponent } from "../components/geoLocation/geoLocation";

const PickupPage = () => {
  document.title = "SAWANI Pickup Category";
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pickup");
  const { categories, updateCategoryItems } = useContext(CategoryContext);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      if (!categories) {
        try {
          const response = await fetchCategories();
          updateCategoryItems(response);
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <div className="dashboardMidContent">
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
        <div className="tabContentWraper">
          <div className="pageHeadingWraper">
            <span className="headingImage">
              <img src={pots} alt="" />
            </span>
            <span className="headingContents">
              <h3>{t("Available Pickup")}</h3>
              <p>
                {t("Browse from our not only delicious but healthier options")}
              </p>
            </span>
          </div>
          <div className="productlistingsStore">
            {isLoading ? (
              <Loader
                showOverlay={false}
                size={30}
                color="#B7854C"
                isLoading={false}
              />
            ) : (
              categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PickupPage;
