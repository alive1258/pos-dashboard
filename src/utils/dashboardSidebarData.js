import { MdOutlineCategory } from "react-icons/md";
import { CiCompass1 } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";

export const privateRouteNames = [
  "Services",
  "Category",
  "Delivery",
  "Customer",
  "Users",
  "Company rules",
  "Company names",
  "Banners",
];

export const SidebarItemsData = [
  {
    id: 1,
    name: "Product Management",
    module_id: 1,
    path: "",
    Icon: <CiCompass1 size={20} />,
    sub: [
      {
        id: 1,
        name: "All Products",
        path: "/product/all-products",
        module_id: 1,
        Icon: <MdOutlineCategory size={20} />,
      },
    ],
  },
  {
    id: 2,
    name: "POS / Sales System",
    module_id: 1,
    path: "",
    Icon: <FaHistory size={20} />,
    sub: [
      {
        id: 1,
        name: "Product Sale System",
        path: "/sale-system/product-sale-system",
        module_id: 1,
        Icon: <MdOutlineCategory size={20} />,
      },
      {
        id: 1,
        name: "Sale Report",
        path: "/sale-system/sale-report",
        module_id: 1,
        Icon: <MdOutlineCategory size={20} />,
      },
    ],
  },
];
