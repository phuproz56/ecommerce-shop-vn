import {
  AiFillDashboard,
  AiOutlineShoppingCart,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { BsCurrencyDollar, BsChat } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Đặt Hàng",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Thể Loại",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Người Bán",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Yêu Cầu Chuyển Tiền",
    icon: <BsCurrencyDollar />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Người Bán Không Hoạt Động",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 7,
    title: "Yêu Cầu Người Bán",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Chat Với Người Bán",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },
  {
    id: 9,
    title: "Tạo Tài Khoản Nhân Viên Admin",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/register-nvadmin",
  },
  {
    id: 10,
    title: "Danh Sách Nhân Viên",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/ds-nhanvien",
  },
  {
    id: 11,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 12,
    title: "Thêm Sản Phẩm",
    icon: <AiOutlinePlus />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 13,
    title: "Tất Cả Sản Phẩm",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  {
    id: 14,
    title: "Sự Kiện, Khuyến Mãi",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/discount-products",
  },
  {
    id: 15,
    title: "Phiếu Nhập Hàng",
    icon: <MdProductionQuantityLimits />,
    role: "seller",
    path: "/seller/dashboard/log-product",
  },
  {
    id: 16,
    title: "Đơn Hàng",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 17,
    title: "Chuyển Tiền",
    icon: <BsCurrencyDollar />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 18,
    title: "Chat Với Người Mua",
    icon: <BsChat />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 19,
    title: "Chat Với Admin",
    icon: <CiChat1 />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 20,
    title: "Hồ Sơ",
    icon: <FiUsers />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];
