import React, { useEffect, useState } from "react"
import tab1 from "../../assets/images/cart.png";
import tab2 from "../../assets/images/pickup.png";
import tab3 from "../../assets/images/delhivery.png";
import search from "../../assets/images/search.png";
import pots from "../../assets/images/pots.png";
import p1 from "../../assets/images/p1.png";
import p2 from "../../assets/images/p2.png";
import p3 from "../../assets/images/p3.png";
import p4 from "../../assets/images/p4.png";
import p5 from "../../assets/images/p5.png";
import { Link } from "react-router-dom";



const CategoryCard = () => {
  document.title = "Sawani Category";
  // const [password, setPassword] = useState("");
  // const togglePassword = () => {
    
  //   // setPasswordShown(!passwordShown);
  // };
 
  return (
      
    <div className="dashboardMidContent">
    <div className='tabSearchWraper'>
      <div className='tabWraper'>
        <ul className='tabUl'>
          <li className='active'>
            <span>
              <img src={tab1} alt='' />
            </span>
            In-Store
          </li>
          <li>
            <span>
              <img src={tab2} alt='' />
            </span>
            Pick up
          </li>
          <li>
            <span>
              <img src={tab3} alt='' />
            </span>
            Delhivery
          </li>
        </ul>
      </div>
      <div className='searchWraper'>
        <div className='searchArea'>
          <input type='text' className='searchInput' />
          <span className='searchIcon'>
            <img src={search} alt='' />
          </span>
        </div>
        <button className='searchBtn'>Locate me</button>
      </div>
    </div>
    <div className='tabContentWraper'>
      <div className='pageHeadingWraper'>
        <span className='headingImage'>
          <img src={pots} alt='' />
        </span>
        <span className='headingContents'>
          <h3>Available in-store</h3>
          <p>Browse from our not only delicious but healthier options</p>
        </span>
      </div>
      <div className='productlistingsStore'>
        <div className='individualProduct'>
          <img src={p1} alt='' />
        </div>
        <div className='individualProduct'>
          <img src={p2} alt='' />
        </div>
        <div className='individualProduct'>
          <img src={p3} alt='' />
        </div>
        <div className='individualProduct'>
          <img src={p4} alt='' />
        </div>
        <div className='individualProduct'>
          <img src={p5} alt='' />
        </div>
      </div>
    </div>
  </div>
  );
}

export default CategoryCard;
