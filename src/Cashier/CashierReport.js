import React from "react";
import DailyIncome from "./DailyIncome";

function CashierReport({ user }) {
  return (
    <>
      <div id="container">
        <h1 className="text-center">My Reports</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <div className="col-span-1">
            <DailyIncome user={user} />
          </div>
          <div className="col-span-1">
            <DailyIncome user={user} />
          </div>
          <div className="col-span-1">
            <DailyIncome user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CashierReport;
