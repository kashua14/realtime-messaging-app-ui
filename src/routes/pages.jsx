import Login from "../Pages/Login/Login.jsx";
import Signup from "../Pages/Signup/Signup.jsx";
// import LockScreenPage from "Pages/LockScreenPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";
// import LockOpen from "@material-ui/icons/LockOpen";

const pagesRoutes = [
  {
    path: "/pages/Signup",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: Signup
  },
  {
    path: "/pages/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: Login
  },
  // {
  //   path: "/pages/lock-screen-page",
  //   name: "Lock Screen Page",
  //   short: "Lock",
  //   mini: "LSP",
  //   icon: LockOpen,
  //   component: LockScreenPage
  // },
  // {
  //   redirect: true,
  //   path: "/pages",
  //   pathTo: "/pages/register-page",
  //   name: "Register Page"
  // }
];

export default pagesRoutes;
