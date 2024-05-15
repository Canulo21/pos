import { useState } from "react";
import ProductReStockReport from "../../Admin/Products/ProductReStockReport";
import ActiveUserReport from "../../Admin/UserNav/ActiveUserReport";
import PendingUserReport from "../../Admin/UserNav/PendingUserReport";
import ActiveDiscountsReport from "../../Admin/Discount/ActiveDiscountsReport";
import DailyIncome from "../../Admin/Reports/DailyIncome";
import WeeklyIncome from "../../Admin/Reports/WeeklyIncome";
import MonthlyIncome from "../../Admin/Reports/MonthlyIncome";

function Dashboard() {
  return (
    <>
      <div id="container">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <ActiveUserReport />
          </div>
          <div className="col-span-1">
            <PendingUserReport />
          </div>
          <div className="col-span-1">
            <ProductReStockReport />
          </div>
          <div className="col-span-1">
            <ActiveDiscountsReport />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div className="col-span-1">
            <DailyIncome />
          </div>
          <div className="col-span-1">
            <WeeklyIncome />
          </div>
          <div className="col-span-1">
            <MonthlyIncome />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
