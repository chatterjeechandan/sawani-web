import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Header from '../components/common/layout/Header/Header';
import Footer from '../components/common/layout/Footer';
import CategoryCard from "../components/category/CategoryCard";

const CategoryListingPage = () => {
    document.title = "Sawani ategory Listing Page";
    // const [password, setPassword] = useState("");
    // const togglePassword = () => {
      
    //   // setPasswordShown(!passwordShown);
    // };
   
    return (
        <div className="dashboardPageMaimWraper">
         <Header />
         <CategoryCard />
         <Footer />
        </div>
    );
  }
  
  export default CategoryListingPage;