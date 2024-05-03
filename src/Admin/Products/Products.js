import React from "react";
import ProductCategory from "./ProductCategory";

function Products() {
  return (
    <>
      <div id="container" className="relative">
        <div className="prod-bg">
          <div className="grid grid-cols-5">
            <div className="col-span-3"></div>
            <div className="col-span-2">
              <ProductCategory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
