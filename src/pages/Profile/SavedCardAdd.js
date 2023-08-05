import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';

const SavedCardAdd = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages">
             <ProfileSidebar />
                <div className='profileRightWraper'>
                    <div className='pointAnalysisWraper'>
                        <div className='pointTabWraper inputWrapers'>
                           <h4 className='addressHeading'>Add/Edit Card</h4>
                           <div className='addressListings gapTop'>
                             <div className='indFields'>
                                <label className='fieldLabel'>Card Number</label>
                                <input className='foeldInputs' type='text' placeholder='Enter Card Number' />
                            </div>
                            <div className='indFields'>
                                <label className='fieldLabel'>Card Name</label>
                                <input className='foeldInputs' type='text'  placeholder='Enter Card Name'/>
                            </div>  
                            <div className='sortFieldInput'>
                                <div className='indFields exp'>
                                    <label className='fieldLabel'>Exp Date</label>
                                    <input className='foeldInputs' type='text'  placeholder='Enter Exp Date' />
                                </div>
                                <div className='indFields cvv'>
                                    <label className='fieldLabel'>CVV</label>
                                    <input className='foeldInputs' type='number'  placeholder='Enter Card CVV' />
                                </div>
                            </div>
                            <button className='submitInfo'>Submit</button>   
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