import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import task from './images/task.svg';
import paperless from './images/paperless.svg';
import payroll from './images/payroll.svg';
import timetrack from './images/timetrack.svg';
import tax from './images/tax.svg';
import alerts from './images/alerts.svg';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    featuresContainer: {
        paddingTop: 96,
        paddingBottom: 96,
        margin: [[0, '4%']],
    },
    featuresTitle: {
        fontSize: 30,
        fontWeight: 600,
        color: '#252728',
        marginBottom: 16
    },
    featuresImage: {
        margin: [[0, 'auto']],
    },
    imageTitle: {
        margin: [[16, 0]],
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 600,
    },
    imageText: {
        textAlign: 'center',
        color: 'rgb(110, 116, 119)',
        fontSize: 16,
        display: 'block',
        width: 320,
        margin: [[0, 'auto']]
    },
});


// const useStyles = makeStyles((theme) => ({
//     featuresContainer: {
//         paddingTop: 96,
//         paddingBottom: 96,
//         margin: [[0, '4%']],
//     },
//     featuresTitle: {
//         fontSize: 30,
//         fontFamily: 'sans-serif',
//         color: '#252728',
//         marginBottom: 16
//     },
//     featuresImage: {
//         margin: [[0, 'auto']],
//     },
//     imageTitle: {
//         margin: [[16, 0]],
//         textAlign: 'center',
//         fontSize: 24
//     },
//     imageText: {
//         textAlign: 'center',
//         color: 'rgb(110, 116, 119)',
//         fontSize: 16,
//         display: 'block',
//         width: 320,
//         margin: [[0, 'auto']]
//     },
// }));


const Features = (props) => {
    const { classes } = props;
    return (
        <div className={classes.featuresContainer}>
            <div >
                <center>
                    <h2 className={classes.featuresTitle}>Features</h2>
                </center>
            </div>
            <Grid container spacing={40} className='features'>
                <Grid item sm={12} lg={4} md={6} style={{overflow: 'hidden'}} className='feature'>
                    <img style={{ 'max-width': '256px', 'max-height': '192px'}} src={task} alt="task" className={'centered'}/>
                    <h3 className={classes.imageTitle}>Task Manager</h3>
                    <p className={classes.imageText}>Manage daily tasks to employees. Engage with employees with Tasks, SMS & email reminders to complete tasks.</p>
                </Grid>
                <Grid item sm={12} lg={4} md={6}>
                    <img style={{ 'max-width': '256px', 'max-height': '192px'}} className={'centered'} src={paperless} alt="mobile"/>
                    <h3 className={classes.imageTitle}>Paperless On-Boarding</h3>
                    <p className={classes.imageText}>Setup your account and register with the IRS and State if needed. Employee onboarding & background checks.</p>
                </Grid>
                <Grid item sm={12} lg={4} md={6}>
                    <img style={{ 'max-width': '256px', 'max-height': '192px'}} src={payroll} alt="payroll" className={'centered'}/>
                    <h3 className={classes.imageTitle}>Payroll Management</h3>
                    <p className={classes.imageText}>Generate payroll calculations & statements for employee and employer. Prepare and file monthly/quarterly taxes.</p>
                </Grid>
                <Grid item sm={12} lg={4} md={6}>
                    <img style={{ 'max-width': '256px', 'max-height': '192px'}} src={timetrack} alt="time tracking" className={'centered'}/>
                    <h3 className={classes.imageTitle}>Time Tracking</h3>
                    <p className={classes.imageText}>Track and approve employee time for payroll. Employee daily check-in and check-out, weekly review and submit for payroll.</p>
                </Grid>
                <Grid item sm={12} lg={4} md={6}>
                    <img style={{ 'max-width': '256px', 'max-height': '192px'}} src={tax} alt="tax" className={'centered'}/>
                    <h3 className={classes.imageTitle}>Tax Paperwork & Records</h3>
                    <p className={classes.imageText}>Year-end preparation and distribution of W-2, W-3 and Schedule H. Records for employees, tax and payroll are archived for easy access.</p>
                </Grid>
                <Grid item sm={12} lg={4} md={6}>
                    <img style={{ 'max-width': '256px', 'max-height': '192px'}} src={alerts} alt="alerts" className={'centered'}/>
                    <h3 className={classes.imageTitle}>Alerts & Notifications</h3>
                    <p className={classes.imageText}>Alerts and email notifications that are automatically triggered when a certain criteria is enabled by the users.</p>
                </Grid>
            </Grid>
        </div>
    );
}

Features.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Features);

// export default Features;