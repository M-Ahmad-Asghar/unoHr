import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

function SelectPlan() {
  const [age, setAge] = useState("");
  const [name, setName] = useState("hai");
  const [labelWidth, setLabelWidth] = useState(0);

  const handleChange = (event) => {
    if (event.target.name === "age") {
      setAge(event.target.value);
    }

    props.getPlan(event.target.value);
  };

  const { classes } = props;

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-helper">Plan</InputLabel>
        <Select
          value={age}
          onChange={handleChange}
          input={<Input name="age" id="age-helper" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"basic"}>Basic-$39</MenuItem>
          <MenuItem value={"standard"}>Standard-$99</MenuItem>
        </Select>
        {/* <FormHelperText>Some important helper text</FormHelperText> */}
      </FormControl>
    </form>
  );
}

SelectPlan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectPlan);
