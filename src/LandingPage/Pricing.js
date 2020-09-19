import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    pricingContainer: {
        paddingTop: 96,
        paddingBottom: 96,
    },
    pricingTitle: {
        textAlign: 'center',
        fontSize: 30,
        color: '#252728',
        marginBottom: 16,
        fontWeight: 600,
    },
    pricingTitleSub: {
        fontSize: 16,
        color: '#6E7477',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardContainer: {

    },
    card: {
        maxWidth: 359.33,
        minHeight: 458.4,
        display: 'flex',
        flexDirection: 'column',
        padding: [[48, 32]],
        borderRadius: 64,
        boxShadow: 'rgba(34, 39, 43, 0.06)',
        backgroundColor: 'red'
    },
    cardText: {
        maxWidth: 295,
    },
    card1Link: {
        color: '#BDC0C2',
        fontSize: 16,
        textDecoration: 'none',
    },
    card2Title: {
        display: 'flex',
        justifyContent: 'center',
        color: 'rgb(63, 81, 181)',
    },
    card2Body: { textAlign: 'left'},
    card2List: {
        listStyle: [['outside', 'none', 'none']],
        padding: 0,
    },
    card2ListItems: {
        padding: [[16, 0]],
        borderBottom: [[1, 'solid', 'rgb(228, 230, 231)']],
    },
    listStyleIconContainer: {
        display: 'inline-block',
        fontSize: 24,
        marginBottom: -6,
        marginRight: 16,
        color: 'rgb(63, 81, 181)',
        boxSizing: 'border-box',
    },
    listStyleIcon: {
        display: 'block',
        width: '1em',
    },
});

const Pricing = (props) => {
    const { classes } = props;

    return (
        <div className={classes.pricingContainer}>
            <div className='lp-pricing-title'>
                <h2 className={classes.pricingTitle}>Pricing</h2>
                <p className={classes.pricingTitleSub}>No Contract | No Sign-up Fee | No Direct Deposit Fee | No Filing Fees</p>
            </div>
            <div className='animation'>
                <div className="cKOUfV">
                    <div className="lp-pricing-cards-container">
                        <div className="lp-pricing-card">
                            <div className=''>
                                <p >
                                    <b>Our 30-day guarantee</b> if you decide to close your account within 30 days
                                    of signing up, we`ll refund 100% of your payment
                                </p>
                                <br/>
                                <a href="#"> View Terms & Conditions </a>
                            </div>
                        </div>
                        <div className="lp-pricing-card">
                            <div className='lp-card2Title'>
                                <p style={{fontSize: 30, margin: 0, lineHeight: 1.3, fontWeight: 'bold'}}>$</p>
                                <p style={{fontSize: '6rem', margin: 0, lineHeight: 1}}>40</p>
                                <p style={{fontSize: 30, margin: 0, lineHeight: 1.3, fontWeight: 'bold'}}> <br/>/ month</p>
                            </div>
                            <div className='lp-card2Body'>
                                <ul className='lp-card2List'>
                                    <li className='lp-card2ListItems'>
                                        <span className='lp-listStyleIconContainer'>
                                            <svg className='lp-listStyleIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.84 14.25H8.91C9.13278 14.25 9.34644 14.3385 9.50397
                                            14.496C9.6615 14.6536 9.75 14.8672 9.75 15.09V20.16C9.75 20.3828 9.8385 20.5964 9.99603 20.754C10.1536 20.9115 10.3672 21
                                            10.59 21H13.41C13.5203 21 13.6295 20.9783 13.7315 20.9361C13.8334 20.8938 13.926 20.832 14.004 20.754C14.082 20.676 14.1438
                                            20.5834 14.1861 20.4815C14.2283 20.3795 14.25 20.2703 14.25 20.16V15.09C14.25 14.8672 14.3385 14.6536 14.496 14.496C14.6536
                                            14.3385 14.8672 14.25 15.09 14.25H20.16C20.3828 14.25 20.5964 14.1615 20.754 14.004C20.9115 13.8464 21 13.6328 21 13.41V10.59C21
                                            10.4797 20.9783 10.3705 20.9361 10.2685C20.8938 10.1666 20.832 10.074 20.754 9.99603C20.676 9.91803 20.5834 9.85615 20.4815
                                            9.81394C20.3795 9.77173 20.2703 9.75 20.16 9.75H15.09C14.8672 9.75 14.6536 9.6615 14.496 9.50397C14.3385 9.34644 14.25 9.13278
                                            14.25 8.91V3.84C14.25 3.61722 14.1615 3.40356 14.004 3.24603C13.8464 3.0885 13.6328 3 13.41 3H10.59C10.3672 3 10.1536 3.0885
                                            9.99603 3.24603C9.8385 3.40356 9.75 3.61722 9.75 3.84V8.91C9.75 9.13278 9.6615 9.34644 9.50397 9.50397C9.34644 9.6615 9.13278
                                            9.75 8.91 9.75H3.84C3.61722 9.75 3.40356 9.8385 3.24603 9.99603C3.0885 10.1536 3 10.3672 3 10.59V13.41C3 13.6328 3.0885
                                            13.8464 3.24603 14.004C3.40356 14.1615 3.61722 14.25 3.84 14.25Z" fill="currentColor"></path></svg>
                                        </span>
                                        All Features Included
                                    </li>
                                    <li className='lp-card2ListItems'>
                                        <span className='lp-listStyleIconContainer'>
                                            <svg className='lp-listStyleIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.84 14.25H8.91C9.13278 14.25 9.34644 14.3385 9.50397
                                            14.496C9.6615 14.6536 9.75 14.8672 9.75 15.09V20.16C9.75 20.3828 9.8385 20.5964 9.99603 20.754C10.1536 20.9115 10.3672 21
                                            10.59 21H13.41C13.5203 21 13.6295 20.9783 13.7315 20.9361C13.8334 20.8938 13.926 20.832 14.004 20.754C14.082 20.676 14.1438
                                            20.5834 14.1861 20.4815C14.2283 20.3795 14.25 20.2703 14.25 20.16V15.09C14.25 14.8672 14.3385 14.6536 14.496 14.496C14.6536
                                            14.3385 14.8672 14.25 15.09 14.25H20.16C20.3828 14.25 20.5964 14.1615 20.754 14.004C20.9115 13.8464 21 13.6328 21 13.41V10.59C21
                                            10.4797 20.9783 10.3705 20.9361 10.2685C20.8938 10.1666 20.832 10.074 20.754 9.99603C20.676 9.91803 20.5834 9.85615 20.4815
                                            9.81394C20.3795 9.77173 20.2703 9.75 20.16 9.75H15.09C14.8672 9.75 14.6536 9.6615 14.496 9.50397C14.3385 9.34644 14.25 9.13278
                                            14.25 8.91V3.84C14.25 3.61722 14.1615 3.40356 14.004 3.24603C13.8464 3.0885 13.6328 3 13.41 3H10.59C10.3672 3 10.1536 3.0885
                                            9.99603 3.24603C9.8385 3.40356 9.75 3.61722 9.75 3.84V8.91C9.75 9.13278 9.6615 9.34644 9.50397 9.50397C9.34644 9.6615 9.13278
                                            9.75 8.91 9.75H3.84C3.61722 9.75 3.40356 9.8385 3.24603 9.99603C3.0885 10.1536 3 10.3672 3 10.59V13.41C3 13.6328 3.0885
                                            13.8464 3.24603 14.004C3.40356 14.1615 3.61722 14.25 3.84 14.25Z" fill="currentColor"></path></svg>
                                        </span>
                                        <b>1</b> Employee Included*</li>
                                    <li className='lp-card2ListItems'>
                                        <span className='lp-listStyleIconContainer'>
                                            <svg className='lp-listStyleIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.84 14.25H8.91C9.13278 14.25 9.34644 14.3385 9.50397
                                            14.496C9.6615 14.6536 9.75 14.8672 9.75 15.09V20.16C9.75 20.3828 9.8385 20.5964 9.99603 20.754C10.1536 20.9115 10.3672 21
                                            10.59 21H13.41C13.5203 21 13.6295 20.9783 13.7315 20.9361C13.8334 20.8938 13.926 20.832 14.004 20.754C14.082 20.676 14.1438
                                            20.5834 14.1861 20.4815C14.2283 20.3795 14.25 20.2703 14.25 20.16V15.09C14.25 14.8672 14.3385 14.6536 14.496 14.496C14.6536
                                            14.3385 14.8672 14.25 15.09 14.25H20.16C20.3828 14.25 20.5964 14.1615 20.754 14.004C20.9115 13.8464 21 13.6328 21 13.41V10.59C21
                                            10.4797 20.9783 10.3705 20.9361 10.2685C20.8938 10.1666 20.832 10.074 20.754 9.99603C20.676 9.91803 20.5834 9.85615 20.4815
                                            9.81394C20.3795 9.77173 20.2703 9.75 20.16 9.75H15.09C14.8672 9.75 14.6536 9.6615 14.496 9.50397C14.3385 9.34644 14.25 9.13278
                                            14.25 8.91V3.84C14.25 3.61722 14.1615 3.40356 14.004 3.24603C13.8464 3.0885 13.6328 3 13.41 3H10.59C10.3672 3 10.1536 3.0885
                                            9.99603 3.24603C9.8385 3.40356 9.75 3.61722 9.75 3.84V8.91C9.75 9.13278 9.6615 9.34644 9.50397 9.50397C9.34644 9.6615 9.13278
                                            9.75 8.91 9.75H3.84C3.61722 9.75 3.40356 9.8385 3.24603 9.99603C3.0885 10.1536 3 10.3672 3 10.59V13.41C3 13.6328 3.0885
                                            13.8464 3.24603 14.004C3.40356 14.1615 3.61722 14.25 3.84 14.25Z" fill="currentColor"></path></svg>
                                        </span>
                                        <b>Standard</b> Background check**</li>
                                    <li className='lp-card2ListItems'>
                                        <span className='lp-listStyleIconContainer'>
                                            <svg className='lp-listStyleIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.84 14.25H8.91C9.13278 14.25 9.34644 14.3385 9.50397
                                            14.496C9.6615 14.6536 9.75 14.8672 9.75 15.09V20.16C9.75 20.3828 9.8385 20.5964 9.99603 20.754C10.1536 20.9115 10.3672 21
                                            10.59 21H13.41C13.5203 21 13.6295 20.9783 13.7315 20.9361C13.8334 20.8938 13.926 20.832 14.004 20.754C14.082 20.676 14.1438
                                            20.5834 14.1861 20.4815C14.2283 20.3795 14.25 20.2703 14.25 20.16V15.09C14.25 14.8672 14.3385 14.6536 14.496 14.496C14.6536
                                            14.3385 14.8672 14.25 15.09 14.25H20.16C20.3828 14.25 20.5964 14.1615 20.754 14.004C20.9115 13.8464 21 13.6328 21 13.41V10.59C21
                                            10.4797 20.9783 10.3705 20.9361 10.2685C20.8938 10.1666 20.832 10.074 20.754 9.99603C20.676 9.91803 20.5834 9.85615 20.4815
                                            9.81394C20.3795 9.77173 20.2703 9.75 20.16 9.75H15.09C14.8672 9.75 14.6536 9.6615 14.496 9.50397C14.3385 9.34644 14.25 9.13278
                                            14.25 8.91V3.84C14.25 3.61722 14.1615 3.40356 14.004 3.24603C13.8464 3.0885 13.6328 3 13.41 3H10.59C10.3672 3 10.1536 3.0885
                                            9.99603 3.24603C9.8385 3.40356 9.75 3.61722 9.75 3.84V8.91C9.75 9.13278 9.6615 9.34644 9.50397 9.50397C9.34644 9.6615 9.13278
                                            9.75 8.91 9.75H3.84C3.61722 9.75 3.40356 9.8385 3.24603 9.99603C3.0885 10.1536 3 10.3672 3 10.59V13.41C3 13.6328 3.0885
                                            13.8464 3.24603 14.004C3.40356 14.1615 3.61722 14.25 3.84 14.25Z" fill="currentColor"></path></svg>
                                        </span>
                                        Mobile (IOS + Android)</li>
                                </ul>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <a href="" className='lp-signup-button-pricing'>SignUp</a>
                                    <br/>
                                </div>
                                <p style={{ textAlign: 'center'}}>
                                    <span className='lp-cars2Footer'>
                                    *Additional Employee $10/month <br/>  ** Additional options Extra $.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="lp-pricing-card">
                            <p  className="">
                                <b>AARP and Veteran Discount</b> We offer eligible AARP and Veterans discount of 10% at SignUp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Pricing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);

// export default Pricing;