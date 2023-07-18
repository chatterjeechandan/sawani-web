import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import iconSelect from "../assets/images/iconSelect.png";
import camelBack from "../assets/images/camelBacks.png";
import minus from "../assets/images/minusWhite.png";
import productInd from "../assets/images/pr1.png";
import counterPlus from "../assets/images/smallPlus.png";
import dropimg from "../assets/images/drop.png";
import pay1 from "../assets/images/pay1.png";
import pay2 from "../assets/images/pay2.png";
import apple from "../assets/images/apples.png";
import deletes from "../assets/images/delete.png";
import rewards from "../assets/images/rewardPoint.png";
import arrows from "../assets/images/arrowPoint.png";
import payLogo from "../assets/images/payLogo.png";
const Checkout = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };
    return (
        <div className="dashboardPageMaimWraper checkoutsPages">
            <Header />
            <div className="checkoutWraper">
                <div className="camelWraper">
                    <img src={camelBack} alt="" />
                </div>

                <div className="midCheckoutWraper">
                    <div className="guestLoginWraper">
                        <h3>Please fill in the below <span className="subHeading">(Guest Login)</span></h3>
                        <div className="loginGuest">
                            <input className="inputGuest" type="text" placeholder="First Name *" />
                            <input className="inputGuest" type="text" placeholder="Phone *" />
                            <p className="guestLoginP">Already have an account? <b>Sign in</b></p>
                        </div>
                    </div>
                    <div className="paymentWraper">
                        <h3>Payment Method</h3>
                        <div className="paymentLinkWraper">
                            <span className="paymentIcons">
                                <img src={pay1} alt="" />
                            </span>
                            <span className="paymentname">Online Checkout</span>
                            <span className="arrowRight">
                                <img src={arrows} alt="" />
                            </span>
                        </div>
                        <div className="paymentInfoLogo">
                            <img src={payLogo} alt="" />
                        </div>
                        <div className="paymentLinkWraper">
                            <span className="paymentIcons">
                                <img src={apple} alt="" />
                            </span>
                            <span className="paymentname">Apple PAY</span>
                            <span className="arrowRight">
                                <img src={arrows} alt="" />
                            </span>
                        </div>
                        <button className="payCheckOutBtn">PAY NOW</button>
                    </div>
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
                   <div className='customizeFilter checkoutPage'>
                        <div className='customizeFilterDisplay' onClick={setDropDownOpenFn}>
                            <span className='selectText'>
                            Subscription Duration
                            </span>
                            <span className='dropImages'>
                                <img src={dropimg} alt='' />
                            </span>
                        </div>
                        {dropDownOpen && (
                            <ul className='customDropdown'>
                                <li>
                                    <span className='selectText'>
                                    2 Weeks
                                    </span>
                                </li>
                                <li>
                                    <span className='selectText'>
                                    4 Weeks
                                    </span>
                                </li>
                                <li>
                                    <span className='selectText'>
                                    8 Weeks
                                    </span>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="finalCartBills">
                        <div className="subTotal">
                            <span className="totalHeading">Subtotal</span>
                            <span className="totalPrice">250.00 SAR</span>
                        </div>
                        <div className="rewardSectionsWrapers">
                            <span className="totalHeading points">POINTS  <span className="subPoints">Sign in to earn</span></span>
                            <span className="totalPrice points">
                                <span className="rewardsIconImg">
                                    <img src={rewards} alt="" />
                                </span>
                                +50 points</span>
                        </div>
                    </div>
                    <div className="grandTotalWraper rewardSectionsWrapers">
                        <span className="grandHeading">
                            TOTAL
                        </span>
                        <span className="grandHeading grandPrice">
                            250.00 SAR
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
