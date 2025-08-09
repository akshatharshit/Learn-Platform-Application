// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const PublicRoute = ({ children }) => {
  const { user, isLoadingProfile } = useAuthStore();

  if (isLoadingProfile) {
    return <span className="loading loading-spinner loading-lg mx-auto block mt-10" />;
  }

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
