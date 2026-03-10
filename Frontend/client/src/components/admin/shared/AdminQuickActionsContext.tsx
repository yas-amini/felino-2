import { createContext, useContext } from "react";

type AdminQuickActionsContextType = {
  openCreateProductModal: () => void;
};

const AdminQuickActionsContext = createContext<AdminQuickActionsContextType | null>(null);

export function AdminQuickActionsProvider({
  value,
  children,
}: {
  value: AdminQuickActionsContextType;
  children: React.ReactNode;
}) {
  return (
    <AdminQuickActionsContext.Provider value={value}>
      {children}
    </AdminQuickActionsContext.Provider>
  );
}

export function useAdminQuickActions() {
  const context = useContext(AdminQuickActionsContext);

  if (!context) {
    throw new Error("useAdminQuickActions måste användas inside AdminPage.");
  }

  return context;
}