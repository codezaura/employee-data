import { useRoutes } from "react-router";
import IndexPage from "../pages/home";
import UpdatePage from "../pages/update";

export const Router = () => {
  return useRoutes([
    { path: "/", element: <IndexPage /> },
    { path: "/employee/:employeeId/edit", element: <UpdatePage /> },
  ]);
};
