import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const { empArray } = props;

  const handleClickOpen = () => {
    if (
      props.sendGiftTo === "" ||
      props.comment === "" ||
      props.dollars === ""
    ) {
      toast.error("please select all fields!");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendGift = () => {
    let data = {
      empName: empArray[0],
      empId: empArray[1],
      empEmail: empArray[2],
      employerUid: props.uid,
      comment: props.comment,
      stripe_customer_id: props.stripeCustomer,
      amount: props.dollars,
      transectionAt: new Date().toString(),
    };
    // console.log("==========>", data);
    props.sendGiftReward(data);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={handleClickOpen}
      >
        <VisibilityIcon />
        &nbsp; Review
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Send USD ${props.dollars} as Reward to ${empArray[0]}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This amount will be deducted from your Stripe account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ask me later
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendGift} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
