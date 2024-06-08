import React from "react";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div>
      <nav>nav link</nav>
      <Outlet />
    </div>
  );
}

export default UserLayout;
