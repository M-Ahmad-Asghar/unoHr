import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import mobile from './images/mobile.png';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = theme => ({
    heroContainer: {
        padding: [[32, 0, 64, 0]],
    },
    heroTitle: {
        fontSize: 40,
        color: 'rgb(37, 39, 40)',
        marginBottom: 32,
        fontFamily: 'Sen',
        fontWeight: 600,
    },
    heroText: {
        color: '#6E7477',
        fontSize: 20
    },
    heroTextContainer: {
        marginTop: 135,
        marginBottom: 135
    }
});

const Main = (props) => {
    const { classes } = props;
    return (
        <div className="lp-wrapper">
        <div className={clsx(classes.heroContainer)}>
            <Grid container spacing={8}>
                <Grid item xs={12} lg={4} className={clsx(classes.heroTextContainer, 'lp-heroTextWrap')}>
                    <div>
                        <Typography variant="h4" className={classes.heroTitle}>
                            Simplest way to manage household employees
                        </Typography>
                        <p className={classes.heroText}>
                            unoHR is a simple and easy to use household employee management application
                            that can be entirely run on smartphones and tablets.
                        </p>
                        <br/> <br/>
                        <span style={ { 'fontSize': '15px', 'color': '#6E7477' } }> On-boarding |Task Manager |  Timesheets | Payroll | Tax Filings </span>
                        <br/>
                        <br/>
                    </div>

                    <div style={ { 'marginTop': '32px' } }>
                        <img style={ {width: 148, 'marginRight': '8px' } } src="http://uno.surge.sh/static/app-store-e91688a43ed733ae3cb09644705112b7.svg" alt="apple"/>
                        <img style={ {width: 163 } } src="http://uno.surge.sh/static/google-play-ae5962682f9c55fd1d9a47392977a5c3.svg" alt="android"/>
                    </div>
                </Grid>
                <Grid item xs={12} lg={8} style={{'overflow': 'hidden'}}>
                    <img style={ {'maxWidth': '700px', 'objectFit': 'fit'} } src={mobile} alt="mobile"/>
                </Grid>
            </Grid>
        </div>
        </div>
    );
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);

// export default Main;