const dataPass = (data) => {
  return (dispatch) => {
    dispatch({
      type: "DATA_PASS",
      payload: data,
    });
  };
};
export default dataPass;
