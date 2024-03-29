/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Nav } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
// import SidebarData from '../sidebardata/SidebarData';
import NavItemContainer from "./NavItemContainer";
import NavSubMenu from "./NavSubMenu";
// import user1 from '../../../assets/images/users/user4.jpg';
import userCeluparts from "../../../assets/images/users/userCeluparts.png";
// import probg from '../../../assets/images/bg/download.jpg';
import sidebarCeluparts from "../../../assets/images/bg/sidebarCeluparts2.jpg";
// import { useState } from 'react';
import SidebarDatas from "../sidebardata/SidebarData";
import getSingleUser from "../../../services/getSingleUser";

const Sidebar = () => {
  const { SidebarData } = SidebarDatas();

  const location = useLocation();
  const currentURL = location.pathname.split("/").slice(0, -1).join("/");

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await getSingleUser({
        id: JSON.parse(localStorage.getItem("user")).idUser
      });
      setUser(user[0]);
    };
    try {
      if (JSON.parse(localStorage.getItem("user")).idUser) {
        getUser();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector(state => state.customizer.sidebarBg);
  const isFixed = useSelector(state => state.customizer.isSidebarFixed);
  // const dispatch = useDispatch();

  return (
    <div
      className={`sidebarBox shadow bg-${activeBg} ${
        isFixed ? "fixedSidebar" : ""
      }`}
    >
      <SimpleBar style={{ height: "100%" }}>
        <div
          className="profilebg"
          style={{ background: `url(${sidebarCeluparts}) no-repeat` }}
        >
          <div className="p-3 d-flex">
            <img
              src={userCeluparts}
              alt="user"
              width="50"
              className="rounded-circle"
            />
          </div>
          <div className="bg-dark text-dark-white p-2 opacity-75 text-truncate">
            {user?.names} {user?.surnames}
          </div>
        </div>
        {/********Sidebar Content*******/}
        <div className="p-3 pt-1 mt-2">
          <Nav vertical className={activeBg === "white" ? "" : "lightText"}>
            {SidebarData.map(navi => {
              if (navi.caption) {
                return (
                  <div
                    className="navCaption text-uppercase mt-4"
                    key={navi.caption}
                  >
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={
                    location.pathname === navi.href ? "activeLink" : ""
                  }
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
