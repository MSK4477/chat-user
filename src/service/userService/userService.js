import axios from "axios";
import url from "../../baseUrl";

export const getUser = async () => { 
    const response  = await axios.get(`${url}/getUser`, { 
        withCredentials: true
    })

    console.log(response)
    return response.data
}