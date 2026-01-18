import React from "react";
import { Navigate} from "react-router-dom";

import { StaffDashboard } from "./StaffDashboard";
import { UserDashboard } from "./UserDashboard";
import { HomePage } from "@/pages/HomePage";

const Dashboard = () => {
  const role = localStorage.getItem("role");
//   const location = useLocation()
//   const navigate = useNavigate()



//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const status = query.get("payment");

    
//     if (status === "success") {
//       toast.success("Payment successful");
//        const purchasedItems = JSON.parse(sessionStorage.getItem("purchasedItems") || "[]");
// console.log("Items sent to pending:", purchasedItems);

//       if (purchasedItems.length > 0) {
//       fetch("http://localhost:4000/salestype/pending", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ items:purchasedItems }),
//       })
//       .then(res => res.json())
//       .then(data => {console.log("Sales saved:", data)
//                   sessionStorage.removeItem("purchasedItems");
//         navigate(`/dashboard`, { replace: true })
//     })
//       .catch(err => console.error("Error saving sales:", err));
//       }
    
//     } else if (status === "cancel") {
//       toast.error("Payment canceled");
//       navigate(`/dashboard`, { replace: true })
//     }

//   }, [location.search ,  navigate]);

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
