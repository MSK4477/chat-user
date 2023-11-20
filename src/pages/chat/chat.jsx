/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import sendIcon from "../../images/send-message.svg"
import InputEmoji from "react-input-emoji";
const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  function joinRoom() {
    socket.emit("join-room", { room, author: name });
    setShowChat(true);
  }

  const isfilled = Boolean(room.length === 5) && Boolean(name.length > 3);
const scrollRef = useRef()
  function sendMessage() {
    if (message !== "") {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

      const messagePayload = {
        room: room,
        author: name,
        message: message,
        time: `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`,
      };

      socket.emit("send-message", messagePayload);
      setMessage("");
    }
    // const  len  = messages.length -1
// messages[len].scrollIntoView()
    scrollRef.current.scrollIntoView()
  }


  const inputClass = "p-2 mb-2 outline-none rounded-lg border-none bg-red-200";
  const buttonClass = "py-2 px-4 rounded-lg";

  return (
    <div>
      {!showChat ? (
        <div className="flex justify-center items-center w-full bg-slate-500 h-screen flex-col ">
          <h1 className="text-white">Join Room</h1>
          <div className="flex flex-col bg-white p-8 rounded-lg">
            <input
              type="text"
              placeholder="Enter ID"
              value={room}
              className={inputClass}
              onChange={(e) => setRoom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              className={inputClass}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              disabled={!isfilled}
              className={`${buttonClass} ${isfilled ? "bg-red-400" : "bg-gray-200"}`}
              onClick={joinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (

        <div className="flex justify-center p-[3vmax]  items-center relative flex-col bg-slate-300   w-full h-screen">

          <div className="w-10/12 bg-white relative top-9 pb-12 px-6 pt-5 max-md:h-full max-md:w-full rounded-t-lg mb-4  shadow-2xl overflow-y-auto h-96">

          <ul >

            {messages.map((msg, i) => (
              <li
                className={`flex ${msg.author === name ? "justify-end" : "justify-start"}`}
                key={i}
              >
               <p
  className={`${msg.author === name ? "bg-red-500" : "bg-red-400"} text-white p-2  rounded-md mb-3 font-serif relative overflow-hidden break-all `}
  ref={scrollRef}
>
  {`${msg.message}`}
</p>
                &nbsp;
                <span className="font-sans  text-black text-[10px]">{msg.author} &nbsp;
                {msg.time}
                </span>
              </li>
            ))}
             </ul>
          </div>

          <div className=" p-3 relative max-md:w-full  rounded-b-lg top-5 bg-gray-200 w-10/12 flex " >

        <InputEmoji
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}

      value={message}
      onChange={setMessage}
      fontFamily="nunito"

/>
        <button onClick={sendMessage}  className={`${buttonClass}`}>
         <img src={sendIcon} alt="send-message" className="w-6" />
        </button>
      </div>
        </div>
      )}

    </div>
  );
};

export default Chat;


