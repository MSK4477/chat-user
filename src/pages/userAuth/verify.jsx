import { useEffect, useState } from "react";
import { verifyUser } from "../../service/userAuthService/authService";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/loader";
import { Link } from "react-router-dom"


const Verify = () => {
const [verified, setVerified] = useState(false)
    const [params]  = useSearchParams()
    const token = params.get("token")
useEffect(() =>  { 
    const fetch =  async() => {
        const res = await verifyUser(token)
        // if(res.message == "User Verified Successfully") { 
            setVerified(true)
        
        console.log(res.message)
        
    }
    fetch()
}, [])

return (
    <>
    <div className="flex justify-center bg-white items-center w-full h-screen">
 {verified ?     <h1 className="text-blue-600 text-lg">User Verified Go To <Link to="/login" className="text-gray-600">Login</Link></h1>
 : <Loader />}
    </div>
    </>
)
}
export default Verify