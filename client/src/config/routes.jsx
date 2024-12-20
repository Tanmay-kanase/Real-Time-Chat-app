import App from "../App.jsx";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<h1>This is chat page</h1>} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
