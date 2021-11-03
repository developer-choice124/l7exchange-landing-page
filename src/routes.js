
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import ImageIcon from '@material-ui/icons/Image';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/BannerImage/BannerImage.js";
import TableList from "views/EnquiryList/Enquiry.js";
import Logo from "views/Socialmedia/Socialmedia.js";
import Privacy from "views/Privacy/Privacy.js";
import Question from "views/Question/Question.js";
import Advantages from "views/Advantages/Advantages"
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import PolicyIcon from '@material-ui/icons/Policy';
import QueueIcon from '@material-ui/icons/Queue';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/bannerimage",
    name: "Banner",
    icon: ImageIcon,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/userinquiry",
    name: "User Inquiry",
    icon: PeopleAltOutlinedIcon,
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/Setting",
    name: "Setting",
    icon: SettingsIcon,
    component: Logo,
    layout: "/admin",
  },
  {
    path: "/ads",
    name: "Advantages",
    icon: QueueIcon,
    component:  Advantages,
    layout: "/admin",
  },
  {
    path: "/question",
    name: "Question",
    icon: HelpOutlineIcon,
    component: Question,
    layout: "/admin",
  },
  {
    path: "/privacy",
    name: "Privacy",
    icon: PolicyIcon,
    component: Privacy,
    layout: "/admin",
  }
];

export default dashboardRoutes;
