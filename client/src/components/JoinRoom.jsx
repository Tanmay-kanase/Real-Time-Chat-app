import { useState } from "react";
import chaticon from "../assets/chat.png";
import toast from "react-hot-toast";

const JoinRoom = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });
  function handleormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function createRoom() {
    if (validateForm) {
      // create room
      
    }
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input!!!!");
      return false;
    }
    return true;
  }

  function joinChat() {
    if (validateForm()) {
      //join chat
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
