import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import iconSelect from "../assets/images/iconSelect.png";
import camelBack from "../assets/images/camelBacks.png";
import minus from "../assets/images/delDetail.png";
import productInd from "../assets/images/pr1.png";
import counterPlus from "../assets/images/smallPlus.png";

import pay1 from "../assets/images/pay1.png";
import pay2 from "../assets/images/pay2.png";
import apple from "../assets/images/apple.png";
import deletes from "../assets/images/delete.png";
const Checkout = () => {
    return (
        <div className="dashboardPageMaimWraper checkoutsPages">
            <Header />
            <div className="checkoutWraper">
                <div className="camelWraper">
                    <img src={camelBack} alt="" />
                </div>
                <div className="midCheckoutWraper">

                </div>
                <div className="rightCheckoutWraper">
                   <h2 className="checkoutProductHeading">Shopping Cart</h2>
                   <div className="cartProductListings">
                    <div className="individualCartProducts">
                        <span className="productCartImage">
                            <img src={productInd} alt="" />
                        </span>
                        <span className="midCartDetailsEdit">
                            <h5 className="indCartProductName">Vanila Milk</h5>
                            <p className="productPriceInd"><span>250</span> SAR</p>
                            <span className="counterWraper checkoutcounters">
                                <span className="plusCounter">
                                    <img src={counterPlus} alt="" />
                                </span>
                                <span className="counterInput">
                                    <input type="number" className="inputCounter" value={1} />
                                </span>
                                <span className="minusCounter">
                                    <img src={minus} alt="" />
                                </span>
                            </span>
                         </span>
                         <span className="deleteSpan">
                            <img src={deletes} alt="" />
                         </span>
                    </div>
                   </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
