import React, { useState } from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const styles = theme => ({
    FAQContainer: {
        paddingTop: 96,
        paddingBottom: 96,
    },
    FAQTitle: {
        fontSize: 30,
        color: 'rgb(37, 39, 40)',
        marginBottom: 64,
        marginTop: 0,
        fontWeight: 600,
    },
    heroText: {
        color: '#6E7477',
        fontSize: 20
    },
    heroTextContainer: {
        marginTop: 125,
        marginBottom: 135
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

// const useStyles = makeStyles((theme) => ({
//     FAQContainer: {
//         paddingTop: 96,
//         paddingBottom: 96,
//         margin: [[0, '4%']],
//     },
//     FAQTitle: {
//         fontSize: 40,
//         fontFamily: 'sans-serif',
//         color: 'rgb(37, 39, 40)',
//         marginBottom: 64,
//         marginTop: 0,
//     },
//     heroText: {
//         color: '#6E7477',
//         fontSize: 20
//     },
//     heroTextContainer: {
//         marginTop: 125,
//         marginBottom: 135
//     }
// }));

const FAQ = (props) => {
    const { classes } = props;
    const [ expanded, setExpanded ] = useState(false);
    const [ toggle, setToggle] = useState(false);
    const [ action, setAction] = useState('closed');

    const handleOpenClose = () => {
        setToggle(toggle => !toggle);
        // let action;
        if (toggle) {
            setAction(state => state = 'opened');
            setToggle(state => state = false);
            console.log("True:: ",  toggle, action);
        }
        else {
            setAction(state => state = 'closed');
            setToggle(state => state = true);
            console.log("False:: ",  toggle, action);
        }
    };

    const handleExpandClick = () => {
        setExpanded(expanded => (!expanded ));
    };
    console.log('====================================');
    console.log('expanded:>> ', typeof(expanded));
    console.log('====================================');
    return (
        <div className={classes.FAQContainer}>
            <div >
                <center>
                    <h2 className={classes.FAQTitle}>FAQ</h2>
                </center>
            </div>
            <div className="faq-wrapper">
                <ul className="faq-list-wrapper">
                    <li className="">
                        <div className="faq-li-body-wrapper">
                            <div className="faq-animation">
                                <button className="faq-button " onClick={handleOpenClose}>
                                    <div className="faq-button-body">
                                        <span className="faq-plus-minus-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            {
                                                !toggle ? (
                                                    <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path>
                                                ) :  (
                                                    <path d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"></path>
                                                )

                                            }
                                        </svg>
                                        </span>
                                        <div>
                                            <p className="faq-list-title">Am I considered a household employer?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="faq-text">
                                                if you hired someone to do household work (work done in or around your primary home)
                                                and paid $2200 in 2020 or $1000 in a calendar quarter then you are considered household
                                                employer. The worker is your employee if you can control not only what work is done, but
                                                how it is done. Some examples of household employees: Babysitters, Butlers, Caregivers,
                                                Cooks, Domestic workers, Drivers, Health aides, House cleaning workers, Housekeepers,
                                                Maids, Nannies, Private nurses, and Yard workers. See IRS publication 926 for detailed
                                                definitions. <br/>
                                                <a href="https://www.irs.gov/publications/p926" target="_blank">https://www.irs.gov/publications/p926</a>
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className="">
                        <div className="faq-li-body-wrapper">
                            <div className="faq-animation">
                                <button className="faq-button " onClick={handleOpenClose}>
                                    <div className="faq-button-body">
                                        <span className="faq-plus-minus-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            {
                                                !toggle ? (
                                                    <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path>
                                                ) :  (
                                                    <path d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"></path>
                                                )

                                            }
                                        </svg>
                                        </span>
                                        <div>
                                            <p className="faq-list-title">What are my obligations as a household employer?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="faq-text">
                                                Here are five core obligations as a household employer. <br/>
                                                <ol>
                                                    <li>Obtain Employer identification number (EIN).
                                                        <a href="IRS.gov/EIN">IRS.gov/EIN</a>.
                                                    </li>
                                                    <li>Register &amp; file “new hiring report” for each hire with state and local agencies.</li>
                                                    <li>Every pay period - Withhold Social Security, Medicare and income taxes from the employee’s
                                                        paycheck and make employer federal &amp; state contributions.</li>
                                                    <li>Quarterly - Submit the proper paperwork and payments IRS, state &amp; others.</li>
                                                    <li>Year-end - Prepare employer Schedule H and issue employee W-2.</li>
                                                </ol>
                                                <a href="https://www.irs.gov/publications/p926" target="_blank">https://www.irs.gov/publications/p926</a>
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

FAQ.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);

// export default FAQ;