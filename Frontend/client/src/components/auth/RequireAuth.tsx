import { useLocation, useNavigate } from "react-router-dom";
import AdminProfileModal from "../../components/common/Modal/AdminProfileModal";
import { hasValidAdminToken } from "../../utils/authSession";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = hasValidAdminToken();

  if (!isAuthenticated) {
    return (
      <AdminProfileModal
        isOpen={true}
        onClose={() => navigate("/", { replace: true })}
        redirectTo={location.pathname}
      />
    );
  }

  return <>{children}</>;
}