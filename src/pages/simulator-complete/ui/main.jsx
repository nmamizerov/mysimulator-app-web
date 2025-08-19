import { SimulatorComplete } from "@/shared/lib/simulator-complete";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { mockAuth } from "../api/auth";
import { useAuth } from "@/entities/session";
import queryString from "query-string";

export const SimulatorCompletePage = () => {
  const { search } = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const params = queryString.parse(search);

  const { simulatorId } = useParams();
  const firstRender = useRef(true);
  const { setAuthToken, isAuth } = useAuth();

  const authenticate = async () => {
    const response = await mockAuth({ simulatorId });
    if (response) {
      setAuthToken(response.data.token);
    }
  };

  useEffect(() => {
    if (firstRender.current && !isAuth && !params.token) {
      authenticate();
      firstRender.current = false;
    }
    if (params.token) {
      setAuthToken(params.token);
    }
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isAuth) {
    return <div></div>;
  }

  return (
    <SimulatorComplete
      isCreator={params.isCreator}
      simulatorId={simulatorId}
      screenWidth={screenWidth}
    />
  );
};
