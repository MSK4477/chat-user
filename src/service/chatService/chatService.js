import axios from "axios"

export const createChat = async (chat) => {

    const response = await axios.post("http://localhost:4000/chat/create-chat",chat, {
        withCredentials:true
    } )

    console.log(chat)

    return response.data
}