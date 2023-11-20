import axios from "axios";
import url from "../../baseUrl";
//register
export const registerUser = async(data) => {
    const response = await axios.post(`${url}/register`, data)
console.log(response)
    return response.data
}

//verify
export const  verifyUser = async (token) => {

const response = await axios.get(`${url}/verify?token=${token}`)
console.log(response)
return response.data
}

//login   

export const loginUser = async( data ) =>  { 

    const response = await axios.post(`${url}/login`, data, {
        withCredentials:true
    })

    console.log(response)              

    return response.data
}

//forgotpassword

export const forgotpassword = async(email) => {

    const response = await axios.post(`${url}/register`, email)

    console.log(response)

    return response.data

}

//resetpassword 

export const resetPassword = async(password, token) =>  {
    const response = await axios.post(`${url}/resetpassword?token=${token}`, password)
    console.log(response)
    return response.data
}

//logout 
export const logout = async() =>  {
    const response = await axios.get(`${url}/logout`)
    console.log(response)
    return response.data
}
