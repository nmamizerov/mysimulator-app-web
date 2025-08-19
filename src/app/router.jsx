import { AuthPage } from "@/pages/auth";
import { SimulatorCompletePage } from "@/pages/simulator-complete";
import { WelcomePage } from "@/pages/welcome";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { CourseWrapper } from "./ui/courseWrapper";
import { CourseComplete } from "@/pages/course-complete";

const buildType = import.meta.env.VITE_BUILD_TYPE;

let routes = [];
if (buildType === "simulator") {
  routes = [
    {
      path: "*",
      element: <WelcomePage />,
    },
    {
      path: "/complete/*",
      element: <Outlet />,
      children: [
        {
          path: ":simulatorId",
          element: <SimulatorCompletePage />,
        },
      ],
    },
  ];
}
if (buildType === "course") {
  routes = [
    {
      path: "/*",
      element: <CourseWrapper />,
      children: [
        {
          index: true,
          element: <CourseComplete />,
        },
        {
          path: "auth/*",
          element: <AuthPage />,
          children: [
            {
              path: "login",
              element: <AuthPage.Login />,
            },
            {
              path: "register",
              element: <AuthPage.Register />,
            },
          ],
        },
      ],
    },
  ];
}

export const router = createBrowserRouter(routes, {
  // eslint-disable-next-line no-undef
  // basename: process.env.NODE_ENV === "production" ? "/completing" : "",
});
