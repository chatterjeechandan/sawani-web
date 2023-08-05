import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';
import editIcon from "../../assets/images/edit-circle.png";
import deleteIcon from "../../assets/images/delete-circle.png";
import saudi from "../../assets/images/saudi-arabia-2.png";

const SavedCardAdd = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages">
             <ProfileSidebar />
                <div className='profileRightWraper'>
                    <div className='pointAnalysisWraper'>
                        <div className='pointTabWraper'>
                           <h4 className='addressHeading'>Address Book</h4>
                           <div className='addressListings'>
                            <p className='addAddress'><Link to="/address-add" className="profileLinksTag">+ Add New Address</Link></p>
                            
                            <div className='indAddressList'>
                                <h5 className='addName'>Aisha Fahd</h5>
                                <p className='addpara'>Abdullah Bukhari, Aziziyah, Jeddah</p>
                                <p className='saudiWraper'>
                                    <img src={saudi} className='sausiIcon' alt=''/><span className='phoneNumbers'>
                                        <b>+966</b> 12 1234 345
                                    </span>
                                </p>
                                <span className='editAddress'>
                                    <span className='editAdd'>
                                        <img src={editIcon} alt='' />
                                    </span>
                                    <span className='deleteAdd'>
                                        <img src={deleteIcon} alt='' />
                                    </span>
                                </span>
                            </div>
                            <div className='indAddressList'>
                                <h5 className='addName'>Aisha Fahd</h5>
                                <p className='addpara'>Abdullah Bukhari, Aziziyah, Jeddah</p>
                                <p className='saudiWraper'>
                                    <img src={saudi} className='sausiIcon' alt=''/><span className='phoneNumbers'>
                                        <b>+966</b> 12 1234 345
                                    </span>
                                </p>
                                <span className='editAddress'>
                                    <span className='editAdd'>
                                        <img src={editIcon} alt='' />
                                    </span>
                                    <span className='deleteAdd'>
                                        <img src={deleteIcon} alt='' />
                                    </span>
                                </span>
                            </div>
                            <div className='indAddressList'>
                                <h5 className='addName'>Aisha Fahd</h5>
                                <p className='addpara'>Abdullah Bukhari, Aziziyah, Jeddah</p>
                                <p className='saudiWraper'>
                                    <img src={saudi} className='sausiIcon' alt=''/><span className='phoneNumbers'>
                                        <b>+966</b> 12 1234 345
                                    </span>
                                </p>
                                <span className='editAddress'>
                                    <span className='editAdd'>
                                        <img src={editIcon} alt='' />
                                    </span>
                                    <span className='deleteAdd'>
                                        <img src={deleteIcon} alt='' />
                                    </span>
                                </span>
                            </div>
                            <div className='indAddressList'>
                                <h5 className='addName'>Aisha Fahd</h5>
                                <p className='addpara'>Abdullah Bukhari, Aziziyah, Jeddah</p>
                                <p className='saudiWraper'>
                                    <img src={saudi} className='sausiIcon' alt=''/><span className='phoneNumbers'>
                                        <b>+966</b> 12 1234 345
                                    </span>
                                </p>
                                <span className='editAddress'>
                                    <span className='editAdd'>
                                        <img src={editIcon} alt='' />
                                    </span>
                                    <span className='deleteAdd'>
                                        <img src={deleteIcon} alt='' />
                                    </span>
                                </span>
                            </div>
                           </div>
                        </div>

                        <div className='questionsWrapers'>
                            <h3>We want to get to know you</h3>
                            <button className='qusBtn'>Answer Questionnaire</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SavedCardAdd;