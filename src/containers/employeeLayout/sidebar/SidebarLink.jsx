import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIgloo,
  faTasks,
  faSlidersH,
  faClock,
  faClipboardList,
  faClipboard,
  faNewspaper,
  faSignOutAlt,
  faLayerGroup,
  faPlusCircle,
  faCog,
  faAddressBook,
  faSyncAlt,
  faFilePdf,
  faHandHoldingUsd,
  faExchangeAlt,
  faMoneyCheckAlt,
  faCity,
  faFlagUsa,
  faAt,
  faCalendarDay,
  faEnvelope,
  faMapMarkedAlt,
  faAddressCard,
  faHourglassHalf,
  faUsers,
  faHashtag
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faIgloo,
  faTasks,
  faSlidersH,
  faClock,
  faClipboardList,
  faClipboard,
  faNewspaper,
  faSignOutAlt,
  faLayerGroup,
  faPlusCircle,
  faCog,
  faAddressBook,
  faSyncAlt,
  faFilePdf,
  faHandHoldingUsd,
  faExchangeAlt,
  faMoneyCheckAlt,
  faCity,
  faFlagUsa,
  faAt,
  faCalendarDay,
  faEnvelope,
  faMapMarkedAlt,
  faAddressCard,
  faHourglassHalf,
  faUsers,
  faHashtag
);

const SidebarLink = ({ title, icon, newLink, route, onClick }) => (
  <NavLink to={route} onClick={onClick} activeClassName="sidebar__link-active">
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
