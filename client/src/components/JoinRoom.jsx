import { useState } from "react";
import chaticon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomSevices";
import useChatContext from "../context/chatContext";
import { useNavigate } from "react-router";

const JoinRoom = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });
  const navigate = useNavigate();

  const {  setRoomId, setCurrentUser, setConnected } =
    useChatContext();
  function handleormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  async function createRoom() {
    if (validateForm) {
      // create room
      try {
        const room = await createRoomApi(detail.roomId);
        console.log(room);
        toast.success("Room created Successfully");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        // forward to hat page...
        navigate("/chat");
        joinChat();
      } catch (error) {
        if (error.status == 400) {
          toast.error("Room already exists !!!!");
        } else {
          console.log(error);
        }
      }
    }
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input!!!!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      //join chat
    }

    try {
      const room = await joinChatApi(detail.roomId);
      toast.success("Joinned");
      setCurrentUser(detail.userName);
      setRoomId(room.roomId);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      if (error.status == 400) {
        toast.error(error.response.data);
      }
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-10 dark:border-gray-700 w-full flex flex-col gap-2 max-w-md rounded-none bg-gray-900">
        <div>
          <img src={chaticon} className="w-24 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-center">
          Join room / create room
        </h1>
        <div>
          <label htmlFor="" className="block font-medium mb-2 ">
            Your name
          </label>
          <input
            type="text"
            onChange={handleormInputChange}
            value={detail.userName}
            name="userName"
            placeholder="Enter your name..."
            id="name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded-full"
          />
        </div>
        <div>
          <label htmlFor="" className="block font-medium mb-2 ">
            Room Id / New Room Id
          </label>
          <input
            type="text"
            id="name"
            onChange={handleormInputChange}
            value={detail.roomId}
            name="roomId"
            placeholder="Enter your room ID..."
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded-full"
          />
        </div>
        
        {/* Button */}
        <div className="flex justify-center gap-2 mt-4 ">
          <button
            onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 "
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 "
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
