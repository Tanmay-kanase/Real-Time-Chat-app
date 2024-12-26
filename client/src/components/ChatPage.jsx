import { useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";

const ChatPage = () => {
  const [messages, setmessages] = useState([
    {
      content: "Hello",
      sender: "Tanmay",
    },
    {
      content: "Hello , How are you ?",
      sender: "Yash",
    },
    {
      content: "Im fine!!!",
      sender: "Tanmay",
    },
    {
      content: "I'm also fine",
      sender: "Yash",
    },
    {
      content: "Hello",
      sender: "Tanmay",
    },
    {
      content: "Hello , How are you ?",
      sender: "Yash",
    },
    {
      content: "Im fine!!!",
      sender: "Tanmay",
    },
    {
      content: "I'm also fine",
      sender: "Yash",
    },
    {
      content: "Hello",
      sender: "Tanmay",
    },
    {
      content: "Hello , How are you ?",
      sender: "Yash",
    },
    {
      content: "Im fine!!!",
      sender: "Tanmay",
    },
    {
      content: "I'm also fine",
      sender: "Yash",
    },
    {
      content: "Hello",
      sender: "Tanmay",
    },
    {
      content: "Hello , How are you ?",
      sender: "Yash",
    },
    {
      content: "Im fine!!!",
      sender: "Tanmay",
    },
    {
      content: "I'm also fine",
      sender: "Yash",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompCLient] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [currentUser] = useState("Tanmay");

  return (
    <div className="">
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900  py-5 shadow  flex justify-around w-full fixed h-20">
        {/* Room name container*/}
        <div>
          <h1 className="text-2xl font-semibold">
            Room : <span>Fami Room </span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className="text-2xl font-semibold">
            Room : <span>Fami Room </span>
          </h1>
        </div>
        {/* Leave Room */}
        <div>
          <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-3 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      <main className="py-20  h-screen w-2/3 dark:bg-slate-600 mx-auto overflow-auto ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            } `}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-500" : "bg-gray-400"
              } p-2 bg-blue-600 py-2 rounded max-w-xs`}
            >
              <div className="flex flex-row gap-2 ">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/36"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-sm">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* Input message container */}
      <div className="fixed bottom-2 w-full h-16">
        <div className="h-full px-2 gap-4  flex items-center justify-between rounded w-2/3 mx-auto dark:bg-gray-900 ">
          <input
            type="text"
            placeholder="Type your message here..."
            className="dark:bg-gray-700 w-full dark:border-gray-700 px-3 py-2 rounded-full focus:outline-none h-full focus:ring-0 "
          />
          <div className="flex gap-1 ">
            <button className="dark:bg-purple-500 h-10 w-10  flex justify-center items-center  rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button className="dark:bg-green-500 h-10 w-10  flex justify-center items-center  rounded-full">
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
