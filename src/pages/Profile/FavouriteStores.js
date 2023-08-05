import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';
const FavouriteStores = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages">
             <ProfileSidebar />
                <div className='profileRightWraper'>
                    <div className='pointAnalysisWraper'>
                        <div className='pointTabWraper'>
                           <div className='favouriteTabs'>
                            <div className='favouritetabWraper'>
                                <span className='activates'>Favorite Stores</span>
                            </div>
                            <div className='favouritetabWraper'>
                            <Link to="/favourite-product" className="profileLinksTag"> <span className=''>Favorite Products</span></Link>
                            </div>
                           </div>
                           <div className='tabContents'>
                            <p className='noRecords'>You don’t have favorite stores yet</p>
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

export default FavouriteStores;