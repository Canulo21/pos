import React, { useState, useEffect } from "react";

function CashierReport({ user }) {
  const [cashierUser, setCashierUser] = useState([]);

  // Update cashierUser state when the user prop changes
  useEffect(() => {
    setCashierUser(Array.isArray(user) ? user : [user]);
  }, [user]);

  return (
    <>
      <div id="container">
        <h1 className="text-center">Cashier Report</h1>
        {cashierUser.map((d, index) => (
          <div key={index} className="uppercase">
            <p>ID: {d.id}</p>
            <p>
              Name: {d.fname} {d.lname}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CashierReport;
