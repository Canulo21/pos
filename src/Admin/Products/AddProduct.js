import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Swal from "sweetalert2";
import axios from "axios";

function AddProduct({ fetchCategory, categoryName }) {
  const [prodCat, setProdCat] = useState("");
  const [prodQuant, setProdQuant] = useState(0);
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_price: 0,
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleProdQuant = (e) => {
    setProdQuant(e.target.value);
  };

  const handleProdCat = (e) => {
    setProdCat(e.target.value);
    console.log("Selected Category:", e.target.value); // Added console.log
  };

  const handleInsertData = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData); // Added console.log
      const response = await axios.post("http://localhost:8080/addProduct", {
        prod_name: formData.prod_name,
        category_name: prodCat,
        prod_price: formData.prod_price,
        quantity: prodQuant,
      });

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Succesfully Added",
          showConfirmButton: false,
          timer: 1500,
        });

        setFormData({
          prod_name: "",
          prod_price: 0,
        });
        setProdCat("");
        setProdQuant(0);

        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oppssss ...",
          text: error.response.data
            ? error.response.data
            : "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="border-solid border-2 border-teal-700 pt-1 pb-5 px-6 shadow-xl text-center h-full">
        <h2>Add Product Item</h2>
        <form>
          <div className="mt-10">
            <div className="w-full">
              <label
                htmlFor="prod_name"
                className="font-semibold text-lg italic">
                Product Name
              </label>
              <input
                className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2 mb-5"
                type="text"
                name="prod_name"
                value={formData.prod_name}
                onChange={handleInputChange}
                placeholder="eg. milo"
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-1">
                <label
                  htmlFor="category_name"
                  className="font-semibold text-lg italic">
                  Category
                </label>
                <select
                  className="appearance-none block uppercase w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
                  name="category_name"
                  value={prodCat}
                  onChange={handleProdCat}>
                  <option value="">Select Category</option>
                  {categoryName.map((d, index) => (
                    <option
                      key={index}
                      value={d.category_name}
                      className="uppercase">
                      {d.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="prod_price"
                  className="font-semibold text-lg italic">
                  Price
                </label>
                <input
                  className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
                  type="number"
                  name="prod_price"
                  value={formData.prod_price}
                  onChange={handleInputChange}
                  placeholder="Input Price . . ."
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="quantity"
                  className="font-semibold text-lg italic">
                  Quantity
                </label>
                <input
                  className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
                  type="number"
                  name="quantity"
                  value={prodQuant}
                  onChange={handleProdQuant}
                  placeholder="Input Quantity..."
                />
              </div>
            </div>
            <button
              onClick={handleInsertData}
              className="text-white bg-[#436850] hover:bg-[#12372a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full uppercase"
              type="button">
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export default AddProduct;