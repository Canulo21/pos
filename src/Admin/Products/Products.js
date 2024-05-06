import { useState } from "react";
import ProductCategory from "./ProductCategory";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import axios from "axios";

function Products() {
  const [categoryName, setCategoryName] = useState([]);

  const fetchCategory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/category");
      const getCategory = res.data;
      setCategoryName(getCategory);
    } catch (err) {}
  };

  return (
    <>
      <div id="container" className="relative">
        <div className="prod-bg">
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
              <AddProduct
                fetchCategory={fetchCategory}
                categoryName={categoryName}
              />
            </div>
            <div className="col-span-2">
              <ProductCategory />
            </div>
          </div>
          <div className="mt-5">
            <AllProducts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
