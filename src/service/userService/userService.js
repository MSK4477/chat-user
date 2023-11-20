import axios from "axios";


export const getUser = async () => { 
    const response  = await axios.get("http://localhost:4000/user/getUser", { 
        withCredentials: true
    })

    console.log(response)
    return response.data
}