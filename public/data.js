import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EngineeringIcon from '@mui/icons-material/Engineering';
const list = [
  {
    id: "1",
    routes: "/panel,/panel/employees",
    title: "کارمندان",
    icon: <EngineeringIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panel/employees",
        activeRoute: "/panel/employees",
        title: "لیست کارمندان",
      },
      {
        href: "/panel/employees/add",
        activeRoute: "/panel/employees/add",
        title: "افزودن کارمند",
      },
      // {
      //   href: "/panel/bot",
      //   activeRoute: "/panel/bot",
      //   title: "ربات",
      // },
      // {
      //   href: "/panel/strategy/add",
      //   activeRoute: "/panel/strategy/add",
      //   title: "استراتژی",
      // },
    ],
  },
  {
    id: "2",
    routes: "/panel/profile,/panel/profile/edite",
    title: "حساب کاربری",
    icon: <AccountCircleIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panel/profile",
        activeRoute: "/panel/profile",
        title: "پروفایل",
      },
      {
        href: "/panel/profile/edite",
        activeRoute: "/panel/profile/edite",
        title: "ویرایش",
      },
    ],
  },
  {
    id: "3",
    routes: "/panels/blog",
    title: "بلاگ",
    icon: <RssFeedIcon sx={{ marginRight: "5%" }} />,
    list: [
      {
        href: "/panels/blog",
        activeRoute: "/panels/blog",
        title: "پست ها",
      },
    ],
  },
];
export { list };
