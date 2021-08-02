import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
export const sendGiftReward = (data) => {
  return (dispatch) => {
    db.collection("rewards")
      .add(data)
      .then((res) => {
        toast.success("Reward Sent Successfully!");
        //   dispatch({
        //     type: SEND_REWARD
        //   });
      })
      .catch((err) => {
        //   dispatch({
        //     type: SEND_REWARD_ERR
        //   });
      });
  };
};
