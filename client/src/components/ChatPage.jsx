import { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/chatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { loadMessages } from "../services/RoomSevices";
import axios from "axios";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [file, setFile] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const [stompClient, setStompCLient] = useState(null);

  useEffect(() => {
    async function getMessages() {
      try {
        const messages = await loadMessages(roomId);
        console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.log(error.message);
      }
    }

    getMessages();
  });
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`http://localhost:8093/chat`);
      const client = Stomp.over(socket);
      client.connect({}, () => {
        setStompCLient(client);
        toast.success("Connected");
        client.subscribe(`topic/room/${roomId}`, (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    connectWebSocket();
  }, [roomId]);

  // Scroll down
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [messages]);

  // Handle Log out

  function handleLogOut() {
    stompClient.disconnect();
    setRoomId("");
    setCurrentUser("");
    setConnected(false);
  }

  // Image upload to AWS S3

  const uploadImage = async () => {
    if (!file) {
      console.log("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const image = await axios.post(
        "http://localhost:8093/api/v1/s3",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(image);
    } catch (error) {
      console.log(error);
    }
  };

  // handle file change
  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  // Send Message Handling

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
      setMessages((prev) => [...prev, message]);
    }
  };
  return (
    <div className="">
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900  py-5 shadow  flex justify-around w-full fixed h-20">
        {/* Room name container*/}
        <div>
          <h1 className="text-2xl font-semibold">
            RoomId : <span>{roomId}</span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className="text-2xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* Leave Room */}
        <div>
          <button
            onClick={handleLogOut}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-3 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-20  h-screen w-2/3 dark:bg-slate-600 mx-auto overflow-auto "
      >
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
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message here..."
            className="dark:bg-gray-700 w-full dark:border-gray-700 px-3 py-2 rounded-full focus:outline-none h-full focus:ring-0 "
          />
          <div className="flex gap-1 ">
            <button className="dark:bg-purple-500 h-10 w-10  flex justify-center items-center  rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-500 h-10 w-10  flex justify-center items-center  rounded-full"
            >
              <MdSend size={20} />
            </button>
            <input type="file" onChange={handleFile} />
            <button
              onClick={uploadImage}
              className="dark:bg-green-500 h-10 w-10  flex justify-center items-center  rounded-full"
            >
              Upload image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
