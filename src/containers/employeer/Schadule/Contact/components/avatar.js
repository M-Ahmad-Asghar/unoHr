import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    height:"5rem",
    width:"5rem",
    fontSize:"0.9rem",
    backgroundColor: "#3f51b5",
    textAlign:"center"
  },
};

function LetterAvatars(props) {
  const { classes,name } = props;
  return (
    // <Grid container justify="center" alignItems="center">
      <Avatar className={classes.purpleAvatar}>{name}</Avatar>
    // </Grid>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);