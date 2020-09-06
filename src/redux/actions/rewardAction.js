export const sendGiftReward = (data) => {
  return (dispatch) => {
    db.collection("rewards")
      .add(data)
      .then((res) => {
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
