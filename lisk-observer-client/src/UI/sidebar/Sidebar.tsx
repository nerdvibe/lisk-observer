import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav } from "reactstrap";
import { Routes } from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SidebarProps {
  location: Location;
  toggleSidebar: () => void;
  bgColor: "primary" | "blue" | "green";
  routes: Routes[];
  logo: {
    innerLink: string;
    text: string;
    imgSrc: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  location,
  routes = [],
  logo,
  toggleSidebar,
}) => {
  const isActiveRoute = (routeName: string) => {
    if (routeName === "/") {
      return location.pathname === "/" ? "active" : "";
    }
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const logoImg = (
    <Link
      to={logo.innerLink}
      className="simple-text logo-mini"
      onClick={toggleSidebar}
    >
      <div className="logo-img">
        <img src={logo.imgSrc} alt="chain-logo" />
      </div>
    </Link>
  );
  const logoText = (
    <Link
      to={logo.innerLink}
      className="simple-text logo-normal"
      onClick={toggleSidebar}
    >
      {logo.text}
    </Link>
  );
  return (
    <div className="sidebar sidebar-bg-dark">
      <div className="sidebar-wrapper">
        <div className="logo">
          {logoImg}
          {logoText}
        </div>
        <Nav>
          {routes.map((prop: any, key: any) => {
            if (prop.redirect) return null;
            return (
              <li
                className={
                  isActiveRoute(prop.link || prop.path) +
                  (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.link || prop.path}
                  className="nav-link"
                  activeClassName="active"
                  onClick={toggleSidebar}
                >
                  <FontAwesomeIcon
                    icon={prop.icon}
                    className="mr-1 font-initial"
                  />
                  {prop.name}
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
};
