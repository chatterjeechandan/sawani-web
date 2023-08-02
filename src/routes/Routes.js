import React from 'react';
import { BrowserRouter as Router, Route, Routes as AppRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoryListingPage from "../pages/CategoryListingPage";
import DeliveryPage from "../pages/DeliveryPage";
import ProductList from "../pages/ProductListingPage";
import Product from "../pages/ProductDetailsPage";
import Checkout from "../pages/CheckoutPage";
import ContactUs from "../pages/ContactUs";
import ProfileRoutes from "../pages/Profile/ProfileRoutes";

const Routes = () => {
    return (
        <Router>
            <AppRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category" element={<CategoryListingPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/profile/*" element={<ProfileRoutes />} />
            </AppRoutes>
        </Router>
    );
};

export default Routes;
