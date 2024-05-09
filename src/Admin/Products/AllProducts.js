import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { fadeIn } from "../../variants";
import noData from "../../Assets/images/no-data.png";
import { Edit2, Trash2 } from "lucide-react";
import axios from "axios";

function AllProducts({ fetchAllProducts, getProducts, onEditProduct }) {
  const [formData, setFormData] = useState({
    prod_id: "",
    prod_name: "",
    category_name: "",
    quantity: "",
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleDeleteProduct = async (prod_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/deleteProduct/${prod_id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
            });
            fetchAllProducts();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Delete Failed",
              text: error.response
                ? error.response.data.error
                : "An unexpected error occurred. Please try again later.",
            });
          });
      }
    });
  };

  const handleEdit = (productId) => {
    // console.log("Editing product with ID:", productId);
    onEditProduct(productId);
  };

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
                <th className="border border-slate-300 p-2">Action</th>
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
                  <td className="border border-slate-300 p-2 uppercase font-bold">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-[#a93737]"
                        onClick={() => {
                          handleDeleteProduct(product.prod_id);
                        }}>
                        <Trash2 />
                        Delete
                      </button>
                      <button
                        className="bg-[#436850] hover:bg-[#12372a] text-white py-2 px-4 rounded-md flex items-center gap-2"
                        onClick={() => handleEdit(product.prod_id)}>
                        <Edit2 />
                        Edit
                      </button>
                    </div>
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
