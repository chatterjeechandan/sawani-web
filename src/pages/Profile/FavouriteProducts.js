import React from 'react';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';

const FavouriteProducts = () => {
    return (
        <>
            <Header />
            <ProfileSidebar />
            <h2>FavouriteProducts Page</h2>
            <Footer />
        </>
    );
};

export default FavouriteProducts;