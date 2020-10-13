import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { updateEmployee } from "../../../../redux/actions/profileAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { toast } from "react-toastify";

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [docid, setDocId] = React.useState("");
  const [newProps, setNewProps] = React.useState("");

  const [onChangeValue, setOnChangeValue] = React.useState("");

  React.useEffect(() => {
    // console.log("value is here", props.value);
    if (
      props.title &&
      props.type &&
      props.value &&
      props.newProps &&
      props.docid
    ) {
      setTitle(props.title);
      setType(props.type);
      setOnChangeValue(props.value.trim());
      setNewProps(props.newProps);
      setDocId(props.docid);
    }
  }, [props.title, props.type, props.value, props.newProps, props.docid]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = () => {
    if (onChangeValue === "") {
      toast.error("field can't be empty!");
    } else {
      let data = {
        docid: docid,
        name: newProps,
        value: onChangeValue,
      };
      props.updateEmployee(data, handleClose);
    }
  };

  return (
    <div>
      <FontAwesomeIcon
        icon="pen"
        color="#70bbfd"
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent style={{ height: props.newProps === "cell" && 300 }}>
          {props.newProps === "cell" ? (
            <>
              <DialogTitle id="form-dialog-title">Cell</DialogTitle>
              <PhoneInput
                country={"us"}
                value={onChangeValue}
                onChange={(phone) => setOnChangeValue("+" + phone)}
              />
            </>
          ) : (
            <TextField
              style={{ width: 400 }}
              autoFocus
              value={onChangeValue}
              margin="dense"
              onChange={(e) => setOnChangeValue(e.target.value)}
              label={title}
              type={type}
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={updateProfile}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(
  null,
  { updateEmployee }
)(FormDialog);
