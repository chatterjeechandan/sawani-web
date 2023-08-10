import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import camelBack from "../assets/images/camelBacks.png";
import product1 from "../assets/images/products1.png";

import barcode from "../assets/images/qr-code.png";

import { CartContext } from '../utils/CartContext';

import { AuthContext } from '../utils/AuthContext';
import Loader from '../components/common/Loader/Loader';
import { useNavigate, useLocation } from 'react-router-dom';


const ThankYou = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const { cartItems, updateCartItems } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const { loginResponse } = useContext(AuthContext);
    const [isinlineLoadingDelivery, setIsinlineLoadingDelivery] = useState(false);
    const [isinlineLoadingPayment, setIsinlineLoadingPayment] = useState(false);
    const [isinlineLoadingOnePay, setIsinlineLoadingOnePay] = useState(false);
    const [mobileError, setMobileError] = useState('');
    const [allDeliveryOption, setAllDeliveryOption] = useState(null);
    const [allPaymentMethod, setAllPaymentMethod] = useState(null);
    const [allOnePaymMethod, setAllOnePaymMethod] = useState(null);
    const [issubmitLoading, setSubmitLoading] = useState(false);
    const [toaster, setToaster] = useState(null);
    const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
    const headerRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const payres = searchParams.get('payres');

 
    

    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };






    return (
        <div className="dashboardPageMaimWraper checkoutsPages">
            
            <Header ref={headerRef} />
            {isLoading ? <Loader showOverlay={true} size={30} color="#fff" isLoading={false} /> : ''}
            <div className="checkoutWraper">
                <div className="camelWraper">
                    <img src={camelBack} alt="" />
                </div>

                <div className="midCheckoutWraper">
                    
                    <div className="paymentWraper">
                        <p className="thanksP">Thank you for your order!</p>
                        <h5 className="thanksPrder">Show this code to pick up<br /> your order</h5>
                        <div className="qrCodeWraper">
                            <img src={barcode} alt="" />
                         </div>
                         <p className="afterBarCode">Head to <br /> <span><b>Gourmet</b></span></p>
                    </div>
                </div>

                <div className="rightCheckoutWraper">
                    <h2 className="checkoutProductHeading">Order Summary</h2>
                    <div className="finalCartBills">
                        <div className="orderDetailsWraper">
                            <span className="orderImg">
                                <img src={product1} className="orderProducts" alt=""/>
                            </span>
                            <span className="productOrderInfo">
                            <p className="orderedNames"></p>
                            <p className="orderedNames"></p>
                            <p>Vanilla Cream</p>
                            <p><b>250.00</b> SAR</p>
                            </span>
                            <span className="counterOrdered">1</span>
                        </div>
                    </div>
                    <div className="grandTotalWraper rewardSectionsWrapers">
                        <span className="grandHeading">
                            Subtotal
                        </span>
                        <span className="grandHeading grandPrice">
                            1234 SAR
                        </span>
                    </div>
                    <div className="grandTotalWraper rewardSectionsWrapersBig ">
                        <span className="grandHeading">
                            TOTAL
                        </span>
                        <span className="grandHeading grandPrice">
                            1234 SAR
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ThankYou;
