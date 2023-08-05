import React from 'react';
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import contactBack from "../assets/images/contact.png";

const ContactUs = () => {
    return (
        <>
            <Header />
            <div className="dashboardMidContent profilePages contactPage">
                <div className='contactUsWraper'>
                    <h4 className='contactHeading'>Talk to Us</h4>
                    <p className='contactPagePara'>We love to hear from you our valued customer</p>
                    <div className='contactPageImg'>
                        <img src={contactBack} className='contactLeftImg' alt='' />
                    </div>
                    <div className='contactFieldsWraper'>
                        <div className='sortFieldInput'>
                            <div className='indFields exp names'>
                                <label className='fieldLabel'>Full Name*</label>
                                <input className='foeldInputs' type='text'  placeholder='Enter Full Name' />
                            </div>
                            <div className='indFields cvv emails'>
                                <label className='fieldLabel'>Email*</label>
                                <input className='foeldInputs' type='email'  placeholder='Enter Email Id' />
                            </div>
                        </div>
                        <div className='indFields'>
                                <label className='fieldLabel'>Your Message</label>
                                <textarea className='foeldInputsTextarea' type='text'  placeholder='Enter Your Message'></textarea> 
                        </div>
                        <button className='contactBtns'>Send Message</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;