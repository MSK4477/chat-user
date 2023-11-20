import { useEffect, useState } from "react"
import { getUser } from "../service/userService/userService.js"

const UserHook = () => {

    const [user, setUser] = useState()

    const Getuser = async() =>    { 
         try { 
            const response = await  getUser()
            console.log(response)
            setUser(response)
         }catch(err) { 
            console.log(err)
         }
    }

    useEffect(() =>  {
        Getuser()
    }, [])

    return [user, setUser]
}

export default UserHook