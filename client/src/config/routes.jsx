import App from "../App.jsx";
import { Route, Routes } from "react-router";
import ChatPage from "../components/ChatPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
