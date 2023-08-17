import React, { useState } from "react";
import smallLogo from "../../assets/images/smLogo.png";
import icon1 from "../../assets/images/icons1.png";
import icon2 from "../../assets/images/icons2.png";
import icon3 from "../../assets/images/icons3.png";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

const RewardsChart = ({ percentage }) => {

    const { t } = useTranslation();

    const data = {
        labels: ['Redeemed', 'Purchases', 'Weekly logins & other'],
        datasets: [
          {
            data: [0, Number(percentage?.orderPurchasePercentage), Number(percentage?.weeklyLoginPercentage)],
            backgroundColor: ['#2F1F15', '#B7864C', '#E0DBD0'], 
            borderColor: ['#2F1F15', '#B7864C', '#E0DBD0'],
            borderWidth: 1
          }
        ]
      };
    
      const options = {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      };
  

  return (
    <div className="pointDislayWraper">
        <div className="circlePoints">
            <span className="pointsMainInfo">
            <span className="pointsSmLogo">
                <img src={smallLogo} className="smLogo" alt="" />
            </span>
            <p className="pointsValue">{Number(percentage?.totalEarnings)}</p>
            <p className="pointsNames">{t("Point Balance")}</p>
            <p className="equalConversion">
                {t("Equals to")} <span>{Number(percentage?.totalEarnings)/10}</span> {t("SAR")}
            </p>
            </span>
            <Doughnut data={data} options={options} height={100} width={100}/>
        </div>
        <div className="pointsListings">
            <ul className="pointListUl">
            <li>
                <span className="pointListIcons">
                <img src={icon1} className="iconsLists" alt="" />
                </span>
                <span className="pointsName">{t("Redeemed")}</span>
                <span className="pointsPercent">0%</span>
            </li>
            <li className="activated">
                <span className="pointListIcons">
                <img src={icon2} className="iconsLists" alt="" />
                </span>
                <span className="pointsName">{t("Purchases")}</span>
                <span className="pointsPercent">{Number(percentage?.orderPurchasePercentage)}%</span>
            </li>
            <li>
                <span className="pointListIcons">
                <img src={icon3} className="iconsLists" alt="" />
                </span>
                <span className="pointsName">
                {t("Weekly logins & other")}
                </span>
                <span className="pointsPercent">{Number(percentage?.weeklyLoginPercentage)}%</span>
            </li>
            </ul>
        </div>
    </div>
  );
};

export default RewardsChart;
