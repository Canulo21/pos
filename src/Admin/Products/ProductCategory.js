import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import { Trash2, Layers3, X } from "lucide-react";

function ProductCategory() {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/category");
      const dataCategory = res.data;
      setCategory(dataCategory);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInsertData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/addCategory", {
        category_name: categoryName,
      });

      if (res.data.Status === "Success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Accepted",
          showConfirmButton: false,
          timer: 1500,
        });

        setCategoryName("");
        fetchCategories();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Opps ...",
        text: err.response
          ? err.response.data.error
          : "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

  const handleDelete = async (cat_id) => {
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
          .delete(`http://localhost:8080/deleteCategory/${cat_id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
            });
            fetchCategories();
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

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const modalTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  return (
    <>
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="border-solid border-2 border-teal-700 py-1 px-6 shadow-xl text-center h-full">
        <h2>Product Category</h2>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center gap-2 mt-2 mb-3 ml-2 hover:bg-[#2e5491] float-right"
            onClick={() => setShowModal(true)}>
            <Layers3 />
            Add Category
          </button>
          <table className="table-auto mt-2 bg-[#f6fdef] shadow-md px-8 pt-6 pb-8 mb-4 w-full border-collapse border border-slate-400 p-5">
            <thead>
              <tr>
                <th className="border border-slate-300 p-2">Category Name</th>
                <th className="border border-slate-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {category.map((d, index) => (
                <tr key={index}>
                  <td className="border border-slate-300 p-2 uppercase text-xl font-semibold">
                    {d.category_name}
                  </td>
                  <td className="border border-slate-300 p-1">
                    <div className="flex justify-center">
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-[#a93737]"
                        onClick={() => handleDelete(d.category_id)}>
                        <Trash2 />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* for Add Category Modal */}
      {showModal ? (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={modalTransition}
          className="modal-form">
          <form className="bg-[#fafafa] shadow-md rounded px-8 pt-6 pb-6 mb-4 w-1/3">
            <button
              onClick={closeModal}
              className="float-right pt-2 pb-2 pl-5 pr-5 bg-[#436850] hover:bg-[#12372A] text-white rounded-md">
              <X />
            </button>
            <div className="mt-10">
              <label className="text-xl font-bold block text-center uppercase">
                Category Name
              </label>
              <div className=" w-full mt-5">
                <input
                  className="appearance-none block  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="category_name"
                  value={categoryName}
                  onChange={handleInputChange}
                  placeholder="eg. bottled"></input>
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
      ) : null}
    </>
  );
}

export default ProductCategory;
