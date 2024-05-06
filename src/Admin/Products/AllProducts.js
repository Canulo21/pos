import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import noData from "../../Assets/images/no-data.png";

function AllProducts({ fetchAllProducts, getProducts }) {
  const [formData, setFormData] = useState({
    prod_id: "",
    prod_name: "",
    category_name: "",
    quantity: "",
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="border-solid border-2 border-teal-700 py-1 px-6 shadow-xl text-center h-full">
        <h2>Products</h2>
        {getProducts.length > 0 ? (
          <table className="table-auto mt-2 bg-[#f6fdef] shadow-md px-8 pt-6 pb-8 mb-4 w-full border-collapse border border-slate-400 p-5">
            <thead>
              <tr>
                <th className="border border-slate-300 p-2">Product ID</th>
                <th className="border border-slate-300 p-2">Name</th>
                <th className="border border-slate-300 p-2">Category</th>
                <th className="border border-slate-300 p-2">Price</th>
                <th className="border border-slate-300 p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {getProducts.map((product, index) => (
                <tr key={index}>
                  <td className="border border-slate-300 p-2 uppercase font-bold">
                    {product.prod_id}
                  </td>
                  <td className="border border-slate-300 p-2 uppercase font-bold">
                    {product.prod_name}
                  </td>
                  <td className="border border-slate-300 p-2 uppercase font-bold">
                    {product.category_name}
                  </td>
                  <td className="border border-slate-300 p-2 uppercase font-bold">
                    {product.prod_price}
                  </td>
                  <td className="border border-slate-300 p-2 uppercase font-bold">
                    {product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <p className="text-2xl pb-5 uppercase font-semibold">
              No Product Displayed
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default AllProducts;
