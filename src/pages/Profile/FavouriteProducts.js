import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import products from "../../assets/images/p1s.png";
import heart from "../../assets/images/heart-2.png";
import rewards from "../../assets/images/rewardStar.png";
import { useTranslation } from "react-i18next";
import {
  getCusertomerFavourite,
  createCustomerFavourite,
  deleteCustomerFavourite,
} from "../../api/customer";
import Loader from "../../components/common/Loader/Loader";
import productInd from "../../assets/images/pr1.png";

const FavouriteProducts = () => {
  const { t } = useTranslation();
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavouriteLoader, setIsFavouriteLoader] = useState(false);
  const [deletingAddresses, setDeletingAddresses] = useState(new Set());

  useEffect(() => {
    customerFavourite();
  }, []);

  const handleFavouriteDelete = async (e,index,favourite) => {
    e.preventDefault();
    setDeletingAddresses(prev => new Set([...prev, favourite.id]));
    setIsFavouriteLoader(true);
    try {
      const response = await deleteCustomerFavourite(favourite.id);
      if (response) {
        const updatedFavourites = [...favourites.slice(0, index), ...favourites.slice(index + 1)];
        setFavourites(updatedFavourites);
        setIsFavouriteLoader(false);
      }
    } catch (error) {
      console.error("Error fetching favourite producucts:", error);
    }
    finally {
      setDeletingAddresses(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(favourite.id);
        return newSet;
      });
    }
  }  

  const customerFavourite = async () => {
    setIsLoading(true);
    try {
      const response = await getCusertomerFavourite();
      if (response) {
        setIsLoading(false);
        setFavourites(response)
      }
    } catch (error) {
      console.error("Error fetching favourite producucts:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper">
              <div className="favouriteTabs">
                {/* <div className="favouritetabWraper">
                  <Link to="/profile/favourite-store" className="profileLinksTag">
                    <span className="">{t("Favorite Stores")}</span>
                  </Link>
                </div> */}
                <div className="favouritetabWraper">
                  <Link to="/profile/favourite-product" className="profileLinksTag">
                    {" "}
                    <span className="activates">{t("Favorite Products")}</span>
                  </Link>
                </div>
              </div>
              <div className="tabContents">
                {isLoading ? (
                  <Loader
                    showOverlay={false}
                    size={25}
                    color="#B7854C"
                    isLoading={false}  // this might be redundant if you are already checking isLoading outside
                  />
                ) : (
                  favourites.length === 0 ? (
                    <p className="noRecords">
                      {t("You don’t have favorite product yet")}
                    </p>
                  ) : (
                    favourites.map((favourite,index) => (
                      <Link to={`/product/${favourite.product.productId}`} className="indProductsWraperLink">
                        <div className="indProductsWraper" key={favourite.id /* assuming each favourite has a unique id */}>
                          <div className="imagePrd">
                            <img src={favourite.product.image ? `data:image/png;base64,${favourite.product.image}` : productInd} alt="" />
                            <span className="likeProducts">
                              <img src={heart} alt=""  onClick={(e) => handleFavouriteDelete(e,index,favourite)}/>
                              {deletingAddresses.has(favourite.id) && (
                              <Loader
                                showOverlay={false}
                                size={10}
                                color="#000"
                                isLoading={false}
                              />
                            )}
                            </span>
                          </div>
                          <h4 className="prodFavName">{favourite.product.name }</h4>
                          <div className="pointsWraperInd">
                            <img src={rewards} className="rewardStars" alt="" />
                            <span className="pointsDetails">
                              <b>+{favourite.product.rewards} {t("POINTS")}</b>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )
                )}
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

export default FavouriteProducts;
