import { useState, useEffect } from "react";
import axios from "axios";

function AddProduct({ fetchCategory, categoryName }) {
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_price: 0,
  });

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleInsertData = async (e) => {
    e.preventDefault();
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
      <div className="border-solid border-2 border-teal-700 pt-1 pb-5 px-6 shadow-xl text-center h-full">
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
                placeholder="eg. milo"></input>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-1">
                <label
                  htmlFor="category_nme"
                  className="font-semibold text-lg italic">
                  Category
                </label>
                <select
                  className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
                  type="text"
                  name="category_nme"
                  value={formData.category_name}
                  onChange={(e) => handleInputChange(e)}>
                  <option value="" selected>
                    Select Category
                  </option>
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
                  placeholder="Input Price . . ."></input>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="prod_quantitiy"
                  className="font-semibold text-lg italic">
                  Quantity
                </label>
                <input
                  className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-2"
                  type="number"
                  name="prod_quantitiy"
                  value={formData.prod_quantitiy}
                  onChange={handleInputChange}
                  placeholder="Input Quantity..."></input>
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
      </div>
    </>
  );
}

export default AddProduct;
