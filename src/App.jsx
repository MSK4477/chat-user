import {Login, Register, Verify, ForgotPassword, ResetPassword} from "./pages/userAuth";
import UserHook from "./hooks/userHook";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom"
import authContext from "./Authcontext/authContext";
import Chat from "./pages/chat/chat";
import io from "socket.io-client";
import ProtectedPage from "./pages/protectedPage";
import Header from "./components/header";
function App() {
  const socket = io.connect("http://localhost:4000") ;

  const [user] = UserHook()
  console.log(user?.message)
 
  return (
    <>
<authContext.Provider value={{user}}>
<ProtectedPage/>
    <Routes>
   <Route path="register" element = {<Register />} />
    <Route path="verify" element={<Verify />} />
    <Route path="login" element={<Login />} />
     <Route path="/*" element={<Navigate to={"/login"}  />} />

    <Route path="forgotpassword" element={<ForgotPassword />} />
    <Route path="resetpassword" element={<ResetPassword />} />
    <Route path="chat" element={<ProtectedPage element={ < ><Chat socket={socket} /> <Header /> </>} /> } />

    </Routes>
      <Toaster />
</authContext.Provider>

    
    </>
  );
}

export default App;


