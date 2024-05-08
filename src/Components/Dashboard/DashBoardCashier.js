import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

function DashBoardCashier() {
  const [getProducts, setGetProducts] = useState([]);

  const fethProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/allProducts");
      const allProduct = res.data;
      console.log("products", allProduct);
      setGetProducts(allProduct);
    } catch (err) {}
  };

  useEffect(() => {
    fethProducts();
  }, []);

  return (
    <>
      <div id="container">
        <div className="flex gap-2 mt-2 mb-5">
          {getProducts.map((categoryBtn, index) => (
            <div key={index}>
              <button className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline w-36 uppercase">
                {categoryBtn.category_name}
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-5">
          {getProducts.map((products, index) => (
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.3 }}
              key={index}
              className="shadow-lg">
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
    </>
  );
}

export default DashBoardCashier;
