import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Isotope from "isotope-layout";

function DashBoardCashier() {
  const [getProducts, setGetProducts] = useState([]);
  const [isotope, setIsotope] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/allProducts");
      const allProduct = res.data;
      setGetProducts(allProduct);
      // Initialize Isotope after fetching products
      setIsotope(
        new Isotope(".filter-section", {
          itemSelector: ".filter-item",
          layoutMode: "fitRows",
        })
      );
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (filterValue) => {
    if (isotope) {
      isotope.arrange({ filter: filterValue });
    }
  };

  return (
    <>
      <div id="container">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-4 border-solid border-2 border-lime-700 p-2 h-full shadow-lg">
            <div className="filter-section">
              <div className="filter-container flex">
                {getProducts.map((products, index) => (
                  <motion.div
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.3 }}
                    key={index}
                    className={`shadow-lg filter-item mr-5 ${products.category_name}`}>
                    <div className="text-center">
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          background: products.category_color,
                        }}>
                        <img
                          src={`http://localhost:8080/assets/product-image/${products.image_filename}`}
                          alt={products.prod_name}
                          className="filter drop-shadow-2xl p-2 prod-img"></img>
                      </div>
                      <div className="text-holder pt-2 pb-3">
                        <p className="uppercase font-semibold">
                          {products.prod_name}
                        </p>
                        <p className="font-medium italic text-sm">
                          SRP: {products.prod_price}
                        </p>
                      </div>
                      <div className="p-1">
                        <button className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline w-full uppercase">
                          Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 h-full shadow-lg border-solid border-2 border-lime-700 p-2">
            <div className="  h-full">
              <h3 className="text-center mb-2">Categories</h3>
              <div className="flex gap-2 justify-center">
                <button
                  className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-1 text-sm rounded focus:outline-none focus:shadow-outline w-36 uppercase button"
                  onClick={() => handleFilter("*")}>
                  All
                </button>
                {getProducts.map((categoryBtn, index) => (
                  <button
                    key={index}
                    className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-1 text-sm rounded focus:outline-none focus:shadow-outline w-36 uppercase button"
                    onClick={() =>
                      handleFilter(`.${categoryBtn.category_name}`)
                    }>
                    {categoryBtn.category_name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoardCashier;
