import React, { Component, Fragment } from "react";
import { Typography, Grid, TextField, Button, Checkbox } from "@material-ui/core";
import { getTemplateSchema, employerForm } from '../../../redux/actions/NewSystemDocuments';
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { BeatLoader } from "react-spinners";
import SignaturePad from 'react-signature-pad'
import './styles.css';
import { toast } from "react-toastify";

class PaperworkForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      checkedB: true
    };
  }

  componentDidMount() {
    let item = this.props.location.state.item;
    this.props.getTemplateSchema(item.template_id)
  }

  submitHandler = () => {
    this.setState({ loading: true });

    let { data, employeeData } = this.state;
    let item = this.props.location.state.item;
    let empId = this.props.location.state.empId;
    let id = this.props.location.state.id;

    let isGoodToGo = true;
    let formData = {};
    let employerFormData = {};

    employeeData.map((item, i) => {
      if(item[Object.keys(item)[1]] && item[Object.keys(item)[0]] === '' ) {
        isGoodToGo = false;
        toast.warn(`Employee ${Object.keys(item)[0].charAt(0).toUpperCase() + Object.keys(item)[0].substring(1)} is required!`)
      }

      formData[Object.keys(item)[0]] = item[Object.keys(item)[0]];
    })

    data.map((item, i) => {
      if(item[Object.keys(item)[1]] && item[Object.keys(item)[0]] === '' ) {
        isGoodToGo = false;
        toast.warn(`Employer ${Object.keys(item)[0].charAt(0).toUpperCase() + Object.keys(item)[0].substring(1)} is required!`)
      }

      employerFormData[Object.keys(item)[0]] = item[Object.keys(item)[0]];
    })
    
    if(isGoodToGo) {
      let documents = this.props.allEmployerDocs;
      let docObj = documents.filter(doc => doc.employeeid === empId);
      documents = docObj[0].allDocs;
      documents = documents.filter(d => d.id !== item.id);
      let data = {};

      Object.keys(item.map_keys).map(key => {
        Object.keys(formData).map(field => {
          if(item.map_keys[key] === field) {
            if(formData[field].length > 400) {
              data[key] = {
                base64: formData[field]
              }
            } else {
              data[key] = formData[field]
            }
          }
        })
        
        Object.keys(employerFormData).map(field => {
          if(item.map_keys[key] === field && key.substring(0, 2) === 'ep') {
            if(employerFormData[field].length > 400) {
              data[key] = {
                base64: employerFormData[field]
              }
            } 
            else {
              data[key] = employerFormData[field]
            }
          }
        })
      })
      let pdfObj = { 
        id: item.template_id,
        data
      };
      
      let finalObj = {
        formData,
        documents,
        pdfObj,
        empId,
        doc_name: item.doc_name,
        paperworkId: id,
        employerFormData,
        employer: this.props.user
      }

      this.props.employerForm(finalObj);
    } else {
      this.setState({ loading: false });
    }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.templateStatus === 'done') {
        let schema = nextProps.templateSchema; 
        
        if(schema.properties) {
          let data = [];
          let employeeData = [];
          let item = this.props.location.state.item;
          let formData = item.employeeFormData;
          
          // Setting Employee data in state 
          let type = '';
          Object.keys(formData).map((key, i) => {
            if(formData[key].length > 400) {
              type = 'object'
            } else if(typeof formData[key] === "boolean") {
              type = 'boolean'
            } else {
              type = 'string'
            }
  
            if(formData[key] === '') {
              employeeData.push({
                [key]: formData[key],
                isRequired: false,
                type
              })
            } else {
              employeeData.push({
                [key]: formData[key],
                isRequired: true,
                type
              })
            }
          })
          
          // Setting Employer data in state
          Object.keys(schema.properties).map((key, index) => {
            if(item.map_keys[key]) {
              if(key.substring(0, 2) === 'ep') {
                if(this.props.user[item.map_keys[key]]) {
                  let required = false;
                  schema.required.map((req, i) => {
                    if(req === key) {
                      required = true;
                      data.push({
                        [item.map_keys[key]]: this.props.user[item.map_keys[key]],
                        isRequired: true,
                        type: schema.properties[key]['type']
                      })
                    }
                  })
                  if(!required) {
                    data.push({
                      [item.map_keys[key]]: this.props.user[item.map_keys[key]],
                      isRequired: false,
                      type: schema.properties[key]['type']
                    })
                  }
                } else {
                  let required = false;
                  schema.required.map((req, i) => {
                      if(req === key) {
                        required = true;
                          data.push({
                            [item.map_keys[key]]: '',
                            isRequired: true,
                            isEmpty: true,
                            type: schema.properties[key]['type']
                          })
                      }
                  })
                  if(!required) {
                    data.push({
                      [item.map_keys[key]]: '',
                      isRequired: false,
                      isEmpty: true,
                      type: schema.properties[key]['type']
                    })
                  }
                }
              }
            }
          })
          this.setState({
            data,
            employeeData,
            loading: false
          })
        }
      }
  
      if(nextProps.templateSchemaStatus === 'error') {
        this.setState({
          loading: false
        })
      }
  
      if(nextProps.savePapeworkStatus === 'done') {
        this.setState({
          loading: false
        })
        this.props.history.push("/home/employeer/pdfRecords")
      }
  
      if(nextProps.savePapeworkStatus === 'error') {
        this.setState({
          loading: false
        })
      }
  }

  onChangeHandler = e => {
    let data = this.state.data;
    
    let name = e.target.name;
    let value = e.target.value;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = value
      }
    })

    this.setState({
      data
    })
  };

  checkBoxHandler = (name) => {
    let data = this.state.data;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = !data[i][name]
      }
    })

    this.setState({
      data
    })
  };

  saveSignature = (name) => {
    let url = this.refs[name].toDataURL().slice(22);

    let data = this.state.data;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = url
      }
    })

    this.setState({
      data
    })
  }

  clearSignature = (name) => {
    this.refs[name].clear();

    let data = this.state.data;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = ''
      }
    })

    this.setState({
      data
    })
  }

  hideImage = (name) => {
    let data = this.state.data;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = ''
      }
    })

    this.setState({
      data
    })
  }

  onEmpChangeHandler = e => {
    let data = this.state.employeeData;
    
    let name = e.target.name;
    let value = e.target.value;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = value
      }
    })

    this.setState({
        employeeData: data
    })
  };

  empCheckBoxHandler = (name) => {
    let data = this.state.employeeData;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = !data[i][name]
      }
    })

    this.setState({
        employeeData: data
    })
  };

  saveEmpSignature = (name) => {
    let url = this.refs[name].toDataURL().slice(22);

    let data = this.state.employeeData;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = url
      }
    })

    this.setState({
        employeeData: data
    })
  }

  clearEmpSignature = (name) => {
    this.refs[name].clear();

    let data = this.state.employeeData;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = ''
      }
    })

    this.setState({
        employeeData: data
    })
  }

  hideEmpImage = (name) => {
    let data = this.state.employeeData;
    data.map((d,i) => {
      if(Object.keys(d)[0] == name) {
        data[i][name] = ''
      }
    })

    this.setState({
        employeeData: data
    })
  }

  render() {
    const { loading, data, employeeData } = this.state;

    return (
      loading ? 
      <div style={{ width: 100, marginLeft: 'auto', marginRight: 'auto' }}>
        <BeatLoader color={"#123abc"} />
      </div>
      :
        (
          <Typography align="left" component="div" style={{ padding: 8 * 3 }}>
            
            
             {/* Employee Form Start */}
            <Typography align="center" variant="h5" style={{ marginBottom: 10 }}>
              Employee fields
            </Typography>

              <Grid container>
                {employeeData.length > 0 ?
                    <Fragment>
                    {employeeData.map((item, index) => {
                        return (                  
                            item.type === 'string' ?
                            <Grid item xs={12} md={12} key={index}>
                            <TextField
                                id="outlined-email-input"
                                label={Object.keys(item)[0]}
                                onChange={this.onEmpChangeHandler}
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
                            :
                            item.type === "boolean" ?
                            <Grid item xs={12} md={12} key={index}>
                            <Checkbox
                                checked={item[Object.keys(item)[0]]}
                                style={{ alignSelf: 'flex-start' }}
                                onChange={() => this.empCheckBoxHandler(Object.keys(item)[0])}
                                // value="checkedB"
                                color="primary"
                                inputProps={{
                                'aria-label': 'secondary checkbox',
                                }}
                            />
                            <Typography style={{ display: 'inline' }}>{' '} {Object.keys(item)[0]}</Typography>
                            </Grid>
                            : 
                            null
                        )
                })
                }

                { employeeData.map((item, index) => {
                  return (                  
                    item.type === 'object' ?
                      item[Object.keys(item)[0]] === '' ?
                        <Grid item xs={12} md={12} key={index}>
                          <div className="container">
                            <Typography variant="p" style={{ marginTop: 20 }}>{Object.keys(item)[0]}</Typography>
                            <div className="sigContainer">
                              <SignaturePad 
                                ref={Object.keys(item)[0]} 
                                style={{ height: 600, width: 800, backgroundColor: 'white' }}
                              />
                              <button className="btn btn-default button myClearButton" onClick={() => this.clearEmpSignature(Object.keys(item)[0])}>Clear</button>
                              <button className="btn btn-default button mySaveButton" onClick={() => this.saveEmpSignature(Object.keys(item)[0])}>Save</button>
                            </div>
                          </div>
                        </Grid>
                      :
                        <Grid item xs={12} md={12} key={index}>
                          <Typography variant="p" style={{ marginTop: 20, marginLeft: 15 }}>{Object.keys(item)[0]}</Typography>
                          <div className="sigContainer">
                            <img 
                              height="150px"
                              width="300px"
                              src={ `data:image/png;base64,${item[Object.keys(item)[0]]}` }
                           />
                           <button className="btn btn-default button myEditButton" onClick={() => this.hideEmpImage(Object.keys(item)[0])}>Edit</button>
                          </div>
                        </Grid>
                    :
                    null
                  )
                  })
                }
                </Fragment>
                :
                    <Typography align="center" component="p">No field found for employee!</Typography>
                }
              </Grid>
              {/*** Employee Form End */}


              {/* Employer Form Start */}
              <Divider style={{ marginTop: 15 }} />
              <Typography align="center" variant="h5" style={{ marginTop: 10 }}>
                Employer's fields
              </Typography>

              <Grid container>
                {data.length > 0 ?
                    <Fragment>
                    {data.map((item, index) => {
                        return (                  
                            item.type === 'string' ?
                            <Grid item xs={12} md={12} key={index}>
                            <TextField
                                id="outlined-email-input"
                                label={Object.keys(item)[0]}
                                onChange={this.onChangeHandler}
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
                            :
                            item.type === "boolean" ?
                            <Grid item xs={12} md={12} key={index}>
                            <Checkbox
                                checked={item[Object.keys(item)[0]]}
                                style={{ alignSelf: 'flex-start' }}
                                onChange={() => this.checkBoxHandler(Object.keys(item)[0])}
                                // value="checkedB"
                                color="primary"
                                inputProps={{
                                'aria-label': 'secondary checkbox',
                                }}
                            />
                            <Typography style={{ display: 'inline' }}>{' '} {Object.keys(item)[0]}</Typography>
                            </Grid>
                            : 
                            null
                        )
                })
                }

                { data.map((item, index) => {
                  return (                  
                    item.type === 'object' ?
                      item[Object.keys(item)[0]] === '' ?
                        <Grid item xs={12} md={12} key={index}>
                          <div className="container">
                            <Typography variant="p" style={{ marginTop: 20 }}>{Object.keys(item)[0]}</Typography>
                            <div className="sigContainer">
                              <SignaturePad 
                                ref={Object.keys(item)[0]} 
                                style={{ height: 600, width: 800, backgroundColor: 'white' }}
                              />
                              <button className="btn btn-default button myClearButton" onClick={() => this.clearSignature(Object.keys(item)[0])}>Clear</button>
                              <button className="btn btn-default button mySaveButton" onClick={() => this.saveSignature(Object.keys(item)[0])}>Save</button>
                            </div>
                          </div>
                        </Grid>
                      :
                        <Grid item xs={12} md={12} key={index}>
                          <Typography variant="p" style={{ marginTop: 20, marginLeft: 15 }}>{Object.keys(item)[0]}</Typography>
                          <div className="sigContainer">
                            <img 
                              height="150px"
                              width="300px"
                              src={ `data:image/png;base64,${item[Object.keys(item)[0]]}` }
                           />
                           <button className="btn btn-default button myEditButton" onClick={() => this.hideImage(Object.keys(item)[0])}>Edit</button>
                          </div>
                        </Grid>
                    :
                    null
                  )
                  })
                }
                </Fragment>
                :
                    <Typography align="center" component="p">No field found for employer!</Typography>
                }
              </Grid>
              {/* Employer Form End */}

            { employeeData.length > 0 || data.length > 0 ?
                <Grid item xs={12} md={12} align="right" style={{ marginTop: 15 }}>
                {loading ? (
                    <Button align="right" disabled variant="outlined" color="primary">
                    <BeatLoader color={"#123abc"} />
                    </Button>
                ) : (
                    <Button align="right" onClick={this.submitHandler} variant="outlined" color="primary">
                        Submit
                    </Button>
                )}
                </Grid>
              :
                <Grid item xs={12} md={12} align="right" style={{ marginTop: 15 }}>
                    <Button align="right" variant="outlined" disabled={true} color="primary">
                        Submit
                    </Button>
                </Grid>
            }
          </Typography>
        )
      );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    loader: state.paperWorkReducer.loader,
    templateSchema: state.SystemDocuments.templateSchema,
    templateStatus: state.SystemDocuments.templateSchemaStatus,
    sLoader: state.SystemDocuments.schema_loader,
    savePapeworkStatus: state.SystemDocuments.saveEmployerPaperworks,
    allEmployerDocs: state.paperWorkReducer.allEmployerDocs
  };
};

export default connect(
  mapStateToProps,
  { getTemplateSchema, employerForm }
)(PaperworkForms);
