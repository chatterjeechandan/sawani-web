import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RewardsPointPage from "./RewardsPoint";
import AddressList from "./AddressList";
import AddressAdd from "./AddressAdd";
import FavouriteProducts from "./FavouriteProducts";
import SavedCardAdd from "./SavedCardAdd";
import SavedCardList from "./SavedCardList";
import FavouriteStores from "./FavouriteStores";
import EditProfile from "./EditProfile";
import AddressEdit from "./EditProfile";

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route index element={<RewardsPointPage />} />
            <Route path="/rewards-point" element={<RewardsPointPage />} />
            <Route path="/saved-address" element={<AddressList />} />
            <Route path="/address-add" element={<AddressAdd />} />
            <Route path="/edit-address/:id" component={AddressEdit} />
            <Route path="/saved-card" element={<SavedCardList />} />
            <Route path="/card-add" element={<SavedCardAdd />} />
            <Route path="/favourite-store" element={<FavouriteStores />} />
            <Route path="/favourite-product" element={<FavouriteProducts />} />
            <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
    );
};

export default ProfileRoutes;