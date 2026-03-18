import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { AdminLayoutContext, TopbarState } from "../../layouts/AdminLayout";

export function useAdminTopbar(title?: string) {
  const { setTopbar } = useOutletContext<AdminLayoutContext>();

  useEffect(() => {
    const nextTopbar: TopbarState = { title };
    setTopbar(nextTopbar);

    return () => {
      setTopbar({});
    };
  }, [title, setTopbar]);
}