import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as AppRoutes,
} from "react-router-dom";
//import HomePage from "../pages/home/HomePage";
import InStorePage from "../pages/InStorePage";
import PickupPage from "../pages/PickupPage";
import DeliveryPage from "../pages/DeliveryPage";
import ProductList from "../pages/ProductListingPage";
import Product from "../pages/ProductDetailsPage";
import Checkout from "../pages/CheckoutPage";
import ContactUs from "../pages/ContactUs";
import ProfileRoutes from "../pages/Profile/ProfileRoutes";
import ThankYou from "../pages/Thankyou";
import { AuthContext } from "../utils/AuthContext";
import { Navigate } from "react-router-dom";

const Routes = () => {
  const { loginResponse, isAuthChecking } = useContext(AuthContext);

  function PrivateRoute({ element }) {
    if (isAuthChecking) {
      return null;
    }
    return loginResponse ? element : <Navigate to="/" replace />;
  }

  return (
    <Router>
      <AppRoutes>
        <Route path="/" element={<InStorePage />} />
        <Route path="/in-store" element={<InStorePage />} />
        <Route path="/pickup" element={<PickupPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/products/:pcat" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/profilexxx/*"
          element={<PrivateRoute element={<ProfileRoutes />} />}
        />
        <Route path="/thankyou/:id" element={<ThankYou />} />
      </AppRoutes>
    </Router>
  );
};

export default Routes;
