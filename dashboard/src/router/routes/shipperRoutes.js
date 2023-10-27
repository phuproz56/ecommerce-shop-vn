import { lazy } from "react";
const ShipperDashboard = lazy(() => import("../../views/shipper/ShipperDashboard"));


export const shipperRoutes = [
  {
    path: "shipper/dashboard",
    element: <ShipperDashboard />,
    role: "shipper",
  },
  
 
];
