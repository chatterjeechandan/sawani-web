import React from 'react';
import Header from '../../components/common/layout/Header/Header';
import Footer from '../../components/common/layout/Footer';
import ProfileSidebar from './ProfileSidebar';

const AddressAdd = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages">
             <ProfileSidebar />
                <div className='profileRightWraper'>
                    <div className='pointAnalysisWraper'>
                        <div className='pointTabWraper inputWrapers newAddressWraper'>
                           <h4 className='addressHeading'>Add/Edit Address</h4>
                           <div className='addressListings gapTop'>
                             <div className='indFields'>
                                <label className='fieldLabel'>Full Name *</label>
                                <input className='foeldInputs' type='text' placeholder='Enter Full Name' />
                            </div>
                            <div className='indFields'>
                                <label className='fieldLabel'>Phone Number *</label>
                                <input className='foeldInputs' type='text'  placeholder='Enter Phone Number'/>
                            </div>  
                            <div className='indFields'>
                                <label className='fieldLabel'>Email</label>
                                <input className='foeldInputs' type='text'  placeholder='Enter Email Id'/>
                            </div>
                            <div className='indFields'>
                                    <label className='fieldLabel'>Address</label>
                                    <input className='foeldInputs' type='text'  placeholder='Enter Address' />
                            </div>
                            <div className='indFields'>
                                <label className='fieldLabel'>Date of Birth</label>
                                <input className='foeldInputs' type='number'  placeholder='Enter DOB' />
                            </div>
                            <div className='indFields'>
                                <div className='inlineOptions'>
                                <label className='fieldLabel'>Gender</label>
                                <span className='optionsInline'>
                                     <input type="radio" id="Male" name="fav_language" className='radioGender' value="Male" />
                                      <label for="Male">Male</label> 
                                      <input type="radio" id="Female" name="fav_language" className='radioGender' value="Female" />
                                      <label for="Female">Female</label>
                                </span>
                                </div>
                            </div>
                            <div className='indFields'>
                                <div className='inlineOptions'>
                                <label className='fieldLabel switchOptions'>I would like to receive <br /> Notifications</label>
                                <span className='optionsInline'>
                                   <label class="switch">
                                    <input type="checkbox"/>
                                    <span class="slider round"></span>
                                    </label>
                                      <label for="Male">Email</label> 
                                       <label class="switch">
                                    <input type="checkbox"/>
                                    <span class="slider round"></span>
                                    </label>
                                      <label for="Female">Text Messages</label>
                                </span>
                                </div>
                            </div>
                            <p className='changePassOptions'>Change Password</p>
                            <button className='submitInfo'>Submit</button>   
                           </div>
                        </div>

                        {/* <div className='questionsWrapers'>
                            <h3>We want to get to know you</h3>
                            <button className='qusBtn'>Answer Questionnaire</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddressAdd;