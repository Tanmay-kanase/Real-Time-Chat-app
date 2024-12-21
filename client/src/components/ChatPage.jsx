import { MdSend } from "react-icons/md";

const ChatPage = () => {
  return (
    <div className="">
      <header className="dark:border-gray-700 dark:bg-gray-900  py-5 shadow  flex justify-around w-full fixed h-20">
        {/* Room name container*/}
        <div>
          <h1 className="text-2xl font-semibold">
            Room : <span>Fami ROom </span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className="text-2xl font-semibold">
            Room : <span>Fami ROom </span>
          </h1>
        </div>
        {/* Leave Room */}
        <div>
          <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-3 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      {/* Input message container */}
      <div className="fixed bottom-2 w-full h-16">
        <div className="h-full px-2 gap-4  flex items-center justify-between rounded w-2/3 mx-auto dark:bg-gray-900 ">
          <input type="text" placeholder="Type your message here..." className="dark:bg-gray-700 w-full dark:border-gray-700 px-3 py-2 rounded-full focus:outline-none h-full focus:ring-0 " />
          <button className="dark:bg-green-500 h-10 w-10  flex justify-center items-center  rounded-full">
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
