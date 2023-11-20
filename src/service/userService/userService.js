import axios from "axios";
import url from "../../baseUrl";

export const getUser = async () => { 
    const response  = await axios.get(`https://chat-server-b45o.onrender.com/user/getUser`, { 
        withCredentials: true
    })

    console.log(response)
    return response.data
}