import axios from "axios";

//register
export const registerUser = async(data) => {
    const response = await axios.post("http://localhost:4000/user/register", data)
console.log(response)
    return response.data
}

//verify
export const  verifyUser = async (token) => {

const response = await axios.get(`http://localhost:4000/user/verify?token=${token}`)
console.log(response)
return response.data
}

//login   

export const loginUser = async( data ) =>  { 

    const response = await axios.post("http://localhost:4000/user/login", data, {
        withCredentials:true
    })

    console.log(response)              

    return response.data
}

//forgotpassword

export const forgotpassword = async(email) => {

    const response = await axios.post("http://localhost:4000/user/forgotpassword", email)

    console.log(response)

    return response.data

}

//resetpassword 

export const resetPassword = async(password, token) =>  {
    const response = await axios.post(`http://localhost:4000/user/resetpassword?token=${token}`, password)
    console.log(response)
    return response.data
}

//logout 
export const logout = async() =>  {
    const response = await axios.get("http://localhost:4000/user/logout")
    console.log(response)
    return response.data
}
