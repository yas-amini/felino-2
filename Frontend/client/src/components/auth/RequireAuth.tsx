import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/authStorage";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}