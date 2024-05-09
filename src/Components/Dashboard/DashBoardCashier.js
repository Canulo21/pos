import React, { useEffect, useState } from "react";
import axios from "axios";
import noData from "../../Assets/images/no-data.png";
import noCat from "../../Assets/images/no-cat.png";
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
    if (isotope && isotope.filteredItems) {
      // Check if isotope and filteredItems are defined
      if (isotope.filteredItems.length > 0) {
        isotope.arrange({ filter: filterValue });
      } else {
        // Reset Isotope layout if no items are present
        isotope.layout();
      }
    }
  };

  // Extract unique category names
  const uniqueCategories = [
    ...new Set(getProducts.map((product) => product.category_name)),
  ];

  return (
    <>
      <div id="container">
        <div className="prod-bg">
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-4">
              {getProducts.length > 0 ? (
                <div className="">
                  <div className="filter-section">
                    {getProducts.map((products, index) => (
                      <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.3 }}
                        key={index}
                        className={`shadow-lg filter-item mr-5 mb-5 ${products.category_name}`}>
                        <div className="text-center" style={{ width: "180px" }}>
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: "180px",
                              height: "200px",
                              background: products.category_color,
                            }}>
                            <img
                              src={`http://localhost:8080/assets/product-image/${products.image_filename}`}
                              alt={products.prod_name}
                              className="filter p-2 prod-img"></img>
                          </div>
                          <div className="text-holder pt-2 pb-3 px-2">
                            <p className="uppercase font-semibold text-sm">
                              {products.prod_name}
                            </p>
                            <p className="font-medium italic text-base">
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
              ) : (
                <motion.div
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.4 }}
                  className="flex justify-center items-center flex-col">
                  <img
                    src={noData}
                    alt="no-data"
                    style={{ width: "500px" }}
                    className="no-data"
                  />
                  <p className="text-5xl pb-5 uppercase font-semibold">
                    No Product Displayed
                  </p>
                </motion.div>
              )}
            </div>
            <div className="col-span-2 h-full shadow-lg border-solid border-2 border-lime-700 p-2">
              <div className="  h-full">
                <h3 className="text-center mb-2">Categories</h3>
                {getProducts.length > 0 ? (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-1 text-sm rounded focus:outline-none focus:shadow-outline w-36 uppercase button"
                      onClick={() => handleFilter("*")}>
                      All
                    </button>
                    {uniqueCategories.map((categoryName, index) => (
                      <button
                        key={index}
                        className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-1 text-sm rounded focus:outline-none focus:shadow-outline w-36 uppercase button"
                        onClick={() => handleFilter(`.${categoryName}`)}>
                        {categoryName}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col w-full">
                    <img
                      src={noCat}
                      alt="no-data"
                      style={{ width: "400px" }}
                      className="no-data"
                    />
                    <p className="text-4xl pb-5 uppercase font-semibold">
                      No Category Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoardCashier;
