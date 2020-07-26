import React, { Component } from "react";
import classNames from "classnames";
import CloseIcon from "mdi-react/CloseIcon";
import PropTypes from "prop-types";
import {
  CustomizerProps,
  SidebarProps,
  ThemeProps
} from "../../../shared/prop-types/ReducerProps";
import ToggleTheme from "./ToggleTheme";
import ToggleCollapsedMenu from "./ToggleCollapsedMenu";
import ToggleSquared from "./ToggleSquared";
import ToggleShadow from "./ToggleShadow";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'


library.add( faSlidersH)



const settings = `${process.env.PUBLIC_URL}/img/settings.svg`;

export default class Customizer extends Component {
  static propTypes = {
    sidebar: SidebarProps.isRequired,
    customizer: CustomizerProps.isRequired,
    theme: ThemeProps.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
    toggleTopNavigation: PropTypes.func.isRequired,
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    changeBorderRadius: PropTypes.func.isRequired,
    toggleBoxShadow: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const customizerClass = classNames({
      customizer__wrap: true,
      "customizer__wrap--open": this.state.open
    });

    const {
      changeSidebarVisibility,
      sidebar,
      customizer,
      theme,
      toggleTopNavigation,
      changeToDark,
      changeToLight,
      changeBorderRadius,
      toggleBoxShadow
    } = this.props;

    return (
      <div className="customizer">
        <button className="customizer__btn" onClick={this.handleOpen}>
        <FontAwesomeIcon icon="sliders-h" color="#4e64b2" className="customizer__btn-icon"/>
        </button>
        <div className={customizerClass}>
          <div className="customizer__title-wrap">
            <h5>Theme Customizer</h5>
            <button className="customizer__close-btn" onClick={this.handleOpen}>
              <CloseIcon />
            </button>
          </div>
          <p className="customizer__caption" />
          <ToggleCollapsedMenu
            changeSidebarVisibility={changeSidebarVisibility}
            sidebar={sidebar}
          />
          <ToggleTheme
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            theme={theme}
          />
          <ToggleSquared
            customizer={customizer}
            changeBorderRadius={changeBorderRadius}
          />
          <ToggleShadow
            customizer={customizer}
            toggleBoxShadow={toggleBoxShadow}
          />
        </div>
      </div>
    );
  }
}
