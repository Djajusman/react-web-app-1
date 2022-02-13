import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_navOperator";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
    show={show}
    style={{backgroundColor:"#025B95"}}
    onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
  >
    <CSidebarBrand className="d-md-down-none" to="/">
      <CImg
        className="c-sidebar-brand-full my-5"
        src="img/aktiv_logo.svg"
        height={168}
      />
      <CIcon
        className="c-sidebar-brand-minimized"
        src="img/aktiv_logo.svg"
        height={40}
      />
    </CSidebarBrand>
    <CSidebarNav>
      <CCreateElement
        items={navigation}
        components={{
          CSidebarNavDivider,
          CSidebarNavDropdown,
          CSidebarNavItem,
          CSidebarNavTitle,
        }}
      />
    </CSidebarNav>
    <CSidebarMinimizer className="c-d-md-down-none" />
  </CSidebar>
  );
};

export default React.memo(TheSidebar);
