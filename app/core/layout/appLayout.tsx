import { Outlet, useLocation, useNavigate } from "react-router";
import { useUserInfoQuery } from "@/entities/session";
import { useEffect } from "react";

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: user } = useUserInfoQuery(undefined, {
    skip:
      location.pathname.includes("/login") ||
      location.pathname.includes("/register"),
  });

  useEffect(() => {
    if (user) {
      if (!user?.first_name || !user?.last_name) {
        navigate("/character");
      }
    }
  }, [user]);
  return <Outlet />;
};
