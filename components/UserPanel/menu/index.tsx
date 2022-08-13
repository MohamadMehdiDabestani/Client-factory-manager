import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import {
  toggleUserMenu,
  userPanelMenuSelector,
} from "@/redux_/slices/common/UserPanelMenu";
import { useAppDispatch } from "@/redux_/store";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";
import {
  Typography,
  useMediaQuery,
  MenuItem as MI,
  Menu as MU,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import Link from "next/link";
import { toggleTheme } from "@/redux_/slices/common/Theming";
import useTranslation from "next-translate/useTranslation";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  ".MuiDrawer-paper": {
    background: `#051e34`,
  },
  "& *": {
    color: "white !important",
  },
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Menu = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const open = useSelector(userPanelMenuSelector);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElLanguageList, setAnchorElLanguageList] =
    useState<null | HTMLElement>(null);
  const openMenuLang = Boolean(anchorEl);
  const openMenuLangList = Boolean(anchorElLanguageList);
  const handleClickMenuLang = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuLang = () => {
    setAnchorEl(null);
  };
  const handleClickMenuLangList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguageList(event.currentTarget);
  };
  const handleCloseMenuLangList = () => {
    setAnchorElLanguageList(null);
  };
  const c = () => {
    dispatch(
      toggleUserMenu({
        show: !open.show,
      })
    );
  };
  useEffect(() => {
    if (matches) {
      dispatch(toggleUserMenu({ show: false }));
    } else {
      dispatch(toggleUserMenu({ show: true }));
    }
  }, [matches]);
  return (
    <Drawer
      variant="permanent"
      open={open.show}
      sx={{
        "& > div > span": {
          zIndex: "5",
          width: "100% !important",
          height: " 100% !important",
          img: {
            objectFit: "cover !important",
            width: "100% !important",
            height: " 100% !important",
          },
        },
      }}
    >
      <Box
        sx={{
          zIndex: "6",
          height: "93%",
        }}
      >
        <DrawerHeader>
          <IconButton onClick={c}>
            {open.show ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ marginBottom: "10%", backgroundColor: "#ffffff3b" }} />
        <MenuItem />
      </Box>
      <Divider sx={{ backgroundColor: "#ffffff3b" }} />

      <Box
        sx={{
          height: "7%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "8",
        }}
      >
        <IconButton
          aria-controls={openMenuLang ? "settingMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenuLang ? "true" : undefined}
          onClick={handleClickMenuLang}
          id="settingBtn"
        >
          <SettingsIcon />
        </IconButton>
        <MU
          anchorEl={anchorEl}
          open={openMenuLang}
          onClose={handleCloseMenuLang}
          id="settingMenu"
          aria-labelledby="settingBtn"
        >
          <MI
            aria-controls={openMenuLangList ? "settingMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenuLangList ? "true" : undefined}
            onClick={handleClickMenuLangList}
          >
            Language list
          </MI>
          <MI
            onClick={() =>
              dispatch(
                toggleTheme({
                  theme: theme.palette.mode === "light" ? "dark" : "light",
                })
              )
            }
          >
            {t("menu.setting.toggleTheme", {
              theme: t(theme.palette.mode === "light" ? "dark" : "light"),
            })}
          </MI>
        </MU>
        <MU
          anchorEl={anchorElLanguageList}
          open={openMenuLangList}
          onClose={handleCloseMenuLangList}
          id="settingMenu"
          aria-labelledby="settingBtn"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          // sx={{marginLeft:"30px"}}
        >
          <Link href={router.pathname} locale="en-us">
            <MI>English</MI>
          </Link>
          <Link href={router.pathname} locale="fa-ir">
            <MI>فارسی</MI>
          </Link>
        </MU>
      </Box>
      <Image className="img" src="/image/Nav.svg" layout="fill" alt="" />
    </Drawer>
  );
};
