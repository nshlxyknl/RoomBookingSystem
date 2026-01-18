import React from "react";
import { Navigate} from "react-router-dom";

import { StaffDashboard } from "./StaffDashboard";
import { UserDashboard } from "./UserDashboard";
import { HomePage } from "@/pages/HomePage";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  if (!role)
    return <Navigate to="/login" />;

  switch (role) {
    case "staff":
      return <StaffDashboard/>;
    case "user":
      return <UserDashboard/>;
    
    default:
      return <HomePage/>;
  }
};

export default Dashboard;
