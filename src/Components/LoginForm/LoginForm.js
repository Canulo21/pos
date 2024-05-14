import { useState } from "react";
import axios from "axios";
import { fadeIn } from "../../variants";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function LoginForm({ isLogin, isRole, isId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const response = await axios.post("/login", {
        username,
        password,
      });
      // Display success message
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (response.status === 200) {
        const { role: Role } = response.data.user;
        const { id: UserId } = response.data.user;
        isId(UserId);
        isRole(Role);
        isLogin(true);
        navigate("/dashboard");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError("Invalid username or password");
    }
  };

  const showEyePassword = () => {
    setShowPassword(!showPassword);
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
      <div className="bg">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20">
          <h1 className="text-8xl text-zinc-100 drop-shadow-2xl">
            P.O.S System
          </h1>
        </motion.div>

        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={modalTransition}
          className="form px-8 pb-8 pt-10 shadow-2xl bg-[#edebe1]">
          <h1 className="text-center pb-9">Login Form</h1>
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <form className="w-96" onSubmit={handleLogin}>
            <div>
              <label className="font-semibold" htmlFor="username">
                Username:
              </label>
              <input
                className="p-1 w-full mt-1 px-2 py-1"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="pt-5">
              <label className="font-semibold" htmlFor="password">
                Password:
              </label>
              <div className="input-with-icon relative">
                <input
                  className="p-1 w-full mt-1 px-2 py-1"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p
                  onClick={showEyePassword}
                  className="absolute right-2 top-2 text-gray-500">
                  {showPassword ? <EyeOff /> : <Eye />}
                </p>
              </div>
            </div>
            <button
              className="btn-1 font-semibold mt-5 bg-[#58A399] hover:bg-[#707070] w-full py-2 text-white"
              type="submit">
              Login
            </button>
          </form>
          <p className="pt-2">
            Don't have an account? <Link to={"/registration"}>Register</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default LoginForm;
