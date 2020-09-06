import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLink = ({ title, icon, newLink, route, onClick }) => (
  // console.log(route),
  (
    <NavLink
      to={route}
      onClick={onClick}
      activeClassName="sidebar__link-active"
    >
      <li className="sidebar__link">
        {icon ? <FontAwesomeIcon icon={icon} /> : ""}
        <p className="sidebar__link-title">
          {title}
          {newLink ? (
            <Badge className="sidebar__link-badge">
              <span>New</span>
            </Badge>
          ) : (
            ""
          )}
        </p>
      </li>
    </NavLink>
  )
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func
};

SidebarLink.defaultProps = {
  icon: "",
  newLink: false,
  route: "/",
  onClick: () => {}
};

export default SidebarLink;
