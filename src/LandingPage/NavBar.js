import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ReactShadowScroll from "react-shadow-scroll";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    color: "#3D4042",
    backgroundColor: "white",
    fontFamily: "Sen",
  },
  toolBar: {
    margin: [[0, "2%"]],
    padding: 16,
  },
  navItemsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  navList: {
    listStyle: "none",
    display: "inline",
    marginLeft: 16,
    marginRight: 16,
  },
  sectionDesktop: {
    display: "none",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  mobielNavBar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  sectionMobile: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

const NavBar = (props) => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { EmployerApp, EmployeeApp } = props;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <p>Features</p>
      </MenuItem>
      <MenuItem>
        <p>Pricing</p>
      </MenuItem>
      <MenuItem>
        <p>FAQ</p>
      </MenuItem>
      <MenuItem>
        <p>Contact</p>
      </MenuItem>
      <MenuItem>
        <Link to="/employeer/login">
          <button
            className={clsx("lp-empBtton", "lp-unoBtton")}
            onClick={EmployerApp}
          >
            Employer
          </button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/employee/login">
          <button
            className={clsx("lp-empBtton", "lp-unoBtton")}
            onClick={EmployeeApp}
          >
            Employee
          </button>
        </Link>
      </MenuItem>
      <MenuItem>
        <div>
          <button className={clsx("lp-signupButton", "lp-unoBtton")}>
            Signup
          </button>
        </div>
      </MenuItem>
    </Menu>
  );

  return (
    <ReactShadowScroll>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className="lp-nav-wrapper lp-toolbar">
            <div className={classes.sectionDesktop}>
              <div className={classes.navItemsContainer}>
                <div className="">
                  <Link to="/">
                    <img className="lp-logo" src={logo} alt="logo" />
                  </Link>
                </div>
                <div className="lp-navItems">
                  <ul style={{ display: "inline" }}>
                    <li
                      style={{ cursor: "pointer" }}
                      className={classes.navList}
                      onClick={() => {
                        props.executeScroll("home");
                      }}
                    >
                      {" "}
                      Home{" "}
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className={classes.navList}
                      onClick={() => {
                        props.executeScroll("features");
                      }}
                    >
                      {" "}
                      Features{" "}
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className={classes.navList}
                      onClick={() => {
                        props.executeScroll("pricing");
                      }}
                    >
                      {" "}
                      Pricing{" "}
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className={classes.navList}
                      onClick={() => {
                        props.executeScroll("faq");
                      }}
                    >
                      {" "}
                      FAQ{" "}
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className={classes.navList}
                      onClick={() => {
                        props.executeScroll("contact");
                      }}
                    >
                      {" "}
                      Contact{" "}
                    </li>
                  </ul>
                  <Link to="/employeer/login">
                    <button
                      className={clsx("lp-empBtton", "lp-unoBtton")}
                      onClick={EmployerApp}
                    >
                      Employer
                    </button>
                  </Link>
                  <Link to="/employee/login">
                    <button
                      className={clsx("lp-empBtton", "lp-unoBtton")}
                      onClick={EmployeeApp}
                    >
                      Employee
                    </button>
                  </Link>
                </div>
                <div>
                  {/* <button className={clsx('lp-signupButton', 'lp-unoBtton')}>
                                    Signup
                                </button> */}
                </div>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <div className={classes.mobielNavBar}>
                <div style={{ display: "inline" }}>
                  <Link to="/">
                    <img className="lp-logo" src={logo} alt="logo" />
                  </Link>
                </div>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
      </div>
    </ReactShadowScroll>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
