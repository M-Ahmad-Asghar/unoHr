import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
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


    return (
        <div className={classes.FAQContainer}>
            <div >
                <center>
                    <h2 className={classes.FAQTitle}>FAQ</h2>
                </center>
            </div>
            <div className="lp-faq-wrapper">
                <ul className="lp-faq-list-wrapper">
                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">Am I considered a household employer?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
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
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">What are my obligations as a household employer?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
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

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">What taxes are paid and how are they collected?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                            Every pay period household employer taxes are 1) Payroll tax withheld from the
                                            employee and 2) the employer tax contribution. Both of these amounts are withdrawn
                                            from Employer bank account and remitted along with paperwork.
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">What Forms are needed for Household Employer?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                                <b>Form SS-4:</b> Fill out Form SS-4 or apply online through the IRS to obtain your federal Employee
                                                Identification Number (FEIN) which you’ll need for tax forms. <br/>
                                                <b>Form I-9:</b> Have your nanny
                                                complete this form when hired and be sure she provides you with documents proving employment eligibility.
                                                <br/>
                                                <b>Form W-2:</b> Complete Form W-2 if you pay Social Security and Medicare wages of $2,200 or more or
                                                if you deduct income taxes from your employee’s pay. Give Copies B, C and 2 to your employee. Copy A
                                                (along with Form W-3) goes to the Social Security. <br/>
                                                <b>Schedule H:</b> If you pay your nanny wages of $2,200 or more or if you paid $1,000 or more in a
                                                calendar quarter you must file Schedule H with your federal income tax return
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">What laws apply to household employers?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                                Depending on your residency and tax situation many laws apply to the household employer. Please consult
                                                your tax advisor. We do not provide legal or employment advice. Here are some the laws that commonly apply to household employers:$
                                            </p>
                                            <ol className="lp-faq-text"><li>Employer Taxes</li><li>Minimum Wage laws</li><li>Overtime Laws</li></ol>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">Do you find employees for me?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                                No, we do not find employees with our service. Our services begin once you identify and decide
                                                to hire an employee. We do rest of the work from that point on.
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">DO I have to provide vacation, holiday, and sick pay?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                                Household employers generally do not need to provide vacation or holiday pay.
                                                Household employers in some cities and states are required to provide sick pay for their
                                                employees (typically based on their employee&#39;s hours worked).
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">How are you different from other people?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                                Our all-in-one platform is designed to do all functions to manager household employees. Those
                                                functions are: On-Boarding, background checks, task manager, timesheets, payroll and employee
                                                rewards. Our platform is built from scratch to meet the needs of household employers and you
                                                can use the app entirely on any smartphone (IOS or Android).
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                {console.log('calling from 2')}
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">Do I have to provide worker's compensation insurance?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                            <b>Depending on where you live</b> , states require household employers to carry a workers’ compensation policy
                                            depending on whether your employee works part-time or full-time. This type of policy will provide compensation
                                            to an employee who is injured on the job. Even if your state does not require it, we strongly advise you to
                                            obtain coverage for your employee. We provide links to obtain workers compensation.
                                            </p>
                                            </Collapse>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className="">
                        <div className="lp-faq-li-body-wrapper">
                            <div className="lp-faq-animation">
                                <button className="lp-faq-button " onClick={handleOpenClose}>
                                    <div className="lp-faq-button-body">
                                        <span className="lp-faq-plus-minus-container">
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
                                            <p className="lp-faq-list-title">What your fees, contracts and cancellation terms?</p>
                                            <Collapse in={toggle} timeout="auto" unmountOnExit>
                                            <p color="gray.1" className="lp-faq-text">
                                                Our pricing is simple and straightforward, $40 per month that includes 1 employee with standard background
                                                check. No contracts, hidden fees, no additional sign-up, quarterly, annual and a la carte costs. Each
                                                additional employee $10 per month.
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
