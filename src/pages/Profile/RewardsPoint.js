import React, {
  useState,
  useContext,
  useEffect
} from "react";
import Header from "../../components/common/layout/Header/Header";
import Footer from "../../components/common/layout/Footer";
import ProfileSidebar from "./ProfileSidebar";
import { useTranslation } from "react-i18next";
import { getRewards } from "../../api/customer";
import { AuthContext } from "../../utils/AuthContext";
import RewardsChart from "../../components/rewardsChart/rewardsChart";
import Loader from "../../components/common/Loader/Loader";

const RewardsPointPage = () => {
  const { t } = useTranslation();
  const { loginResponse } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pointsData, setPointsData] = useState(null);
  const [monthlyPercentage, setMonthlyPercentage] = useState(null);
  const [halfYearlyPercentage, setHalfYearlyPercentage] = useState(null);
  const [yearlyPercentage, setYearlyPercentage] = useState(null);

  useEffect(() => {
    if (loginResponse) {
      getCustomerRewardsPoint();
    }
  }, [loginResponse]);

  const getCustomerRewardsPoint = async () => {
    setIsLoading(true);
    try {
      const response = await getRewards();
      if (response.succeeded) {
        setPointsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching favourite producucts:", error);
    }
  };

  useEffect(() => {
    if (pointsData) {
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);      
      

      const totalOneMonth = calculateCustomerRewardsPoint(pointsData, oneMonthAgo, currentDate);
      const totalSixMonths = calculateCustomerRewardsPoint(pointsData, sixMonthsAgo, currentDate);
      const totalOneYear = calculateCustomerRewardsPoint(pointsData, oneYearAgo, currentDate);

      setMonthlyPercentage(totalOneMonth);
      setHalfYearlyPercentage(totalSixMonths);
      setYearlyPercentage(totalOneYear);
      setIsLoading(false);
    }
  }, [pointsData]);  

  const calculateCustomerRewardsPoint = (pointsData, startDate, endDate) => {
    const filteredData = pointsData.filter((entry) => {
      const entryDate = new Date(entry.createDate);
      return entryDate >= startDate && entryDate <= endDate;
    });
  
    const totalOrderPurchase = filteredData.reduce(
      (total, entry) => (entry.activity === "Order_Purchase" ? total + entry.value : total),
      0
    );
  
    const totalWeeklyLogin = filteredData.reduce(
      (total, entry) => (entry.activity === "Weekly_Login" ? total + entry.value : total),
      0
    );
  
    const totalEarnings = filteredData.reduce((total, entry) => total + entry.value, 0);
  
    if (totalEarnings === 0) {
      return {
        orderPurchasePercentage: 0,
        weeklyLoginPercentage: 0,
        totalOrderPurchase,
        totalWeeklyLogin,
        totalEarnings,
      };
    }
  
    const orderPurchasePercentage =
      ((totalOrderPurchase / totalEarnings) * 100).toFixed(2);
    const weeklyLoginPercentage =
      ((totalWeeklyLogin / totalEarnings) * 100).toFixed(2);
  
    return {
      orderPurchasePercentage,
      weeklyLoginPercentage,
      totalOrderPurchase,
      totalWeeklyLogin,
      totalEarnings,
    };
  };

  const [isTabOpen1, setTabOpen1] = useState(true);
  const [isTabOpen2, setTabOpen2] = useState(false);
  const [isTabOpen3, setTabOpen3] = useState(false);

  const setTabOpen1Fn = () => {
    setTabOpen1(true);
    setTabOpen2(false);
    setTabOpen3(false);
  };
  
  const setTabOpen2Fn = () => {
    setTabOpen1(false);
    setTabOpen2(true);
    setTabOpen3(false);
  };

  const setTabOpen3Fn = () => {
    setTabOpen1(false);
    setTabOpen2(false);
    setTabOpen3(true);
  };

  return (
    <>
      <Header />
      <div className="dashboardMidContent profilePages">
        <ProfileSidebar />
        <div className="profileRightWraper">
          <div className="pointAnalysisWraper">
            <div className="pointTabWraper">
            {isLoading ? (
                     <Loader
                     showOverlay={false}
                     size={20}
                     color="#B7854C"
                     isLoading={false}
                   />
                    ) : (
              <div className="tabWrapers">
                <ul className="pointsTabs">
                  <li className={isTabOpen1 ? "activeTab" : ""} onClick={setTabOpen1Fn}>{t("Month")}</li>
                  <li className={isTabOpen2 ? "activeTab" : ""} onClick={setTabOpen2Fn}>{t("6 Months")}</li>
                  <li className={isTabOpen3 ? "activeTab" : ""} onClick={setTabOpen3Fn}>{t("Annual")}</li>
                </ul>

                {isTabOpen1 && (
                  <div className="tabContentCompenents">
                  <p className="earnedInfos">
                    <span>{t("See how much you’ve earned")}</span>
                  </p>
                  <RewardsChart percentage={monthlyPercentage}/>
                  <button className="pointDetail">{t("Details")}</button>
                </div>
                )}

                {isTabOpen2 && (
                  <div className="tabContentCompenents">
                  <p className="earnedInfos">
                    <span>{t("See how much you’ve earned half-yearly")}</span>
                  </p>
                  <RewardsChart percentage={halfYearlyPercentage}/>                 
                  <button className="pointDetail">{t("Details")}</button>
                </div>
                )}                

                {isTabOpen3 && (
                  <div className="tabContentCompenents">
                  <p className="earnedInfos">
                    <span>{t("See how much you’ve earned anually")}</span>
                  </p>                  
                  <RewardsChart percentage={yearlyPercentage}/>
                  <button className="pointDetail">{t("Details")}</button>
                </div>
                )}
              </div>
                   )}
            </div>
       
            <div className="questionsWrapers">
              <h3>{t("We want to get to know you")}</h3>
              <button className="qusBtn">{t("Answer Questionnaire")}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RewardsPointPage;
