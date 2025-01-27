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
  }, []);
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
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex flex-wrap justify-between items-center px-4 md:px-8 h-20">
        {/* Room name container */}
        <div>
          <h1 className="text-lg md:text-2xl font-semibold">
            RoomId: <span>{roomId}</span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className="text-lg md:text-2xl font-semibold">
            User: <span>{currentUser}</span>
          </h1>
        </div>
        {/* Leave Room */}
        <div className="mt-2 md:mt-0">
          <button
            onClick={handleLogOut}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-4 py-2 rounded-full text-sm md:text-base"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-24 h-[calc(100vh-80px)] w-full max-w-5xl dark:bg-slate-600 mx-auto overflow-auto px-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-500" : "bg-gray-400"
              } py-2 px-4 rounded max-w-[80%]`}
            >
              <div className="flex gap-2 items-start">
                <img
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                  src={"https://avatar.iran.liara.run/public/36"}
                  alt="Avatar"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-sm">{message.sender}</p>
                  <p className="text-sm md:text-base">{message.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input message container */}
      <div className="fixed bottom-2 w-full px-4">
        <div className="h-16 px-2 gap-4 flex items-center justify-between rounded w-full max-w-5xl mx-auto dark:bg-gray-900">
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
            className="dark:bg-gray-700 w-full dark:border-gray-700 px-3 py-2 rounded-full focus:outline-none h-full focus:ring-0 text-sm md:text-base"
          />
          <div className="flex gap-2">
            <button className="dark:bg-purple-500 h-10 w-10 flex justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-500 h-10 w-10 flex justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
            <input type="file" onChange={handleFile} className="hidden" />
            <button
              onClick={uploadImage}
              className="dark:bg-green-500 h-10 w-10 flex justify-center items-center rounded-full"
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
