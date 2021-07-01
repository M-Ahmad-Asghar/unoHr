import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
} from "@material-ui/core";
import {
  getTemplateSchema,
  employerForm,
} from "../../../redux/actions/NewSystemDocuments";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { BeatLoader } from "react-spinners";
import SignaturePad from "react-signature-pad";
import "./styles.css";
import { toast } from "react-toastify";
import { useObjectState } from "../../../utils/commonState";

function PaperworkForms(props) {
  const [state, setState] = useObjectState({
    loading: true,
    checkedB: true,
  });
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const loader = useSelector((state) => state.paperWorkReducer.loader);
  const templateSchema = useSelector(
    (state) => state.SystemDocuments.templateSchema
  );
  const templateStatus = useSelector(
    (state) => state.SystemDocuments.templateSchemaStatus
  );
  const sLoader = useSelector((state) => state.SystemDocuments.schema_loader);
  const savePapeworkStatus = useSelector(
    (state) => state.SystemDocuments.saveEmployerPaperworks
  );
  const allEmployerDocs = useSelector(
    (state) => state.paperWorkReducer.allEmployerDocs
  );

  useEffect(() => {
    let item = props.location.state.item;
    dispatch(getTemplateSchema(item.template_id));
  }, []);

  const submitHandler = () => {
    setState({ loading: true });

    let { data, employeeData } = state;
    let item = props.location.state.item;
    let empId = props.location.state.empId;
    let id = props.location.state.id;

    let isGoodToGo = true;
    let formData = {};
    let employerFormData = {};

    employeeData.map((item, i) => {
      if (item[Object.keys(item)[1]] && item[Object.keys(item)[0]] === "") {
        isGoodToGo = false;
        toast.warn(
          `Employee ${Object.keys(item)[0]
            .charAt(0)
            .toUpperCase() + Object.keys(item)[0].substring(1)} is required!`
        );
      }

      formData[Object.keys(item)[0]] = item[Object.keys(item)[0]];
    });

    data.map((item, i) => {
      if (item[Object.keys(item)[1]] && item[Object.keys(item)[0]] === "") {
        isGoodToGo = false;
        toast.warn(
          `Employer ${Object.keys(item)[0]
            .charAt(0)
            .toUpperCase() + Object.keys(item)[0].substring(1)} is required!`
        );
      }

      employerFormData[Object.keys(item)[0]] = item[Object.keys(item)[0]];
    });

    if (isGoodToGo) {
      let documents = props.allEmployerDocs;
      let docObj = documents.filter((doc) => doc.employeeid === empId);
      documents = docObj[0].allDocs;
      documents = documents.filter((d) => d.id !== item.id);
      let data = {};

      Object.keys(item.map_keys).map((key) => {
        Object.keys(formData).map((field) => {
          if (item.map_keys[key] === field) {
            if (formData[field].length > 400) {
              data[key] = {
                base64: formData[field],
              };
            } else {
              data[key] = formData[field];
            }
          }
        });

        Object.keys(employerFormData).map((field) => {
          if (item.map_keys[key] === field && key.substring(0, 2) === "ep") {
            if (employerFormData[field].length > 400) {
              data[key] = {
                base64: employerFormData[field],
              };
            } else {
              data[key] = employerFormData[field];
            }
          }
        });
      });
      let pdfObj = {
        id: item.template_id,
        data,
      };

      let finalObj = {
        formData,
        documents,
        pdfObj,
        empId,
        doc_name: item.doc_name,
        paperworkId: id,
        employerFormData,
        employer: props.user,
      };

      dispatch(employerForm(finalObj));
    } else {
      setState({ loading: false });
    }
  };

  useEffect(() => {
    if (templateStatus === "done") {
      let schema = templateSchema;

      if (schema.properties) {
        let data = [];
        let employeeData = [];
        let item = props.location.state.item;
        let formData = item.employeeFormData;

        // Setting Employee data in state
        let type = "";
        Object.keys(formData).map((key, i) => {
          if (formData[key].length > 400) {
            type = "object";
          } else if (typeof formData[key] === "boolean") {
            type = "boolean";
          } else {
            type = "string";
          }

          if (formData[key] === "") {
            employeeData.push({
              [key]: formData[key],
              isRequired: false,
              type,
            });
          } else {
            employeeData.push({
              [key]: formData[key],
              isRequired: true,
              type,
            });
          }
        });

        // Setting Employer data in state
        Object.keys(schema.properties).map((key, index) => {
          if (item.map_keys[key]) {
            if (key.substring(0, 2) === "ep") {
              if (props.user[item.map_keys[key]]) {
                let required = false;
                schema.required.map((req, i) => {
                  if (req === key) {
                    required = true;
                    data.push({
                      [item.map_keys[key]]: props.user[item.map_keys[key]],
                      isRequired: true,
                      type: schema.properties[key]["type"],
                    });
                  }
                });
                if (!required) {
                  data.push({
                    [item.map_keys[key]]: props.user[item.map_keys[key]],
                    isRequired: false,
                    type: schema.properties[key]["type"],
                  });
                }
              } else {
                let required = false;
                schema.required.map((req, i) => {
                  if (req === key) {
                    required = true;
                    data.push({
                      [item.map_keys[key]]: "",
                      isRequired: true,
                      isEmpty: true,
                      type: schema.properties[key]["type"],
                    });
                  }
                });
                if (!required) {
                  data.push({
                    [item.map_keys[key]]: "",
                    isRequired: false,
                    isEmpty: true,
                    type: schema.properties[key]["type"],
                  });
                }
              }
            }
          }
        });
        setState({
          data,
          employeeData,
          loading: false,
        });
      }
    }

    if (templateSchemaStatus === "error") {
      setState({
        loading: false,
      });
    }

    if (savePapeworkStatus === "done") {
      setState({
        loading: false,
      });
      props.history.push("/home/employeer/pdfRecords");
    }

    if (savePapeworkStatus === "error") {
      setState({
        loading: false,
      });
    }
  }, [templateStatus]);

  const onChangeHandler = (e) => {
    let data = state.data;

    let name = e.target.name;
    let value = e.target.value;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = value;
      }
    });

    setState({
      data,
    });
  };

  const checkBoxHandler = (name) => {
    let data = state.data;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = !data[i][name];
      }
    });

    setState({
      data,
    });
  };

  const saveSignature = (name) => {
    let url = refs[name].toDataURL().slice(22);

    let data = state.data;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = url;
      }
    });

    setState({
      data,
    });
  };

  const clearSignature = (name) => {
    refs[name].clear();

    let data = state.data;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = "";
      }
    });

    setState({
      data,
    });
  };

  const hideImage = (name) => {
    let data = state.data;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = "";
      }
    });

    setState({
      data,
    });
  };

  onEmpChangeHandler = (e) => {
    let data = state.employeeData;

    let name = e.target.name;
    let value = e.target.value;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = value;
      }
    });

    setState({
      employeeData: data,
    });
  };

  const empCheckBoxHandler = (name) => {
    let data = state.employeeData;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = !data[i][name];
      }
    });

    setState({
      employeeData: data,
    });
  };

  const saveEmpSignature = (name) => {
    let url = refs[name].toDataURL().slice(22);

    let data = state.employeeData;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = url;
      }
    });

    setState({
      employeeData: data,
    });
  };

  const clearEmpSignature = (name) => {
    refs[name].clear();

    let data = state.employeeData;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = "";
      }
    });

    setState({
      employeeData: data,
    });
  };

  const hideEmpImage = (name) => {
    let data = state.employeeData;
    data.map((d, i) => {
      if (Object.keys(d)[0] == name) {
        data[i][name] = "";
      }
    });

    setState({
      employeeData: data,
    });
  };

  return state.loading ? (
    <div style={{ width: 100, marginLeft: "auto", marginRight: "auto" }}>
      <BeatLoader color={"#123abc"} />
    </div>
  ) : (
    <Typography align="left" component="div" style={{ padding: 8 * 3 }}>
      {/* Employee Form Start */}
      <Typography align="center" variant="h5" style={{ marginBottom: 10 }}>
        Employee fields
      </Typography>

      <Grid container>
        {employeeData.length > 0 ? (
          <Fragment>
            {employeeData.map((item, index) => {
              return item.type === "string" ? (
                <Grid item xs={12} md={12} key={index}>
                  <TextField
                    id="outlined-email-input"
                    label={Object.keys(item)[0]}
                    onChange={onEmpChangeHandler}
                    type="text"
                    value={item[Object.keys(item)[0]]}
                    name={Object.keys(item)[0]}
                    autoComplete="name"
                    margin="normal"
                    variant="outlined"
                    align="left"
                    fullWidth
                  />
                </Grid>
              ) : item.type === "boolean" ? (
                <Grid item xs={12} md={12} key={index}>
                  <Checkbox
                    checked={item[Object.keys(item)[0]]}
                    style={{ alignSelf: "flex-start" }}
                    onChange={() => empCheckBoxHandler(Object.keys(item)[0])}
                    // value="checkedB"
                    color="primary"
                    inputProps={{
                      "aria-label": "secondary checkbox",
                    }}
                  />
                  <Typography style={{ display: "inline" }}>
                    {" "}
                    {Object.keys(item)[0]}
                  </Typography>
                </Grid>
              ) : null;
            })}

            {employeeData.map((item, index) => {
              return item.type === "object" ? (
                item[Object.keys(item)[0]] === "" ? (
                  <Grid item xs={12} md={12} key={index}>
                    <div className="container">
                      <Typography variant="p" style={{ marginTop: 20 }}>
                        {Object.keys(item)[0]}
                      </Typography>
                      <div className="sigContainer">
                        <SignaturePad
                          ref={Object.keys(item)[0]}
                          style={{
                            height: 600,
                            width: 800,
                            backgroundColor: "white",
                          }}
                        />
                        <button
                          className="btn btn-default button myClearButton"
                          onClick={() =>
                            clearEmpSignature(Object.keys(item)[0])
                          }
                        >
                          Clear
                        </button>
                        <button
                          className="btn btn-default button mySaveButton"
                          onClick={() => saveEmpSignature(Object.keys(item)[0])}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12} key={index}>
                    <Typography
                      variant="p"
                      style={{ marginTop: 20, marginLeft: 15 }}
                    >
                      {Object.keys(item)[0]}
                    </Typography>
                    <div className="sigContainer">
                      <img
                        height="150px"
                        width="300px"
                        src={`data:image/png;base64,${
                          item[Object.keys(item)[0]]
                        }`}
                      />
                      <button
                        className="btn btn-default button myEditButton"
                        onClick={() => hideEmpImage(Object.keys(item)[0])}
                      >
                        Edit
                      </button>
                    </div>
                  </Grid>
                )
              ) : null;
            })}
          </Fragment>
        ) : (
          <Typography align="center" component="p">
            No field found for employee!
          </Typography>
        )}
      </Grid>
      {/*** Employee Form End */}

      {/* Employer Form Start */}
      <Divider style={{ marginTop: 15 }} />
      <Typography align="center" variant="h5" style={{ marginTop: 10 }}>
        Employer's fields
      </Typography>

      <Grid container>
        {data.length > 0 ? (
          <Fragment>
            {data.map((item, index) => {
              return item.type === "string" ? (
                <Grid item xs={12} md={12} key={index}>
                  <TextField
                    id="outlined-email-input"
                    label={Object.keys(item)[0]}
                    onChange={onChangeHandler}
                    type="text"
                    value={item[Object.keys(item)[0]]}
                    name={Object.keys(item)[0]}
                    autoComplete="name"
                    margin="normal"
                    variant="outlined"
                    align="left"
                    fullWidth
                  />
                </Grid>
              ) : item.type === "boolean" ? (
                <Grid item xs={12} md={12} key={index}>
                  <Checkbox
                    checked={item[Object.keys(item)[0]]}
                    style={{ alignSelf: "flex-start" }}
                    onChange={() => checkBoxHandler(Object.keys(item)[0])}
                    // value="checkedB"
                    color="primary"
                    inputProps={{
                      "aria-label": "secondary checkbox",
                    }}
                  />
                  <Typography style={{ display: "inline" }}>
                    {" "}
                    {Object.keys(item)[0]}
                  </Typography>
                </Grid>
              ) : null;
            })}

            {data.map((item, index) => {
              return item.type === "object" ? (
                item[Object.keys(item)[0]] === "" ? (
                  <Grid item xs={12} md={12} key={index}>
                    <div className="container">
                      <Typography variant="p" style={{ marginTop: 20 }}>
                        {Object.keys(item)[0]}
                      </Typography>
                      <div className="sigContainer">
                        <SignaturePad
                          ref={Object.keys(item)[0]}
                          style={{
                            height: 600,
                            width: 800,
                            backgroundColor: "white",
                          }}
                        />
                        <button
                          className="btn btn-default button myClearButton"
                          onClick={() => clearSignature(Object.keys(item)[0])}
                        >
                          Clear
                        </button>
                        <button
                          className="btn btn-default button mySaveButton"
                          onClick={() => saveSignature(Object.keys(item)[0])}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12} key={index}>
                    <Typography
                      variant="p"
                      style={{ marginTop: 20, marginLeft: 15 }}
                    >
                      {Object.keys(item)[0]}
                    </Typography>
                    <div className="sigContainer">
                      <img
                        height="150px"
                        width="300px"
                        src={`data:image/png;base64,${
                          item[Object.keys(item)[0]]
                        }`}
                      />
                      <button
                        className="btn btn-default button myEditButton"
                        onClick={() => hideImage(Object.keys(item)[0])}
                      >
                        Edit
                      </button>
                    </div>
                  </Grid>
                )
              ) : null;
            })}
          </Fragment>
        ) : (
          <Typography align="center" component="p">
            No field found for employer!
          </Typography>
        )}
      </Grid>
      {/* Employer Form End */}

      {employeeData.length > 0 || data.length > 0 ? (
        <Grid item xs={12} md={12} align="right" style={{ marginTop: 15 }}>
          {state.loading ? (
            <Button align="right" disabled variant="outlined" color="primary">
              <BeatLoader color={"#123abc"} />
            </Button>
          ) : (
            <Button
              align="right"
              onClick={submitHandler}
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          )}
        </Grid>
      ) : (
        <Grid item xs={12} md={12} align="right" style={{ marginTop: 15 }}>
          <Button
            align="right"
            variant="outlined"
            disabled={true}
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      )}
    </Typography>
  );
}

export default PaperworkForms;
