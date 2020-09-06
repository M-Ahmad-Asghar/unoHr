import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from  'clsx';

import logo from './images/logo.png';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        color: '#3D4042',
        backgroundColor: 'white',
        fontFamily: 'Sen',
    },
    toolBar: {
        margin: [[0, '2%']],
        padding: 16,
    },
    navList: {
        listStyle: 'none',
        display: 'inline',
        marginLeft: 16,
        marginRight: 16
    },
    sectionDesktop: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

const NavBar = (props) => {
    const { classes } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                <a href="#" className={clsx('empBtton', 'unoBtton')}>
                    <span>Employer</span>
                </a>
            </MenuItem>
            <MenuItem>
                <a href="#" className={clsx('empBtton', 'unoBtton')}>
                    <span>Employee</span>
                </a>
            </MenuItem>
            <MenuItem>
                <div>
                    <button className={clsx('signupButton', 'unoBtton')}>
                        Signup
                    </button>
                </div>
            </MenuItem>
        </Menu>
    );

    const handleScroll = () => {
        let i;
        console.log('====================================');
        console.log(i++);
        console.log('====================================');
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} onScroll={handleScroll}>
                <Toolbar className='nav-wrapper toolbar'>
                    <div className={classes.sectionDesktop}>
                        <div className="">
                            <img className='logo' src={logo} alt="logo"/>
                        </div>
                        <div className='navItems'>

                            <ul style={{display: 'inline'}}>
                                <li className={classes.navList}> Home </li>
                                <li className={classes.navList}> Features </li>
                                <li className={classes.navList}> Pricing </li>
                                <li className={classes.navList}> FAQ </li>
                                <li className={classes.navList}> Contact </li>
                            </ul>
                            <a href="#" className={clsx('empBtton', 'unoBtton')}>
                                <span>
                                    Employer
                                </span>
                            </a>
                            <a href="#" className={clsx('empBtton', 'unoBtton')}>
                                <span>
                                    Employee
                                </span>
                            </a>

                        </div>
                        <div>
                            <button className={clsx('signupButton', 'unoBtton')}>
                                Signup
                            </button>
                        </div>
                    </div>

                    <div className={classes.sectionMobile}>
                        <div className="">
                            <img className='logo' src={logo} alt="logo"/>
                        </div>
                        <IconButton className={classes.menuButton} color="inherit" onClick={handleMobileMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </div>

    );
}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

// export default NavBar;