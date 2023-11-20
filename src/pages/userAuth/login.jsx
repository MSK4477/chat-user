import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader.jsx";
import Input from "../../components/input.jsx";
import { loginUser } from "../../service/userAuthService/authService.js"
const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const login = await loginUser(formData);
      toast.success(login.message);
      console.log(login);
      localStorage.setItem("user", JSON.stringify(login))
      window.location.href = "/chat"
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      {loader ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md flex flex-col jsutify-center items-center w-full">
          <h2 className="text-2xl text-blue-500 font-semibold mb-4">Login</h2>
          <Input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required={true}
            className="w-full mb-4"
          /> <br />
          <Input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required={true}
            className="w-full mb-4"
          />
          <br />
          <div className="text-sm">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password?
              </span>{" "}
              |{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {"Don't have an account? Register"}
              </span>
            </div> <br />
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-sky-700 text-white px-4 py-2 rounded">
              Login
            </button>
            <br />
           
          </div>
          
        </form>
      )}
    </div>
  );
};

export default Login;
