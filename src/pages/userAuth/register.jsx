import { useState } from "react";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import Input from "../../components/input";
import { registerUser } from "../../service/userAuthService/authService";

const Register = () => {
    const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false)
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
    const register =  await registerUser(formData)
    console.log(register.message)

        setIsMailSent(true)
    
      toast.success("User Registered Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
   {isMailSent ? <div style={{ textAlign: "center", marginTop: "50px" }}>
  <h1 style={{ fontSize: "24px", color: "#007BFF" }}>
    Mail has been sent successfully! Check your email.
  </h1>
</div>
    :
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      {loader ? (
        <div style={{ position: "absolute", top: "45%", left: "45%" }}>
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded flex justify-center items-center flex-col shadow-md max-w-md w-full">
          <h2 className="text-2xl text-blue-500 font-semibold mb-4">Register</h2>
          <Input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            required={true}
            className="w-full mb-4"
          /> <br />
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
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
            required={true}
            className="w-full mb-4"
          />
          <br />
          <Input
            type="password"
            name="password"
            minLength={8}
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
                onClick={() => navigate("/login")}
              >
                {"Already have an account? Login"}
              </span>
            </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-sky-700 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      )}

    </div>}
    </>
  );
};

export default Register;
