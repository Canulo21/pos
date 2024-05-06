import { useState, useEffect } from "react";
import axios from "axios";

function AllProducts() {
  const [getProducts, setGetProducts] = useState([]);
  const [formData, setFormData] = useState({
    prod_id: "",
    prod_name: "",
    category_name: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await axios.get("http://localhost:8080/allProducts");
      const AllProducts = res.data;
      console.log("data", AllProducts);
      setGetProducts(AllProducts);
    };
    fetchAllProducts();
  }, []);

  return (
    <>
      <div className="border-solid border-2 border-teal-700 py-1 px-6 shadow-xl text-center h-full">
        <h2>Products</h2>
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
      </div>
    </>
  );
}

export default AllProducts;
