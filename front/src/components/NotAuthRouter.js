import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function NotAuthRouter({ isAuth }) {
  return isAuth ? <Navigate to="/" /> : <Outlet />;
}

export default NotAuthRouter;

// 이하 선생님 코드

// import React from "react";
// import {Navigate, Outlet} from "react-router-dom";

// function NotAuthRouter({isAuth}) {
//   return isAuth ? <Navigate to="/" /> : <Outlet />;
// }

// export default NotAuthRouter;
