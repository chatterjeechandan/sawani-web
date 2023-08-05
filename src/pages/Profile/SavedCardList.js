import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';
import visa from "../../assets/images/Visa-Logo.png";
import masterCard from "../../assets/images/Mastercard-logo.png";

const SavedCardList = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages">
             <ProfileSidebar />
                <div className='profileRightWraper'>
                    <div className='pointAnalysisWraper'>
                        <div className='pointTabWraper'>
                           <h4 className='addressHeading'><span className='notBold'>Registered</span> Credit/Debit Cards</h4>
                           <div className='addressListings'>
                            <p className='addAddress'><Link to="/card-add" className="profileLinksTag">+ Add New Card</Link></p>
                            
                            <div className='indCard activated'>
                                <div className='cardInfos'>
                                    <p className='cardNumber'>XXXX XXXX XXXX 6789</p>
                                    <p className='cardname'>Aisha Fahd</p>
                                </div>
                                <div className='cardLogo'>
                                    <img src={visa} className='cardLogoImg' alt='' />
                                </div>
                            </div>
                            <div className='indCard'>
                                <div className='cardInfos'>
                                    <p className='cardNumber'>XXXX XXXX XXXX 6789</p>
                                    <p className='cardname'>Aisha Fahd</p>
                                </div>
                                <div className='cardLogo'>
                                    <img src={masterCard} className='cardLogoImg' alt='' />
                                </div>
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

export default SavedCardList;