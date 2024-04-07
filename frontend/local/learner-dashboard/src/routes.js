// import
import Dashboard from "views/Dashboard/Dashboard";
import Assignment from "views/Dashboard/Assignment";
import Reports from "views/Dashboard/Reports";
import File_Storage from "views/Dashboard/File_Storage";
import Inbox from "views/Dashboard/Inbox";
import Settings from "views/Dashboard/Settings";
import Catatan_Belajar from "views/Dashboard/Catatan_Belajar";

import {
  FiHome,
  FiFileText,
  FiBarChart2,
  FiFolder,
  FiMail,
  FiSettings,
  FiEdit3,
} from "react-icons/fi";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FiHome />,
    component: Dashboard,
    layout: "/learner",
  },
  {
    path: "/assignment",
    name: "Assignment",
    icon: <FiFileText />,
    component: Assignment,
    layout: "/learner",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <FiBarChart2 />,
    component: Reports,
    layout: "/learner",
  },
  {
    path: "/file-storage",
    name: "File Storage",
    icon: <FiFolder />,
    component: File_Storage,
    layout: "/learner",
  },
  {
    path: "/inbox",
    name: "Inbox",
    icon: <FiMail />,
    component: Inbox,
    layout: "/learner",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <FiSettings />,
    component: Settings,
    layout: "/learner",
  },
  {
    path: "/catatan-belajar",
    name: "Catatan Belajar",
    icon: <FiEdit3 />,
    component: Catatan_Belajar,
    layout: "/learner",
  },
];

export default dashRoutes;
