import React, { useContext, useState, useEffect, useMemo } from "react";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import camelBack from "../assets/images/camelBacks.png";
import product1 from "../assets/images/products1.png";
import barcode from "../assets/images/qr-code.png";
import { CartContext } from '../utils/CartContext';
import Loader from '../components/common/Loader/Loader';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from "../api/order";
import { useTranslation } from "react-i18next";
import CONFIG from '../config/site.config';
import productInd from "../assets/images/pr1.png";

const ThankYou = () => {
    const { id } = useParams();
    const [ order, setOrder ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        fetchOrder();
    }, [id]);
    
    const fetchOrder = async () => {
        try {
          setIsLoading(true);
          const response = await getOrder(id);
          setOrder(response);
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
    
      const subtotalPrice = useMemo(() => calculateSubtotal(), [order]);

    return (
        <div className="dashboardPageMaimWraper checkoutsPages">
            
            <Header/>
            <div className="checkoutWraper">
                <div className="camelWraper">
                    <img src={camelBack} alt="" />
                </div>

                <div className="midCheckoutWraper">
                    
                    <div className="paymentWraper">
                        <p className="thanksP">{t("Thank you for your order!")}</p>
                        <h5 className="thanksPrder">{t("Show this code to pick up")}<br /> {t("your order")}</h5>
                        <div className="qrCodeWraper">
                            {isLoading?<Loader showOverlay={false} size={20} color="#000" isLoading={false} />:<img src={`${CONFIG.baseUrl}/${order?.data?.qr}`} alt="" />}
                         </div>
                         <p className="afterBarCode">{t("Head to")} <br /> <span><Link to= "/products/?pcat=14&scat=69"><b>Gourmet</b></Link></span></p>
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
                                <span className="grandHeading grandPrice">{subtotalPrice.toFixed(2)} {t("SAR")}</span>
                            </div>
                            <div className="grandTotalWraper rewardSectionsWrapersBig ">
                                <span className="grandHeading">{t("TOTAL")}</span>
                                <span className="grandHeading grandPrice">{subtotalPrice.toFixed(2)} {t("SAR")}</span>
                            </div>
                        </>
                        ) : (
                        <Loader showOverlay={false} size={20} color="#000" isLoading={false} />
                        )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ThankYou;
