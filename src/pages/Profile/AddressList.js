import React from 'react';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';

const AddressList = () => {
    return (
        <>
            <Header />
            <ProfileSidebar />
            <h2>AddressList Page</h2>
            <Footer />
        </>
    );
};

export default AddressList;