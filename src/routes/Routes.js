import React from 'react';
import { BrowserRouter as Router, Route, Routes as AppRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoryListingPage from "../pages/CategoryListingPage";

const Routes = () => {
    return (
        <Router>
            <AppRoutes>
                <Route path="/" element={<HomePage />} />
                {/* Add more routes for other pages */}
                <Route path="/category" element={<CategoryListingPage />} />
            </AppRoutes>
        </Router>
    );
};

export default Routes;