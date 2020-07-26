import React, { Component } from "react";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAlignLeft);
const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

class TopbarSidebarButton extends Component {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired
  };

  render() {
    const {
      changeMobileSidebarVisibility,
      changeSidebarVisibility
    } = this.props;

    return (
      <div>
        <button
          className="topbar__button topbar__button--desktop"
          onClick={changeSidebarVisibility}
        >
          <FontAwesomeIcon
            icon="align-left"
            color="#4e64b2"
            className="customizer__btn-icon topbar__button-icon"
          />
        </button>
        <button
          className="topbar__button topbar__button--mobile"
          onClick={changeMobileSidebarVisibility}
        >
          <FontAwesomeIcon
            icon="align-left"
            color="#4e64b2"
            className="customizer__btn-icon topbar__button-icon"
          />
        </button>
      </div>
    );
  }
}

export default TopbarSidebarButton;
