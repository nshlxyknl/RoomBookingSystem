import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate} from "react-router-dom";

import { StaffDashboard } from "./StaffDashboard";
import { UserDashboard } from "./UserDashboard";
import { HomePage } from "@/pages/HomePage";

const Dashboard = () => {
  const role = localStorage.getItem("role");
const location = useLocation()
  const navigate = useNavigate()

 useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("payment");

    
    if (status === "success") {
      toast.success("Payment successful");
      
        navigate(`/dashboard`, { replace: true })
    
    
    } else if (status === "cancel") {
      toast.error("Payment canceled");
      navigate(`/dashboard`, { replace: true })
    }

  }, [location.search ,  navigate]);

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
