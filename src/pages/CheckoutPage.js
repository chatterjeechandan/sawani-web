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
import { cartToOrder, updatedeliveryMethod, updatePaymentMethod, addPayment, checkout } from "../api/order";
import { useNavigate, useLocation } from 'react-router-dom';
import { PaymentPopup } from '../components/templates/PaymentPopup/PaymentPopup';
import { getCusertomerDetails } from '../api/auth';



const Checkout = () => {
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

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(() => {
        const storedCheckoutInfo = localStorage.getItem('checkoutInfo');
        if (storedCheckoutInfo) {
            const checkoutFromStorage = JSON.parse(storedCheckoutInfo)
            return checkoutFromStorage.deliveryoption?checkoutFromStorage.deliveryoption:'';
        }
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(() => {
        const storedCheckoutInfo = localStorage.getItem('checkoutInfo');
        if (storedCheckoutInfo) {
            const checkoutFromStorage = JSON.parse(storedCheckoutInfo)
            return checkoutFromStorage.paymentMethod?checkoutFromStorage.paymentMethod:'';
        }
    });
    const [selectedOnePayMethod, setSelectedOnePayMethod] = useState(() => {
        const storedCheckoutInfo = localStorage.getItem('checkoutInfo');
        if (storedCheckoutInfo) {
            const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
            return checkoutFromStorage.onepayReferenceMode?checkoutFromStorage.onepayReferenceMode:'';
        }
    });
    const [firstName, setFirstName] = useState(() => {
        const storedCheckoutInfo = localStorage.getItem('checkoutInfo');
        if (storedCheckoutInfo) {
            const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
            return checkoutFromStorage.firstName?checkoutFromStorage.firstName:'';
        }
    });
    const [phone, setPhone] = useState(() => {
        const storedCheckoutInfo = localStorage.getItem('checkoutInfo');
        if (storedCheckoutInfo) {
            const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
            return checkoutFromStorage.mobile?checkoutFromStorage.mobile:'';
        }
    });
    

    const setDropDownOpenFn = () => {
        setDropDownOpen(!dropDownOpen);
    };

    useEffect(() => {
        getDeliveryMethods();
        getPaymentMethods();
        getOnePayMethods();
    }, []);

    useEffect(() => {
        if(loginResponse){
            getCustomerDetaild(loginResponse.id);       
        }
    }, [loginResponse]);

    const getCustomerDetaild = async (id) => {
        const response = await getCusertomerDetails(id);
        if (response) {
            setFirstName(response.name);
            setPhone(response.mobile);
        }             
    };

    useEffect(() => {
        if(cartItems?.items?.length == 0){
            navigate('/category');       
        }
    }, [cartItems]);

    useEffect(() => {
        const paymentResponse = JSON.parse(decodeURIComponent(payres));
        if(paymentResponse){
            setIsLoading(true);
            console.log(paymentResponse);
            if( paymentResponse.callback.response?.code != Number('000')) {
                setToaster({ type: 'error', message: 'Payment Failed! Please try again', duration: 3000 });
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
            else{
                const addPaymentPayload = {
                    "provider": paymentResponse?.callback.source?.payment_method,
                    "refCode": paymentResponse?.callback.order_id,
                    "amount": paymentResponse?.callback.amount
                }
                processOrder(addPaymentPayload);
            }
        }
    }, [payres]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
    
        switch (name) {
          case 'firstName':
            setFirstName(value);
            break;
          case 'phone':
            setPhone(value);
            const mobileFormat = /^9665\d{8}$/;
            if (!value.match(mobileFormat)) {
                setMobileError('Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit.');
                return;
            }else{
                setMobileError('');
            }           
            break;
          default:
            break;
        }
      }


    useEffect(() => {
        const checkoutOptionObj = {
            firstName: firstName,
            mobile: phone,
            deliveryoption: selectedDeliveryOption,
            paymentMethod: selectedPaymentMethod,
            onepayReferenceMode: selectedOnePayMethod
        }
        //setCheckoutOption(JSON.stringify(checkoutOptionObj));
        localStorage.setItem('checkoutInfo', JSON.stringify(checkoutOptionObj));
    }, [selectedDeliveryOption,selectedPaymentMethod,selectedOnePayMethod, firstName, phone]);

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


    const submitOrder = () => {

        if (!firstName) {
            setToaster({ type: 'error', message: 'Please enter customer name!', duration: 3000 });
            return false;
        }

        if (!phone) {
            setToaster({ type: 'error', message: 'Please enter customer mobile!', duration: 3000 });
            return false;
        }

        const mobileFormat = /^9665\d{8}$/;
        if (!phone.match(mobileFormat)) {
            setMobileError('Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit.');
            return;
        }

        if (!selectedDeliveryOption) {
            setToaster({ type: 'error', message: 'Please select delivery option!', duration: 3000 });
            return false;
        }

        if (!selectedPaymentMethod) {
            setToaster({ type: 'error', message: 'Please select payment method!', duration: 3000 });
            return false;
        }
        else if (selectedPaymentMethod.name === 'Online Checkout' && !selectedOnePayMethod) {
            setToaster({ type: 'error', message: 'Please select one pay method!', duration: 3000 });
            return false;
        }

        if (selectedPaymentMethod.name !== 'In-Store Checkout') {
            setSubmitLoading(true);
            const paymentPayload= {
                containerID:"root",
                gateway:{
                    publicKey:"pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
                    supportedCurrencies:"SAR",
                    supportedPaymentMethods: "all",
                    labels:{
                        cardNumber:"Card Number",
                        expirationDate:"MM/YY",
                        cvv:"CVV",
                        cardHolder:"Name on Card",
                        actionButton:"Pay"
                    },
                    style: {
                        base: {
                            color: '#535353',
                            lineHeight: '18px',
                            fontFamily: 'sans-serif',
                            fontSmoothing: 'antialiased',
                            fontSize: '16px',
                            '::placeholder': {
                                color: 'rgba(0, 0, 0, 0.26)',
                                fontSize:'15px'
                            }
                        },
                        invalid: {
                            color: 'red',
                            iconColor: '#fa755a'
                        }
                    }
                },
                customer:{
                    id:"cus_m1QB0320181401l1LD1812485",
                    first_name: firstName,
                    phone: {
                        country_code: "965",
                        number: phone
                    }
                },
                order:{
                    amount: subtotalPrice.toFixed(2),
                    currency:"SAR",
                    items:[]
                },
                transaction:{
                    mode: 'charge',
                    charge:{
                        redirect: window.location.origin + "/redirect.html"
                }
            }
            };

            cartItems.items.forEach((item) => {
                paymentPayload.order.items.push({
                    id:item.productVariantId,
                    name:item.name,
                    quantity:item.quantity,
                    amount_per_unit:item.price
                })
            });
            setSubmitLoading(false);
            let encodedObject = encodeURIComponent(JSON.stringify(paymentPayload));
            window.location.href = '/payment.html?payload=' + encodedObject;
        }
        else {
            const addPaymentPayload = {
                "provider": "POS",
                "refCode": (Math.random() + 1).toString(36).substring(7),
                "amount": subtotalPrice.toFixed(2)
            }
            processOrder(addPaymentPayload);
        }
    };

    const handleResponseError = (response) => {
        setIsLoading(false);
        if (response.errors) {
            Object.values(response.errors).forEach((errorArray) => {
                errorArray.forEach((errorMessage) => {
                    setToaster({ type: 'error', message: errorMessage, duration: 3000 });
                });
            });
        } else {
            setToaster({ type: 'error', message: 'Order failed. Please try again.', duration: 3000 });
        }
    };
    
    const processOrderSuccess = () => {
        setIsLoading(false);
        updateCartItems(null);
        localStorage.removeItem('checkoutInfo');
        setToaster({ type: 'success', message: 'Order has been succesfully placed!', duration: 3000 });
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };
    
    const processOrder = async (addPaymentPayload) => {
        setIsLoading(true);
        try {
            const storedCartInfo = localStorage.getItem('cartInfo');
            if (!storedCartInfo) return;
    
            const cartObj = JSON.parse(storedCartInfo);
            
            cartObj.items.forEach(async (item) => {
                await updateCartAPI(cartObj.id, item);
            });

            const initialResponse = await cartToOrder(cartObj.id);
            if (!initialResponse.succeeded) return handleResponseError(initialResponse);
    
            const orderId = initialResponse.data.id;
    
            const deliveryMethodResponse = await updatedeliveryMethod(orderId, { 'id': selectedDeliveryOption });
            if (!deliveryMethodResponse.succeeded) return handleResponseError(deliveryMethodResponse);
    
            const paymentMethodResponse = await updatePaymentMethod(orderId, { 'id': selectedPaymentMethod.id });
            if (!paymentMethodResponse.succeeded) return handleResponseError(paymentMethodResponse);
    
            const paymentResponse = await addPayment(orderId, addPaymentPayload);
            if (!paymentResponse.succeeded) return handleResponseError(paymentResponse);
    
            const checkoutResponse = await checkout(orderId);
            if (!checkoutResponse.succeeded) return handleResponseError(checkoutResponse);
    
            processOrderSuccess();
    
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating cart to order:', error);
        }
    };
    

    const handleClosePaymentPopup = () => {
        setIsPaymentPopupOpen(false);
    };

    const handlePayNowClick = () => {
        setIsPaymentPopupOpen(true);
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
            {isLoading ? <Loader showOverlay={true} size={30} color="#fff" isLoading={false} /> : ''}
            <div className="checkoutWraper">
                <div className="camelWraper">
                    <img src={camelBack} alt="" />
                </div>

                <div className="midCheckoutWraper">
                    {!loginResponse ? (
                        <div className="guestLoginWraper">
                            <h3>Please fill in the below <span className="subHeading">(Guest Login)</span></h3>
                            <div className="loginGuest">
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleInputChange} 
                                    placeholder="First Name *" 
                                    className="inputGuest" 
                                />
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={phone}
                                    onChange={handleInputChange} 
                                    placeholder="Phone *" 
                                    className="inputGuest" 
                                />
                                {mobileError && <span className="errorText">{mobileError}</span>}<br/>
                                <p className="guestLoginP">Already have an account? <b onClick={(e) => handleLoginClick(e)}>Sign in</b></p>
                            </div>
                        </div>
                    ) : ''}
                    <div className="paymentWraper">
                        <h3 onClick={handlePayNowClick}>Delivery Method</h3>
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
                                buttonText={selectedPaymentMethod?.name}
                                imgSrc={pay1}
                                fieldTitle="Payment Method"
                            />
                        }
                        {selectedPaymentMethod?.name === 'Online Checkout' ? (
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
                                        buttonText={selectedOnePayMethod?.name}
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
                    <div className="cartProductListings checkout">
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
                                            <input type="number" className="inputCounter" value={item.quantity} readOnly/>
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
