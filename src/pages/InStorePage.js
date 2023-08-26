import React, { useState, useEffect, useContext } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import CategoryCard from "../components/category/CategoryCard";
import tab1 from "../assets/images/t1A.png";
import tab2 from "../assets/images/t2.png";
import pots from "../assets/images/pots.png";
import Loader from "../components/common/Loader/Loader";
import { fetchCategories } from "../api/category";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../utils/CategoryContext";
import { useTranslation } from "react-i18next";
import { GeoLocationComponent } from "../components/geoLocation/geoLocation";
import { getDeliveryMethodAPI } from "../api/lookup";
import { CartContext } from "../utils/CartContext";
import deleteCart from "../assets/images/deleteItem.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InStorePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inStore");
  const { categories, updateCategoryItems } = useContext(CategoryContext);
  const { t } = useTranslation();
  const [deliveryTypes, setDeliveryTypes] = useState(null);
  const { cartItems, updateCartItems } = useContext(CartContext);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const setIsConfirmOpenFn = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };

  useEffect(() => {    
    localStorage.setItem('selectedDeliveryType', 1);    
    window.scrollTo(0, 0);
    const fetchData = async () => {
      if (!categories) {
        try {
          const response = await fetchCategories();
          updateCategoryItems(response);
          getDeliveryTypes();
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
      else {
        getDeliveryTypes();
      }
    };

    const getDeliveryTypes = async () => {
      try {
        const response = await getDeliveryMethodAPI();
        response.forEach(item => {
          if (item.name === "In-store") {
            setDeliveryTypes(item);
          }
        });      
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (tab) => {
    switch (tab) {
      case "inStore":
        changeDeliveryMode(1,tab);
        break;
      case "pickup":
        changeDeliveryMode(2,tab);
        break;
      case "delivery":
        navigate("/delivery");
        break;
      default:
        break;
    }
  };


  const changeDeliveryMode = (mode,tab) => {
    const selectedDeliveryMode = localStorage.getItem("selectedDeliveryType");
    if(Number(selectedDeliveryMode) !== Number(mode)){
      if(cartItems){
        if(cartItems.items.length === 0 ){
          setActiveTab(tab);
          localStorage.setItem('selectedDeliveryType', mode);
          localStorage.removeItem('checkoutInfo');
          if(mode===1){        
            navigate("/in-store");
          }
          else{
            navigate("/pickup");
          }
        } else {
          setIsConfirmOpen(true);
        }
      } else {
        setActiveTab(tab);
        localStorage.setItem('selectedDeliveryType', mode);
        localStorage.removeItem('checkoutInfo');
        navigate("/pickup");
      }      
    }
  };

  const handleAgree = () => {
    updateCartItems({...cartItems, items: []});
    localStorage.setItem('selectedDeliveryType', 2);
    localStorage.removeItem('checkoutInfo');
    setActiveTab('pickup');
    navigate("/pickup");
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
              <h3>{t("Available in-store")}</h3>
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
                deliveryTypes?.sectionsIds.includes(category.id) && (
                  <CategoryCard key={category.id} category={category} />
                )
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
      {isConfirmOpen && (
        <div className="popup-overlay">
          <div className="popup-content barCodesPopup" >
            <button className="closeBtn" type="button" onClick={setIsConfirmOpenFn}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={deleteCart} className="cartDeleteIcon" alt="" />
            <p className="barCodeHeadingP" >
              {t("You already have Items in your cart. Cart will be deleted if you change the delivery method.")}
            </p>
            <div className="modalConfirmWraper">
            <button className="submitpopup conformPop" onClick={handleAgree}>{t("Agree")}</button>
            <button className="cancelPopup" onClick={setIsConfirmOpenFn}>{t("Disagree")}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InStorePage;
