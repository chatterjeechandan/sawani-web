import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as AppRoutes
} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import InStorePage from "../pages/InStorePage";
import PickupPage from "../pages/PickupPage";
import DeliveryPage from "../pages/DeliveryPage";
import ProductList from "../pages/ProductListingPage";
import Product from "../pages/ProductDetailsPage";
import Checkout from "../pages/CheckoutPage";
import ContactUs from "../pages/ContactUs";
import ProfileRoutes from "../pages/Profile/ProfileRoutes";
import RewardsPointPage from "../pages/Profile/RewardsPoint";
import AddressList from "../pages/Profile/AddressList";
import AddressAdd from "../pages/Profile/AddressAdd";
import FavouriteProducts from "../pages/Profile/FavouriteProducts";
import SavedCardAdd from "../pages/Profile/SavedCardAdd";
import SavedCardList from "../pages/Profile/SavedCardList";
import FavouriteStores from "../pages/Profile/FavouriteStores";
import ThankYou from "../pages/Thankyou";
import { AuthContext } from "../utils/AuthContext";
import { Navigate } from 'react-router-dom';

const Routes = () => {
  const { loginResponse,  } = useContext(AuthContext);
  
  
  function PrivateRoute({ element }) {
    return loginResponse ? element : <Navigate to="/" replace />;
  } 

  return (
    <Router>
      <AppRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/in-store" element={<InStorePage />} />
        <Route path="/pickup" element={<PickupPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/rewards-point" element={<RewardsPointPage />} />
        <Route path="/saved-address" element={<AddressList />} />
        <Route path="/address-add" element={<AddressAdd />} />
        <Route path="/saved-card" element={<SavedCardList />} />
        <Route path="/card-add" element={<SavedCardAdd />} />
        <Route path="/favourite-store" element={<FavouriteStores />} />
        <Route path="/favourite-product" element={<FavouriteProducts />} />
        <Route path="/profile/*" element={<PrivateRoute element={<ProfileRoutes />} />} />
        <Route path="/thankyou/:id" element={<ThankYou />} />
      </AppRoutes>
    </Router>
  );
};

export default Routes;
