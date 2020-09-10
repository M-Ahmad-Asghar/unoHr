import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import logo from "../assets/Logo-Extra.png";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { EmployerApp, EmployeeApp } = this.props;
    return (
      <div>
        <Navbar light expand="md" className=" vertical-scrolling">
          <NavbarBrand className="topbar__logo">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ marginLeft: "30px", color: "#fff" }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav
              className="ml-auto"
              navbar
              style={{ paddingTop: "15px", paddingRight: "35px" }}
            >
              <NavItem>
                <NavLink
                  href="#home"
                  style={{ color: "#fff" }}
                >
                  HOME
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#about"
                  style={{ color: "#fff" }}
                >
                  ABOUT
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#features"
                  style={{ color: "#fff" }}
                >
                  FEATURE
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#price"
                  style={{ color: "#fff" }}
                >
                  PRICE
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#contact"
                  style={{ color: "#fff" }}
                >
                  CONTACT US
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ padding: "0px" }}>
                  <Button
                    outline
                    color="#fff"
                    className="decButton"
                    onClick={EmployerApp}
                  >
                    EMPLOYER
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ padding: "0px" }}>
                  <Button
                    outline
                    color="#fff"
                    className="decButton"
                    onClick={EmployeeApp}
                  >
                    EMPLOYEE
                  </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
