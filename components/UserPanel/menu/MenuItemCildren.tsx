import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import { userPanelMenuSelector } from "@/redux_/slices/common/UserPanelMenu";

const MenuItemCildren = (props: any) => {
  const { show } = useSelector(userPanelMenuSelector);
  const router = useRouter();
  console.log("prooops" , props);
  
  return (
    <Accordion
      disableGutters={true}
      expanded={props.expand === props.el.id}
      onClick={props.onClick}
      sx={{
        background: "transparent",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <AccordionSummary expandIcon={show ? <ExpandMoreIcon /> : null}>
        {show == false && (
          <Tooltip arrow title={props.el.title} placement="left-start">
            {props.el.icon}
          </Tooltip>
        )}
        {show && (
          <Fragment>
            {props.el.icon}
            <Typography sx={{ display: "flex" }}>{props.el.title}</Typography>
          </Fragment>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0px" }}>
        <List
          sx={(theme) => ({
            "& > .active": {
              background: "#ffffff26",
            },
            "& > li": {
              transition: theme.transitions.create("background", {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            "& > li:hover:not(& > .active)": {
              background: "#a9a1e714",
            },
          })}
        >
          {props.el.list.map((el: any, i: number) => (
            <ListItem
              disablePadding
              key={i}
              className={
                el.activeRoute.split(",").includes(router.pathname)
                  ? "active"
                  : ""
              }
              onClick={() => router.push(el.href)}
            >
              <ListItemButton>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuItemCildren;
