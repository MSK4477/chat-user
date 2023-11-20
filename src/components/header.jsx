import toast from "react-hot-toast";
import { logout } from "../service/userAuthService/authService";

const Header = () => {

    const logOut = async() =>  {
        try { 
        await logout()
toast.success("User Logged Out")
window.location.href = "/login"
localStorage.clear("user")
        }catch(err)  {
            console.log(err)
        }
    }
  return (

    <div className="absolute top-0 w-full h-12 flex bg-white p-[2vmax]">
      <div className="flex items-center">

        <h1 className="text-lg font-bold">{"Let's Chat"}</h1>
    
      </div>

      <div className="flex items-center ml-auto">

        <h1 className="font-serif  max-md:text-base  max-md:px-1  max-md:py-1 bg-gray-600 px-2 py-2 rounded-lg text-white cursor-pointer" onClick={logOut}>Logout</h1>


      </div>

    </div>
  );
};

export default Header;
