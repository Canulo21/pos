import { useEffect, useState } from "react";
import axios from "axios";
import coke from "../../Assets/images/coke.png";
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
                <img
                  src={coke}
                  alt={products.prod_name}
                  style={{ width: "150px", height: "150px" }}
                  className="filter drop-shadow-2xl bg-[#999696] py-2"></img>
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
