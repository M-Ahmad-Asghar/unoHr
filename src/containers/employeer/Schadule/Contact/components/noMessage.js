
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign:"center",
    fontSize:"0.7rem"
  },
});

function No_Message(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h4">
          No Record Found
        </Typography>
      </Paper>
    </div>
  );
}

No_Message.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(No_Message);