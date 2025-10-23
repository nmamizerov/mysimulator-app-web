import { useDispatch } from "react-redux";
import { logout } from "@/entities/session";
import { useNavigate } from "react-router";
import { Button } from "../button";

interface LogoutButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton = ({
  variant = "ghost",
  size = "md",
  fullWidth = false,
  className,
  children = "Выйти",
}: LogoutButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен из Redux и localStorage
    dispatch(logout());

    // Перенаправляем на страницу логина
    navigate("/login");
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
};

