import chaticon from "../assets/chat.png"


const JoinRoom = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-10 dark:border-gray-700 w-full flex flex-col gap-2 max-w-md rounded-none bg-gray-900">
        <div><img src={chaticon} className="w-24 mx-auto" />
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
            id="name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded"
          />
        </div>
        {/* Button */}
        <div className="flex justify-center gap-2 mt-4 ">
          <button className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 ">
            Join Room
          </button>
          <button className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 ">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
