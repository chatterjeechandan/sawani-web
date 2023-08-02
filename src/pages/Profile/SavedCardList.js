import React from 'react';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';

const SavedCardList = () => {
    return (
        <>
            <Header />
            <ProfileSidebar />
            <h2>SavedCardList Page</h2>
            <Footer />
        </>
    );
};

export default SavedCardList;