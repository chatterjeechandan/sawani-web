import React from 'react';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';

const FavouriteStores = () => {
    return (
        <>
            <Header />
            <ProfileSidebar />
            <h2>FavouriteStores Page</h2>
            <Footer />
        </>
    );
};

export default FavouriteStores;