import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import EditDetails from "./components/common/UserForm";
import Profile from "./components/panel/pages/Profile";
import Users from "./components/panel/pages/users_list/Users";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NoPage from "./components/common/NoPage";
import GroupList from "./components/panel/pages/GroupList";
import GroupsIcon from '@mui/icons-material/Groups';
import Info from '@mui/icons-material/Info';
import About from "./components/common/About";
/**
 * Pre Login routes
 */
export const authroutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Login />,
  },
];

/**
 * Post login routes i designed is as we can map is in our sidebar as well as pass to the react router
 */
export const panelChildren = [
  {
    path: "users",
    element: <Users />,
    icon: <ManageAccountsIcon />,
    inNav: true,
  },
  {
    path: "update",
    element: <EditDetails />,
    icon: <ManageAccountsIcon />,
    inNav: false,
  },
  {
    path: "groups",
    element: <GroupList />,
    icon: <GroupsIcon />,
    inNav: true,
  },
  {
    path: "profile",
    element: <Profile />,
    icon: <AccountBoxIcon />,
    inNav: true,
  },
  {
    path: "about",
    element: <About />,
    icon: <Info />,
    inNav: true,
  },
  {
    path: "*",
    element: <NoPage />,
    icon: <AccountBoxIcon />,
    inNav: false,
  },
];
