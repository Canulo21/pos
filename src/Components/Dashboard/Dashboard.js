import React from "react";
import ProductReStockReport from "../../Admin/Products/ProductReStockReport";
import ActiveUserReport from "../../Admin/UserNav/ActiveUserReport";
import PendingUserReport from "../../Admin/UserNav/PendingUserReport";

function Dashboard() {
  return (
    <>
      <div id="container">
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-1">
            <ProductReStockReport />
          </div>
          <div className="col-span-1">
            <ActiveUserReport />
          </div>
          <div className="col-span-1">
            <PendingUserReport />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
