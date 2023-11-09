import { lazy } from "react";
import RegisterNvAdmin from "../../views/admin/RegisterNvAdmin";
import DsNhanvien from "../../views/admin/DsNhanvien";
import RegisterShipper from "../../views/admin/RegisterShipper";
import DsShipper from "../../views/admin/DsShipper";
import ShipperDetails from "../../views/admin/ShipperDetails";
import Products from "../../views/admin/Products";
import EditProduct from "../../views/admin/EditProduct";
import DsCustomers from "../../views/admin/DsCustomers";
const SellerDetails = lazy(() => import("../../views/admin/SellerDetail"));
const DeactiveSellers = lazy(() => import("../../views/admin/DeactiveSellers"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const AddProduct = lazy(() => import("../../views/admin/AddProduct"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/add-product",
    element: <AddProduct />,
    role: "admin",
  },
  {
    path: "admin/dashboard/products",
    element: <Products />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "admin",
  },
  {
    path: "admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/deactive-sellers",
    element: <DeactiveSellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-request",
    element: <SellerRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/seller/details/:sellerId",
    element: <SellerDetails />,
    role: "admin",
  },
  {
    path: "admin/dashboard/shipper/details/:shipperId",
    element: <ShipperDetails />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-sellers",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-sellers/:sellerId",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/register-nvadmin",
    element: <RegisterNvAdmin />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/register-shipper",
    element: <RegisterShipper />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/ds-nhanvien",
    element: <DsNhanvien />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/ds-shipper",
    element: <DsShipper />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/ds-customers",
    element: <DsCustomers />,
    role: "admin",
  },
];
