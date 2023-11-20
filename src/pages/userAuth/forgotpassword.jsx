import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import Input from "../../components/input";
import { forgotpassword } from "../../service/userAuthService/authService";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      await forgotpassword(formData);
      toast.success("Password reset email sent. Check your email.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "An error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {loader ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded flex justify-center items-center flex-col shadow-md max-w-md w-full">
          <h2 className="text-2xl text-blue-500 font-semibold mb-4">Forgot Password</h2>
          <Input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required={true}
            className="w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-sky-700 text-white px-4 py-2 rounded mt-4"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
