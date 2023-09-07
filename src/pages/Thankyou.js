import React, { useState, useEffect, useMemo, useContext } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import camelBack from "../assets/images/camelBacks.png";
import Loader from "../components/common/Loader/Loader";
import { useParams, Link } from "react-router-dom";
import { getOrder } from "../api/order";
import { useTranslation } from "react-i18next";
import { getConfig } from "../config/site.config";
import productInd from "../assets/images/pr1.png";
import { CategoryContext } from "../utils/CategoryContext";

const ThankYou = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const SITE_CONFIG = getConfig();
  const { getCategoryById } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const response = await getOrder(id);
      setOrder(response);
      getCategoryNames(response.data.sectionsIds);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setIsLoading(false);
    }
  };

  const calculateSubtotal = () => {
    if (!order || !order?.data.items) return 0;

    return order.data.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subtotalPrice = useMemo(() => calculateSubtotal(), [order]);

  const getCategoryNames = (categoryIds) => {
    const idsArray = categoryIds.split(",").map((id) => parseInt(id));
    const fetchedCategories = idsArray.map((id) => getCategoryById(id));
    setSelectedCategory(fetchedCategories);
  };

  return (
    <div className="dashboardPageMaimWraper checkoutsPages">
      <Header />
      <div className="checkoutWraper">
        <div className="camelWraper">
          <img src={camelBack} alt="" />
        </div>

        <div className="midCheckoutWraper">
          <div className="paymentWraper">
            <p className="thanksP">{t("Thank you for your order!")}</p>
            <h5 className="thanksPrder">
              {t("Show this code to pick up")}
              <br /> {t("your order")}
            </h5>
            <div className="qrCodeWraper">
              {isLoading ? (
                <Loader
                  showOverlay={false}
                  size={20}
                  color="#000"
                  isLoading={false}
                />
              ) : (
                <img src={`${SITE_CONFIG.apiUrl}/${order?.data?.qr}`} alt="" />
              )}
            </div>
            {selectedCategory && (
              <p className="afterBarCode">
                {t("Head to")} <br />{" "}
                <span>
                  {selectedCategory.map((item) => (
                    <Link to={`/products/${item.id}`}>
                      <b>{item.name}</b>
                    </Link>
                  ))}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="rightCheckoutWraper">
          <h2 className="checkoutProductHeading">{t("Order Summary")}</h2>
          {!isLoading ? (
            <>
              {order?.data.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="finalCartBills">
                    <div className="orderDetailsWraper">
                      <span className="orderImg">
                        <img
                          src={
                            item?.image
                              ? `data:image/png;base64,${item.image}`
                              : productInd
                          }
                          alt=""
                          className="orderProducts"
                        />
                      </span>
                      <span className="productOrderInfo">
                        <p className="orderedNames"></p>
                        <p className="orderedNames"></p>
                        <p>{item.name}</p>
                        <p>
                          <b>{item.price}</b> {t("SAR")}
                        </p>
                      </span>
                      <span className="counterOrdered">{item.quantity}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <div className="grandTotalWraper rewardSectionsWrapers">
                <span className="grandHeading">{t("Subtotal")}</span>
                <span className="grandHeading grandPrice">
                  {subtotalPrice.toFixed(2)} {t("SAR")}
                </span>
              </div>
              <div className="grandTotalWraper rewardSectionsWrapersBig ">
                <span className="grandHeading">{t("TOTAL")}</span>
                <span className="grandHeading grandPrice">
                  {subtotalPrice.toFixed(2)} {t("SAR")}
                </span>
              </div>
            </>
          ) : (
            <Loader
              showOverlay={false}
              size={20}
              color="#000"
              isLoading={false}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
