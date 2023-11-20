import { resetPassword } from "../../service/userAuthService/authService"
import Loader from "../../components/loader"
import { useState } from "react"
import toast from "react-hot-toast"
import {useNavigate, useSearchParams} from "react-router-dom"
import Input from "../../components/input"

const ResetPassword = () => {
const [params] = useSearchParams()
const token = params.get("token")
    const initialState = {
        password: "",
        password2: ""
    }

    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState(initialState)
const navigate = useNavigate()

const handleChange = (e) => {

    const {name, value} =e.target

    setFormData({...formData, [name]: value})
}

const handleSubmit = async(e) =>  {

    e.preventDefault()
    setLoader(true)

    try{
        if(formData.password == formData.password2) {
        
        const reset = await resetPassword(formData, token)
if(reset.message == "Password Changed Succesfully") { 
toast.success("Password Changed Successfully")
navigate("/login")

}
        }else{ 
            toast.error("Password Dosen't Match")
        }
    }catch(err){
        console.log(err)
    }finally{
        setLoader(false)
    }
}

return ( 
    <div className="flex justify-center items-center w-full h-screen bg-white">
    {loader ? <Loader /> :<form onSubmit={handleSubmit} className="bg-white p-8 rounded flex justify-center items-center flex-col shadow-md max-w-md w-full">
    <h2 className="text-2xl text-blue-500 font-semibold mb-4">Reset Password</h2>
<br />
        <Input
        name="password"
        value={formData.password}
        type="password"
        placeholder="Enter New Password"
        onChange={handleChange}
        required={true}
        minLength={8}
        />
        <br />
         <Input
        name="password2"
        value={formData.password2}
        type="password"
        placeholder="Re-Enter the Password"
        onChange={handleChange}
        required={true}
        minLength={8}

        />
        <br />
        <button className="bg-blue-500 hover:bg-sky-700 text-white px-4 py-2 rounded mt-4" type="submit">Set Password</button>
    </form> }
    </div>
)

}

export default ResetPassword
