import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import Header from "../components/common/layout/Header/Header";
import Footer from "../components/common/layout/Footer";
import camelBack from "../assets/images/camelBacks.png";
import counterPlus from "../assets/images/smallPlus.png";
import apple from "../assets/images/apples.png";
import rewards from "../assets/images/rewardPoint.png";
import payLogo from "../assets/images/payLogo.png";
import pCreditCardLogo from "../assets/images/credit-card.png";
import { CartContext } from "../utils/CartContext";
import productInd from "../assets/images/pr1.png";
import {
  updateCartAPI,
  deleteCartAPI,
  addCartAPI,
  getCartAPI,
} from "../api/cart";
import minus from "../assets/images/minusWhite.png";
import { AuthContext } from "../utils/AuthContext";
import Loader from "../components/common/Loader/Loader";
import { DialogSelect } from "../components/common/DialogSelect/DialogSelect";
import RadioButtonsWithImages from "../components/common/RadioButtonsWithImages/RadioButtonsWithImages";
import r1 from "../assets/images/r1.png";
import r2 from "../assets/images/r2.png";
import r3 from "../assets/images/r3.png";
import pay1 from "../assets/images/pay1.png";
import {
  getDeliveryMethodAPI,
  getPaymentMethodAPI,
  getOnePayMethodAPI,
} from "../api/lookup";
import Toaster from "../components/common/Toaster/Toaster";
import {
  cartToOrder,
  updatedeliveryMethod,
  updatePaymentMethod,
  addPayment,
  checkout,
  updateAnonymousOrder,
} from "../api/order";
import { useNavigate, useLocation } from "react-router-dom";
import { getConfig } from "../config/site.config";
import {
  getCusertomerDetails,
  checkAnonymousUserMob,
  createAnonymousUser,
} from "../api/customer";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import GoSellElement from "../components/templates/PaymentPopup/GoSellElement";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  ApplePayButton,
  ThemeMode,
  SupportedNetworks,
  Scope,
  Environment,
  Locale,
  ButtonType,
  Edges,
} from "@tap-payments/apple-pay-button";

const Checkout = () => {
  const { cartItems, updateCartItems } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const { loginResponse } = useContext(AuthContext);
  const [isinlineLoadingDelivery, setIsinlineLoadingDelivery] = useState(false);
  const [isinlineLoadingPayment, setIsinlineLoadingPayment] = useState(false);
  const [isinlineLoadingOnePay, setIsinlineLoadingOnePay] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [allDeliveryOption, setAllDeliveryOption] = useState(null);
  const [allPaymentMethod, setAllPaymentMethod] = useState(null);
  const [allOnePaymMethod, setAllOnePaymMethod] = useState(null);
  const [issubmitLoading, setSubmitLoading] = useState(false);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [paymentPayload, setPaymentPayload] = useState(null);
  const [isSafari, setIsSafari] = useState(false);
  const [toaster, setToaster] = useState(null);
  const headerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const payres = searchParams.get("payres");
  const payError = searchParams.get("error");
  const tap_id = searchParams.get("tap_id");
  const { t } = useTranslation();
  const selectedDeliveryTypes = localStorage.getItem("selectedDeliveryType");
  const SITE_CONFIG = getConfig();

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(() => {
    const storedCheckoutInfo = localStorage.getItem("checkoutInfo");
    if (storedCheckoutInfo) {
      const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
      return checkoutFromStorage.deliveryoption
        ? checkoutFromStorage.deliveryoption
        : "";
    }
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(() => {
    const storedCheckoutInfo = localStorage.getItem("checkoutInfo");
    if (storedCheckoutInfo) {
      const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
      return checkoutFromStorage.paymentMethod
        ? checkoutFromStorage.paymentMethod
        : "";
    }
  });
  const [selectedOnePayMethod, setSelectedOnePayMethod] = useState(() => {
    const storedCheckoutInfo = localStorage.getItem("checkoutInfo");
    if (storedCheckoutInfo) {
      const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
      return checkoutFromStorage.onepayReferenceMode
        ? checkoutFromStorage.onepayReferenceMode
        : "";
    }
  });
  const [firstName, setFirstName] = useState(() => {
    const storedCheckoutInfo = localStorage.getItem("checkoutInfo");
    if (storedCheckoutInfo) {
      const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
      return checkoutFromStorage.firstName ? checkoutFromStorage.firstName : "";
    }
  });
  const [phone, setPhone] = useState(() => {
    const storedCheckoutInfo = localStorage.getItem("checkoutInfo");
    if (storedCheckoutInfo) {
      const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
      return checkoutFromStorage.mobile ? checkoutFromStorage.mobile : "";
    }
  });

  useEffect(() => {
    const storedCartInfo = localStorage.getItem("cartInfo");
    if (!storedCartInfo) navigate("/in-store");
    const cartObj = JSON.parse(storedCartInfo);
    if (cartObj?.items?.length === 0) {
      navigate("/in-store");
    }
    getDeliveryMethods();
    getPaymentMethods();
    getOnePayMethods();

    const userAgent = window.navigator.userAgent;
    const safariCheck = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(safariCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loginResponse) {
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
    if (cartItems?.items?.length === 0) {
      navigate("/in-store");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  useEffect(() => {
    if (payError) {
      setIsLoading(false);
      setToaster({
        type: "error",
        message: t("Payment Failed! Please try again"),
        duration: 3000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payError]);

  useEffect(() => {
    const paymentResponse = JSON.parse(decodeURIComponent(payres));
    if (paymentResponse) {
      setIsLoading(true);
      if (paymentResponse.callback.response?.code !== Number("000")) {
        setToaster({
          type: "error",
          message: t("Payment Failed! Please try again"),
          duration: 3000,
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        const addPaymentPayload = {
          provider: "TAP",
          refCode: paymentResponse?.callback.id,
          amount: paymentResponse?.callback.amount,
        };
        processOrder(addPaymentPayload);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payres]);

  useEffect(() => {
    if (tap_id) {
      setIsLoading(true);
      const orderId = localStorage.getItem("selectedOrderId");
      handleCheckout(orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tap_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "phone":
        setPhone(value);
        const mobileFormat = /^9665\d{8}$/;
        if (!value.match(mobileFormat)) {
          setMobileError(
            t(
              "Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit."
            )
          );
          return;
        } else {
          setMobileError("");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedDeliveryTypes) {
      setSelectedDeliveryOption(selectedDeliveryTypes);
    }
  }, [selectedDeliveryTypes]);

  useEffect(() => {
    if (selectedDeliveryOption === "2") {
      setSelectedPaymentMethod({
        id: 1,
        name: "Online Checkout",
      });
      setSelectedOnePayMethod({
        name: "Apple Pay",
        image: "Resources/OnePayMethod/apple.png",
        flgStatus: 1,
        id: 1,
        createDate: "2023-08-17T17:37:06.6500117",
        updateDate: "2023-08-17T17:37:06.6500119",
      });
    }
  }, [selectedDeliveryOption]);

  useEffect(() => {
    if (selectedPaymentMethod) {
      const storedCheckoutInfo = localStorage.getItem("checkoutInfo");
      if (storedCheckoutInfo) {
        const checkoutFromStorage = JSON.parse(storedCheckoutInfo);
        if (!checkoutFromStorage.onepayReferenceMode) {
          setSelectedOnePayMethod({
            name: "Apple Pay",
            image: "Resources/OnePayMethod/apple.png",
            flgStatus: 1,
            id: 1,
            createDate: "2023-08-17T17:37:06.6500117",
            updateDate: "2023-08-17T17:37:06.6500119",
          });
        }
      }
    }
  }, [selectedPaymentMethod]);

  useEffect(() => {
    const checkoutOptionObj = {
      firstName: firstName,
      mobile: phone,
      deliveryoption: selectedDeliveryOption,
      paymentMethod: selectedPaymentMethod,
      onepayReferenceMode: selectedOnePayMethod,
    };
    localStorage.setItem("checkoutInfo", JSON.stringify(checkoutOptionObj));
  }, [
    selectedDeliveryOption,
    selectedPaymentMethod,
    selectedOnePayMethod,
    firstName,
    phone,
  ]);

  const getDeliveryMethods = async () => {
    setIsinlineLoadingDelivery(true);
    try {
      const response = await getDeliveryMethodAPI();
      if (response.length > 0) {
        setAllDeliveryOption(response);
        setIsinlineLoadingDelivery(false);
      }
    } catch (error) {
      console.error("Error fetching delivery methods:", error);
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
      console.error("Error fetching payment methods:", error);
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
      console.error("Error fetching onepay methods:", error);
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
  };

  const deleteCartItem = async (cartItems, updatedCartItems, index) => {
    cartItems.items.splice(index, 1);
    updateCartItems(cartItems);
  };

  const updateCartItem = async (cartItems, index) => {
    updateCartItems(cartItems);
  };

  const calculateSubtotal = () => {
    if (!cartItems || !cartItems.items) return 0;

    return cartItems.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subtotalPrice = useMemo(() => calculateSubtotal(), [cartItems]);

  const calculateRewardstotal = () => {
    if (!cartItems || !cartItems.items) return 0;

    return cartItems.items.reduce(
      (acc, item) => acc + item.rewards * item.quantity,
      0
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalRewards = useMemo(() => calculateRewardstotal(), [cartItems]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (!loginResponse) {
      headerRef.current.loginClickedCheckout(e);
    }
  };

  const handleSelectPaymentMethod = (option) => {
    if (typeof option === "string") {
      setSelectedPaymentMethod(JSON.parse(option));
    } else {
      setSelectedPaymentMethod(option);
    }
  };

  const handleSelectOnePayMethod = (option) => {
    if (typeof option === "string") {
      setSelectedOnePayMethod(JSON.parse(option));
    } else {
      setSelectedOnePayMethod(option);
    }
  };

  const imageUrls = [r1, r2, r3];

  const handleToasterClose = () => {
    setToaster(null);
  };

  const submitOrder = async () => {
    if (!firstName) {
      setToaster({
        type: "error",
        message: t("Please enter customer name!"),
        duration: 3000,
      });
      return false;
    }

    if (!phone) {
      setToaster({
        type: "error",
        message: t("Please enter customer mobile!"),
        duration: 3000,
      });
      return false;
    }

    const mobileFormat = /^9665\d{8}$/;
    if (!phone.match(mobileFormat)) {
      setMobileError(
        t(
          "Invalid mobile number format. Expected format: 9665XXXXXXXX where X is a digit."
        )
      );
      return;
    }

    if (!loginResponse) {
      const canProceed = await checkAnonymousUser();
      if (!canProceed) {
        return false;
      }
    }

    if (!selectedDeliveryOption) {
      setToaster({
        type: "error",
        message: t("Please select delivery option!"),
        duration: 3000,
      });
      return false;
    }

    if (!selectedPaymentMethod) {
      setToaster({
        type: "error",
        message: t("Please select payment method!"),
        duration: 3000,
      });
      return false;
    } else if (
      selectedPaymentMethod.name === "Online Checkout" &&
      !selectedOnePayMethod
    ) {
      setToaster({
        type: "error",
        message: t("Please select one pay method!"),
        duration: 3000,
      });
      return false;
    }

    if (selectedPaymentMethod.name !== "In-Store Checkout") {
      setSubmitLoading(true);
      const paymentPayloadObj = {
        gateway: {
          publicKey: `${SITE_CONFIG.tapPubKey_dev}`,
          merchantId: `${SITE_CONFIG.tapMerchantId}`,
          supportedCurrencies: "SAR",
          supportedPaymentMethods: ["AMERICAN_EXPRESS", "VISA", "MASTERCARD"],
          labels: {
            cardNumber: "Card Number",
            expirationDate: "MM/YY",
            cvv: "CVV",
            cardHolder: "Name on Card",
            actionButton: "Pay",
          },
          style: {
            base: {
              color: "#535353",
              lineHeight: "18px",
              fontFamily: "sans-serif",
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "rgba(0, 0, 0, 0.26)",
                fontSize: "15px",
              },
            },
            invalid: {
              color: "red",
              iconColor: "#fa755a",
            },
          },
        },
        customer: {
          first_name: firstName,
          phone: {
            country_code: "965",
            number: phone,
          },
        },
        order: {
          amount: subtotalPrice.toFixed(2),
          currency: "SAR",
          items: [],
        },
        transaction: {
          mode: "token",
        },
      };
      cartItems.items.forEach((item) => {
        paymentPayloadObj.order.items.push({
          id: item.productVariantId,
          name: item.name,
          quantity: item.quantity,
          amount_per_unit: item.price,
        });
      });
      setPaymentPayload(paymentPayloadObj);
      if (selectedOnePayMethod?.name === "Apple Pay") {
      } else {
        setSubmitLoading(false);
        setOpenPaymentPopup(true);
      }
    } else {
      setSubmitLoading(false);
      const addPaymentPayload = {
        provider: "POS",
        refCode: (Math.random() + 1).toString(36).substring(7),
        amount: subtotalPrice.toFixed(2),
      };
      processOrder(addPaymentPayload);
    }
  };

  const checkAnonymousUser = async () => {
    setIsLoading(true);
    try {
      const response = await checkAnonymousUserMob(phone);
      setIsLoading(false);
      if (!response.StatusCode) {
        setToaster({
          type: "error",
          message: t(
            "Mobile number already exists! Please login into your account"
          ),
          duration: 3000,
        });
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error fetching favourite producucts:", error);
    }
  };

  const handleResponseError = (response) => {
    setIsLoading(false);
    if (Array.isArray(response.errors)) {
      response.errors.forEach((errorMessage) => {
        setToaster({
          type: "error",
          message: errorMessage,
          duration: 3000,
        });
      });
    } else if (response.Message) {
      setToaster({
        type: "error",
        message: response.Message,
        duration: 3000,
      });
    } else {
      setToaster({
        type: "error",
        message: t("Order failed. Please try again."),
        duration: 3000,
      });
    }
  };

  const processOrderSuccess = (order) => {
    setIsLoading(false);
    updateCartItems(null);
    localStorage.removeItem("checkoutInfo");
    localStorage.removeItem("selectedDeliveryType");
    localStorage.removeItem("selectedOrderId");
    setToaster({
      type: "success",
      message: t("Order has been succesfully placed!"),
      duration: 3000,
    });
    setTimeout(() => {
      navigate(`/thankyou/${order.data.id}`);
    }, 1000);
  };

  const processOrder = async (addPaymentPayload) => {
    setIsLoading(true);
    try {
      const storedCartInfo = localStorage.getItem("cartInfo");
      if (!storedCartInfo) return;
      const cartObj = JSON.parse(storedCartInfo);
      const getActualCartResponse = await getCartAPI(cartObj.id);

      for (const item of cartObj.items) {
        const existingCartItemIndex =
          getActualCartResponse.data.items.findIndex(
            (innerItem) => innerItem.productVariantId === item.productVariantId
          );
        if (existingCartItemIndex !== -1) {
          await updateCartAPI(cartObj.id, item);
        } else {
          await addCartAPI(cartObj.id, item);
        }
      }

      for (const item1 of getActualCartResponse.data.items) {
        const existingCartItemIndex1 = cartObj.items.findIndex(
          (innerItem) => innerItem.productVariantId === item1.productVariantId
        );
        if (existingCartItemIndex1 === -1) {
          await deleteCartAPI(cartObj.id, item1);
        }
      }

      const initialResponse = await cartToOrder(cartObj.id);
      if (!initialResponse.succeeded)
        return handleResponseError(initialResponse);

      const orderId = initialResponse.data.id;

      const storedLoginInfo = localStorage.getItem("loginInfo");

      localStorage.setItem("selectedOrderId", orderId);

      if (!storedLoginInfo) {
        const createAnonymousUserPayload = {
          name: firstName,
          mobile: phone,
        };
        const createAnonymousUserResponse = await createAnonymousUser(
          createAnonymousUserPayload
        );

        if (createAnonymousUserResponse) {
          await updateAnonymousOrder(orderId, createAnonymousUserResponse.id);
        }
      }

      const deliveryMethodResponse = await updatedeliveryMethod(orderId, {
        id: selectedDeliveryOption,
      });
      if (!deliveryMethodResponse.succeeded)
        return handleResponseError(deliveryMethodResponse);

      const paymentMethodResponse = await updatePaymentMethod(orderId, {
        id: selectedPaymentMethod.id,
      });
      if (!paymentMethodResponse.succeeded)
        return handleResponseError(paymentMethodResponse);

      const paymentResponse = await addPayment(orderId, addPaymentPayload);
      if (!paymentResponse.succeeded)
        return handleResponseError(paymentResponse);

      if (selectedPaymentMethod?.name === "Online Checkout") {
        if (selectedOnePayMethod?.name === "Apple Pay") {
          handleCheckout(orderId);
        } else {
          window.location.href = paymentResponse.data.payments[0].chargeURL;
        }
      } else {
        handleCheckout(orderId);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating cart to order:", error);
    }
  };

  const handleCheckout = async (orderId) => {
    const storedCartInfo = localStorage.getItem("cartInfo");
    if (!storedCartInfo) return;
    const cartObj = JSON.parse(storedCartInfo);
    const checkoutResponse = await checkout(orderId);
    if (!checkoutResponse.succeeded)
      return handleResponseError(checkoutResponse);

    for (const item of cartObj.items) {
      await deleteCartAPI(cartObj.id, item);
    }
    processOrderSuccess(checkoutResponse);
  };

  const handleTransactionComplete = (response) => {
    setOpenPaymentPopup(false);
    const addPaymentPayload = {
      provider: "TAP",
      refCode: response.id,
      amount: subtotalPrice,
    };
    processOrder(addPaymentPayload);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenPaymentPopup(false);
    }
  };

  const closePaymentPopup = (e) => {
    setOpenPaymentPopup(false);
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
      {isLoading ? (
        <Loader showOverlay={true} size={30} color="#fff" isLoading={false} />
      ) : (
        ""
      )}
      <div className="checkoutWraper">
        <div className="camelWraper">
          <img src={camelBack} alt="" />
        </div>

        <div className="midCheckoutWraper">
          {!loginResponse ? (
            <div className="guestLoginWraper">
              <h3>
                {t("Please fill in the below")}{" "}
                <span className="subHeading">({t("Guest Login")})</span>
              </h3>
              <div className="loginGuest">
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  placeholder={`${t("First Name")} *`}
                  className="inputGuest"
                />
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  placeholder={`${t("Phone Number")} *`}
                  className="inputGuest"
                />
                {mobileError && (
                  <span className="errorText">{mobileError}</span>
                )}
                <br />
                <p className="guestLoginP">
                  {t("You already have an account?")}{" "}
                  <b onClick={(e) => handleLoginClick(e)}>{t("Sign in")}</b>
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="paymentWraper">
            <h3>{t("Delivery Method")}</h3>
            <div className="infodetails margin-20">
              {isinlineLoadingDelivery ? (
                <Loader
                  showOverlay={false}
                  size={20}
                  color="#B7854C"
                  isLoading={false}
                />
              ) : (
                <RadioButtonsWithImages
                  options={allDeliveryOption}
                  selectedOption={selectedDeliveryOption}
                  onChange={setSelectedDeliveryOption}
                  imageUrls={imageUrls}
                />
              )}
            </div>
            <h3>{t("Payment Method")}</h3>
            {isinlineLoadingPayment ? (
              <Loader
                showOverlay={false}
                size={20}
                color="#B7854C"
                isLoading={false}
              />
            ) : (
              <div
                className={selectedDeliveryOption === "2" ? "no-click" : ""}
                disabled={selectedDeliveryOption === "2"}
              >
                <DialogSelect
                  options={allPaymentMethod}
                  selectedOption={selectedPaymentMethod}
                  onSelect={handleSelectPaymentMethod}
                  buttonText={selectedPaymentMethod?.name}
                  imgSrc={pay1}
                  fieldTitle={t("Payment Method")}
                />
              </div>
            )}
            {selectedPaymentMethod?.name === "Online Checkout" ? (
              <>
                <div className="paymentInfoLogo">
                  <img src={payLogo} alt="" />
                </div>
                {isinlineLoadingOnePay ? (
                  <Loader
                    showOverlay={false}
                    size={20}
                    color="#B7854C"
                    isLoading={false}
                  />
                ) : (
                  <DialogSelect
                    options={allOnePaymMethod}
                    selectedOption={selectedOnePayMethod}
                    onSelect={handleSelectOnePayMethod}
                    buttonText={selectedOnePayMethod?.name}
                    imgSrc={
                      selectedOnePayMethod?.name === "Apple Pay"
                        ? apple
                        : pCreditCardLogo
                    }
                    fieldTitle={t("1Pay Method")}
                  />
                )}
              </>
            ) : (
              ""
            )}
            {((selectedPaymentMethod?.name === "Online Checkout" &&
              selectedOnePayMethod?.name !== "Apple Pay") ||
              selectedPaymentMethod?.name !== "Online Checkout") && (
              <button className="payCheckOutBtn" onClick={(e) => submitOrder()}>
                {issubmitLoading ? (
                  <Loader
                    showOverlay={false}
                    size={12}
                    color="#ffffff"
                    isLoading={true}
                  />
                ) : (
                  t("PAY NOW")
                )}
              </button>
            )}
            {selectedPaymentMethod?.name === "Online Checkout" &&
              selectedOnePayMethod?.name === "Apple Pay" && (
                <div>
                  {isSafari ? (
                    <ApplePayButton
                      publicKey={SITE_CONFIG.tapPubKey_dev}
                      environment={Environment.Development}
                      debug
                      merchant={{
                        domain: SITE_CONFIG.baseUrl,
                        id: SITE_CONFIG.tapMerchantId,
                      }}
                      transaction={{
                        amount: subtotalPrice.toFixed(2),
                        currency: "SAR",
                      }}
                      scope={Scope.TapToken}
                      acceptance={{
                        supportedBrands: [
                          SupportedNetworks.Mada,
                          SupportedNetworks.Visa,
                          SupportedNetworks.MasterCard,
                        ],
                        supportedCards: ["DEBIT", "CREDIT"],
                        supportedCardsWithAuthentications: ["3DS", "EMV"],
                      }}
                      customer={{
                        name: [
                          {
                            lang: Locale.EN,
                            first: firstName,
                          },
                        ],
                        contact: {
                          phone: {
                            countryCode: "+965",
                            number: phone,
                          },
                        },
                      }}
                      interface={{
                        locale: Locale.EN,
                        theme: ThemeMode.DARK,
                        type: ButtonType.BUY,
                        edges: Edges.CURVED,
                      }}
                      onCancel={() => {
                        setIsLoading(false);
                        setSubmitLoading(false);
                        setToaster({
                          type: "error",
                          message: t("Payment Cancled! Please try again"),
                          duration: 3000,
                        });
                      }}
                      onError={(err) => {
                        console.log(err);
                        setIsLoading(false);
                        if (!firstName) {
                          setToaster({
                            type: "error",
                            message: t("Please enter customer name!"),
                            duration: 3000,
                          });
                          return false;
                        } else if (!phone) {
                          setToaster({
                            type: "error",
                            message: t("Please enter customer mobile!"),
                            duration: 3000,
                          });
                          return false;
                        } else {
                          setToaster({
                            type: "error",
                            message: t(
                              "Apple Pay button initialization Failed! Please try again"
                            ),
                            duration: 3000,
                          });
                        }
                      }}
                      onSuccess={async (token) => {
                        setSubmitLoading(false);
                        const addPaymentPayload = {
                          provider: "TAP",
                          refCode: token,
                          amount: subtotalPrice.toFixed(2),
                        };
                        processOrder(addPaymentPayload);
                      }}
                      onClick={() => {
                        submitOrder();
                      }}
                    />
                  ) : (
                    <div>
                      {selectedPaymentMethod?.name === "Online Checkout" && (
                        <p color="red">
                          {t("This payment method is only supported in Safari")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
        <div className="rightCheckoutWraper">
          <h2 className="checkoutProductHeading">{t("Shopping Cart")}</h2>
          <div className="cartProductListings checkout">
            {cartItems &&
              cartItems.items &&
              cartItems.items.map((item, index) => (
                <div className="individualCartProducts" key={index}>
                  <span className="productCartImage">
                    <img
                      src={
                        item?.image
                          ? `data:image/png;base64,${item.image}`
                          : productInd
                      }
                      alt=""
                    />
                  </span>
                  <span className="midCartDetailsEdit">
                    <h5 className="indCartProductName">{item.name}</h5>
                    <p className="productPriceInd">
                      <span>{item.price}</span> {t("SAR")}
                    </p>
                    <span className="counterWraper checkoutcounters">
                      <span
                        className="minusCounter"
                        onClick={() => handleCountChange(index, -1)}
                      >
                        <img src={minus} alt="" />
                      </span>
                      <span className="counterInput">
                        <input
                          type="number"
                          className="inputCounter"
                          value={item.quantity}
                          readOnly
                        />
                      </span>
                      <span
                        className="plusCounter"
                        onClick={() => handleCountChange(index, 1)}
                      >
                        <img src={counterPlus} alt="" />
                      </span>
                    </span>
                  </span>
                  <span
                    className="deleteSpan"
                    onClick={() => deleteCartItemRow(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              ))}
          </div>
          <div className="finalCartBills">
            <div className="subTotal">
              <span className="totalHeading">{t("Subtotal")}</span>
              <span className="totalPrice"> {subtotalPrice.toFixed(2)}</span>
            </div>
            <div className="rewardSectionsWrapers">
              <span className="totalHeading points">
                {t("POINTS")}
                {!loginResponse ? (
                  <span
                    className="subPoints"
                    onClick={(e) => handleLoginClick(e)}
                  >
                    {t("Sign in to earn")}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <span className="totalPrice points">
                <span className="rewardsIconImg">
                  <img src={rewards} alt="" />
                </span>
                +{totalRewards.toFixed(2)} {t("POINTS")}
              </span>
            </div>
          </div>
          <div className="grandTotalWraper rewardSectionsWrapers">
            <span className="grandHeading">{t("TOTAL")}</span>
            <span className="grandHeading grandPrice">
              {subtotalPrice.toFixed(2)} {t("SAR")}
            </span>
          </div>
        </div>
      </div>
      <Footer />
      {openPaymentPopup && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          {toaster && (
            <Toaster
              type={toaster.type}
              message={toaster.message}
              duration={toaster.duration}
              onClose={handleToasterClose}
            />
          )}
          <div className="popup-content">
            <h2>Please fill your card information</h2>
            <button
              className="closeBtn"
              type="button"
              onClick={closePaymentPopup}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="loginFormWraper">
              <GoSellElement
                config={paymentPayload}
                onTransactionComplete={handleTransactionComplete}
                selectedOnePayMethod={selectedOnePayMethod}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
