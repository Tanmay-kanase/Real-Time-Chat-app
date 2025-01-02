import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        roomId,
        currentUser,
        setRoomId,
        connected,
        setCurrentUser,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate the children prop
};

const useChatContext = () => useContext(ChatContext);

export default useChatContext;
