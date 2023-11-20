/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedPage = ({ element }) => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];

  if (user.message) {
    return element;
  }

  return  <Navigate to="/login" />;
  
};

export default ProtectedPage;
