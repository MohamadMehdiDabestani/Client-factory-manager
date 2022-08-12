import { Fragment, FC, ReactNode } from "react";
import { Menu } from "@/components";

import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { userPanelMenuSelector } from "@/redux_/slices/common/UserPanelMenu";
interface Props {
  children: ReactNode;
}
export const UserLayout: FC<Props> = ({ children }) => {
  const { show } = useSelector(userPanelMenuSelector);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Fragment>
      <Menu />
      <Box
        sx={(theme) => ({
          marginLeft: show ? (matches ? "0px" : "230px") : "50px",
          padding: "20px 0",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        })}
      >
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Fragment>
  );
};
