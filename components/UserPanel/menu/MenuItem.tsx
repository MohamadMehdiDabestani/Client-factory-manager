import { Fragment, useEffect, useState } from "react";
import MenuItemCildren from "./MenuItemCildren";
import { list } from "@/public/data";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/redux_/store";
import {
  toggleUserMenu,
  userPanelMenuSelector,
} from "@/redux_/slices/common/UserPanelMenu";
const MenuItem = () => {
  const {show} = useSelector(userPanelMenuSelector);
  const [active, setActive] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleExpand = () => {
    list.map((el) => {
      console.log("location.pathname" , location.pathname);
      
      let cehck = el.routes.split(",").includes(location.pathname);
      if (cehck) {
        setActive(el.id);
      }
    });
  };
  useEffect(() => {
    if (show) {
      handleExpand();
    } else {
      setActive("");
    }
  }, [show]);
  const handleClick = (id : string) => {
    setActive(id);
    dispatch(toggleUserMenu({show:true}));
  };
  return (
    <Fragment>
      {list.map((el, i) => (
        <MenuItemCildren
          el={el}
          key={i}
          expand={active}
          onClick={() => handleClick(el.id)}
        />
      ))}
    </Fragment>
  );
};

export default MenuItem;
