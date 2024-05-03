import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

function ActiveUsers() {
  const [fetchData, setFetchData] = useState([]);
  const fetchActiveUser = () => {
    try {
      axios.get("http://localhost:8080/activeUsers").then((res) => {
        const pendingData = res.data;
        setFetchData(pendingData);
      });
    } catch (err) {}
  };

  useEffect(() => {
    fetchActiveUser();

    const interval = setInterval(() => {
      fetchActiveUser();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }}
        className="border-solid border-2 border-teal-700 pt-1 pb-5 px-6 shadow-xl text-center h-full">
        <h2>Active Users</h2>
        <div>
          {fetchData.map((d, index) => (
            <div
              key={index}
              className="flex text-xl font-medium justify-center gap-2 pt-2">
              <p>
                {d.fname} {d.mname} {d.lname} -
              </p>
              <p className="uppercase font-bold text-lime-600">{d.role}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default ActiveUsers;
