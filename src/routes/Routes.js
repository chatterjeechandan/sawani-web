import React from 'react';
import { BrowserRouter as Router, Route, Routes as AppRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoryListingPage from "../pages/CategoryListingPage";
import DeliveryPage from "../pages/DeliveryPage";

const Routes = () => {
    return (
        <Router>
            <AppRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category" element={<CategoryListingPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
            </AppRoutes>
        </Router>
    );
};

export default Routes;