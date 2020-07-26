import { toast } from "react-toastify";
import axios from "axios";
export const CANCEL_SUBSCRIPTION = "CANCEL_SUBSCRIPTION";
// get
export const CHANGE_SUBSCRIPTION = "CHANGE_SUBSCRIPTION";
export const CHANGE_SUBSCRIPTION_ERR = "CHANGE_SUBSCRIPTION_ERR";

export function changeSubscriptions(data) {
  return dispatch => {
    axios
      .post(
        " https://us-central1-promising-saga-232017.cloudfunctions.net/superAdminApi/changeSubscriptions",
        data
      )
      .then(res => {
        if (res.data == "successfully Changed") {
          console.log("res", res.data);
          toast.success("Succefully changed Sucscription");

          dispatch({
            type: CHANGE_SUBSCRIPTION
          });
        } else {
          console.log("else", res.data);
          toast.error("Error occured. Please try again later");

          dispatch({
            type: CHANGE_SUBSCRIPTION_ERR
          });
        }
        //err
      })
      .catch(err => {
        //err
        console.error("err", err);
        toast.error("Error occured. Please try again later");

        dispatch({
          type: CHANGE_SUBSCRIPTION_ERR
        });
      });
  };
}
