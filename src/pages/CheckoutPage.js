import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import camelBack from "../assets/images/camelBacks.png";
import counterPlus from "../assets/images/smallPlus.png";
import dropimg from "../assets/images/drop.png";
import apple from "../assets/images/apples.png";
import deletes from "../assets/images/delete.png";
import rewards from "../assets/images/rewardPoint.png";
import arrows from "../assets/images/arrowPoint.png";
import payLogo from "../assets/images/payLogo.png";
import { CartContext } from '../utils/CartContext';
import placeholderImage from "../assets/images/no-image.png";
import { updateCartAPI, deleteCartAPI } from '../api/cart';
import minus from "../assets/images/minusWhite.png";
import { AuthContext } from '../utils/AuthContext';
import Loader from '../components/common/Loader/Loader';
import { DialogSelect } from '../components/common/DialogSelect/DialogSelect';
import RadioButtonsWithImages from '../components/common/RadioButtonsWithImages/RadioButtonsWithImages';
import r1 from "../assets/images/r1.png";
import r2 from "../assets/images/r2.png";
import r3 from "../assets/images/r3.png";
import pay1 from "../assets/images/pay1.png";
import { getDeliveryMethodAPI, getPaymentMethodAPI, getOnePayMethodAPI } from "../api/lookup";
import Toaster from '../components/common/Toaster/Toaster';
import { cartToOrder, updatedeliveryMethod, updatePaymentMethod } from "../api/order";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const { cartItems, updateCartItems } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const { loginResponse } = useContext(AuthContext);
    const [isinlineLoadingDelivery, setIsinlineLoadingDelivery] = useState(false);
    const [isinlineLoadingPayment, setIsinlineLoadingPayment] = useState(false);
    const [isinlineLoadingOnePay, setIsinlineLoadingOnePay] = useState(false);
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedOnePayMethod, setSelectedOnePayMethod] = useState('');
    const [allDeliveryOption, setAllDeliveryOption] = useState(null);
    const [allPaymentMethod, setAllPaymentMethod] = useState(null);
    const [allOnePaymMethod, setAllOnePaymMethod] = useState(null);
    const [issubmitLoading, setSubmitLoading] = useState(false);
    const [toaster, setToaster] = useState(null);
    const headerRef = useRef();
    const navigate = useNavigate();

    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };

    useEffect(() => {
        getDeliveryMethods();
        getPaymentMethods();
        getOnePayMethods();
    }, []);

    const getDeliveryMethods = async () => {
        setIsinlineLoadingDelivery(true)
        try {
            const response = await getDeliveryMethodAPI();
            if (response.length > 0) {
                setAllDeliveryOption(response);
                setIsinlineLoadingDelivery(false);
            }
        } catch (error) {
            console.error('Error fetching delivery methods:', error);
        }
    };

    const getPaymentMethods = async () => {
        setIsinlineLoadingPayment(true);
        try {
            const response = await getPaymentMethodAPI();
            if (response.length) {
                setAllPaymentMethod(response);
                setIsinlineLoadingPayment(false);
            }
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
    };

    const getOnePayMethods = async () => {
        setIsinlineLoadingOnePay(true);
        try {
            const response = await getOnePayMethodAPI();
            if (response.succeeded) {
                setAllOnePaymMethod(response.data);
                setIsinlineLoadingOnePay(false);
            }
        } catch (error) {
            console.error('Error fetching onepay methods:', error);
        }
    };

    const handleCountChange = (index, count) => {
        const updatedCartItems = { ...cartItems };
        updatedCartItems.items[index].quantity += count;
        if (updatedCartItems.items[index].quantity >= 0) {
            if (updatedCartItems.items[index].quantity === 0) {
                updatedCartItems.items[index].quantity = 1;
                updatedCartItems.items[index].price = 1;
                deleteCartItem(updatedCartItems, updatedCartItems.items[index], index);
            } else {
                updateCartItem(updatedCartItems, index);
            }
        }
    };

    const deleteCartItemRow = (index) => {
        const updatedCartItems = { ...cartItems };
        updatedCartItems.items[index].quantity = 1;
        updatedCartItems.items[index].price = 1;
        deleteCartItem(updatedCartItems, updatedCartItems.items[index], index);
    }

    const deleteCartItem = async (cartItems, updatedCartItems, index) => {
        setIsLoading(false);
        cartItems.items.splice(index, 1);
        updateCartItems(cartItems);
        const response = await deleteCartAPI(cartItems.id, updatedCartItems);
        if (response.succeeded) {
            setIsLoading(false);
            updateCartItems(cartItems);
        }
    };

    const updateCartItem = async (cartItems, index) => {
        setIsLoading(true);
        updateCartItems(cartItems);
        const response = await updateCartAPI(cartItems.id, cartItems.items[index]);
        if (response.succeeded) {
            updateCartItems(cartItems);
            setIsLoading(false);
        }
    };

    const calculateSubtotal = () => {
        if (!cartItems || !cartItems.items) return 0;

        return cartItems.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const subtotalPrice = useMemo(() => calculateSubtotal(), [cartItems]);

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (!loginResponse) {
            headerRef.current.loginClickedCheckout(e);
        }
    };

    const handleSelectPaymentMethod = (option) => {
        setSelectedPaymentMethod(JSON.parse(option));
    };

    const handleSelectOnePayMethod = (option) => {
        setSelectedOnePayMethod(JSON.parse(option));
    };

    const imageUrls = [r1, r2, r3];


    const handleToasterClose = () => {
        setToaster(null);
    };


    const submitOrder = async () => {

        if (!selectedDeliveryOption) {
            setToaster({ type: 'error', message: 'Please select delivery option!', duration: 3000 });
        }

        if (!selectedPaymentMethod) {
            setToaster({ type: 'error', message: 'Please select payment method!', duration: 3000 });
        }
        else if (selectedPaymentMethod.name === 'Online Checkout' && !selectedOnePayMethod) {
            setToaster({ type: 'error', message: 'Please select one pay method!', duration: 3000 });
        }

        setSubmitLoading(true);
        try {
            const response = await cartToOrder(cartItems.id);
            if (response.succeeded) {
                const orderId = response.data.id;
                const delMethodPayload = { 'id': selectedDeliveryOption };
                const responseUpdateDelMethod = await updatedeliveryMethod(orderId, delMethodPayload);
                if (responseUpdateDelMethod) {
                    const payMethodPayload = { 'id': selectedPaymentMethod.id }
                    const responseUpdatePaymentlMethod = await updatePaymentMethod(orderId, payMethodPayload);
                    if (responseUpdatePaymentlMethod) {
                        setSubmitLoading(false);
                        updateCartItems(null);
                        setToaster({ type: 'success', message: 'Order has been succesfully placed!', duration: 3000 });
                        setTimeout(() => {
                            navigate('/');
                        }, 1000);
                    }
                }

            }
        } catch (error) {
            console.error('Error creating cart to order:', error);
        }
    };


    return (
        <div className="dashboardPageMaimWraper checkoutsPages">
            {toaster && (
                <Toaster
                    type={toaster.type}
                    message={toaster.message}
                    duration={toaster.duration}
                    onClose={handleToasterClose}
                />
            )}
            <Header ref={headerRef} />
            {isLoading ? <Loader showOverlay={true} size={20} color="#000" isLoading={false} /> : ''}
            <div className="checkoutWraper">
                <div className="camelWraper">
                    <img src={camelBack} alt="" />
                </div>

                <div className="midCheckoutWraper">
                    {!loginResponse ? (
                        <div className="guestLoginWraper">
                            <h3>Please fill in the below <span className="subHeading">(Guest Login)</span></h3>
                            <div className="loginGuest">
                                <input className="inputGuest" type="text" placeholder="First Name *" />
                                <input className="inputGuest" type="text" placeholder="Phone *" />
                                <p className="guestLoginP">Already have an account? <b onClick={(e) => handleLoginClick(e)}>Sign in</b></p>
                            </div>
                        </div>
                    ) : ''}
                    <div className="paymentWraper">
                        <h3>Delivery Method</h3>
                        <div className="infodetails margin-20">
                            {isinlineLoadingDelivery ? (
                                <Loader showOverlay={false} size={20} color="#B7854C" isLoading={false} />
                            ) :
                                <RadioButtonsWithImages
                                    options={allDeliveryOption}
                                    selectedOption={selectedDeliveryOption}
                                    onChange={setSelectedDeliveryOption}
                                    imageUrls={imageUrls}
                                />
                            }
                        </div>
                        <h3>Payment Method</h3>
                        {isinlineLoadingPayment ? (
                            <Loader showOverlay={false} size={20} color="#B7854C" isLoading={false} />
                        ) :
                            <DialogSelect
                                options={allPaymentMethod}
                                selectedOption={selectedPaymentMethod}
                                onSelect={handleSelectPaymentMethod}
                                buttonText={selectedPaymentMethod.name}
                                imgSrc={pay1}
                                fieldTitle="Payment Method"
                            />
                        }
                        {selectedPaymentMethod.name === 'Online Checkout' ? (
                            <>
                                <div className="paymentInfoLogo">
                                    <img src={payLogo} alt="" />
                                </div>
                                {isinlineLoadingOnePay ? (
                                    <Loader showOverlay={false} size={20} color="#B7854C" isLoading={false} />
                                ) : (
                                    <DialogSelect
                                        options={allOnePaymMethod}
                                        selectedOption={selectedOnePayMethod}
                                        onSelect={handleSelectOnePayMethod}
                                        buttonText={selectedOnePayMethod.name}
                                        imgSrc={apple}
                                        fieldTitle="1Pay Method"
                                    />
                                )}
                            </>
                        ) : ''}

                        <button className="payCheckOutBtn" onClick={(e) => submitOrder(e)}>
                            {issubmitLoading ? <Loader showOverlay={false} size={12} color="#ffffff" isLoading={true} /> : 'PAY NOW'}
                        </button>
                    </div>
                </div>

                <div className="rightCheckoutWraper">
                    <h2 className="checkoutProductHeading">Shopping Cart</h2>
                    <div className="cartProductListings">
                        {cartItems && cartItems.items && cartItems.items.map((item, index) => (
                            <div className="individualCartProducts" key={index}>
                                <span className="productCartImage">
                                    <img src={item?.image ? `data:image/png;base64,${item.image}` : placeholderImage} alt="" />
                                </span>
                                <span className="midCartDetailsEdit">
                                    <h5 className="indCartProductName">{item.name}</h5>
                                    <p className="productPriceInd"><span>{item.price}</span> SAR</p>
                                    <span className="counterWraper checkoutcounters">
                                        <span className="plusCounter" onClick={() => handleCountChange(index, 1)}>
                                            <img src={counterPlus} alt="" />
                                        </span>
                                        <span className="counterInput" >
                                            <input type="number" className="inputCounter" value={item.quantity} />
                                        </span>
                                        <span className="minusCounter" onClick={() => handleCountChange(index, -1)}>
                                            <img src={minus} alt="" />
                                        </span>
                                    </span>
                                </span>
                                <span className="deleteSpan" onClick={() => deleteCartItemRow(index)}>
                                    <img src={deletes} alt="" />
                                </span>
                            </div>
                        ))}
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
                            <span className="totalPrice"> {subtotalPrice.toFixed(2)}</span>
                        </div>
                        <div className="rewardSectionsWrapers">
                            <span className="totalHeading points">POINTS
                                {!loginResponse ? (
                                    <span className="subPoints" onClick={(e) => handleLoginClick(e)}>Sign in to earn</span>
                                ) : ''}
                            </span>
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
                            {subtotalPrice.toFixed(2)} SAR
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
