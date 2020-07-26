import React, { Component } from "react";
import { Typography, Grid, TextField, Button, Checkbox } from "@material-ui/core";
import { getTemplateSchema, employeeForm } from '../../../../redux/actions/NewSystemDocuments';
import { connect } from "react-redux";
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
    console.log("One Item", item)
    this.props.getTemplateSchema(item.template_id)
  }

  submitHandler = () => {
    this.setState({ loading: true });

    let { data } = this.state;
    let item = this.props.location.state.item;
    let id = item.fbDocId;

    let isGoodToGo = true;
    let formData = {};
    data.map((item, i) => {
      if(item[Object.keys(item)[1]] && item[Object.keys(item)[0]] === '' ) {
        isGoodToGo = false;
        toast.warn(`${Object.keys(item)[0].charAt(0).toUpperCase() + Object.keys(item)[0].substring(1)} is required!`)
      } 

      if(item['type'] === "boolean"){
        if(item[Object.keys(item)[0]] === true) {
          formData[Object.keys(item)[0]] = true;
        } else {
          formData[Object.keys(item)[0]] = false;
        }
      } else {
        formData[Object.keys(item)[0]] = item[Object.keys(item)[0]]; 
      }
    })

    if(isGoodToGo) {
      let documents = this.props.allEmployeeDocs;
      let docIndex = item.docIndex;
      documents[docIndex].phaseStatus = 'employer';
      documents[docIndex].employeeFormData = formData
     
      let finalObj = {
        paperworkId: id,
        documents,
        docIndex,
        employee: this.props.user
      }
      
      this.props.employeeForm(finalObj);

    } else {
      this.setState({ loading: false });
    }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.templateStatus === 'done') {
      let schema = nextProps.templateSchema;
      
      if(schema.properties) {
        let data = [];
        let item = this.props.location.state.item;
        Object.keys(schema.properties).map((key, index) => {
          if(key.substring(0, 2) != 'ep') {
            if(item.map_keys[key]) {
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
      this.props.history.push('/home/employee/paperWork');
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

  render() {
    const { loading, data } = this.state;
    console.log("Data", data)

    return (
      loading ? 
      <div style={{ width: 100, marginLeft: 'auto', marginRight: 'auto' }}>
        <BeatLoader color={"#123abc"} />
      </div>
      :
        (
          <Typography align="left" component="div" style={{ padding: 8 * 3 }}>
            <Typography align="center" variant="h5">
              Please fill the form to generate documents.
            </Typography>

              <Grid container>
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
                  );
                })}

                {data.map((item, index) => {
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

              </Grid>

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
          </Typography>
        )
      );
  }
}

const mapStateToProps = state => {
  return {
    user: state.employeeUserReducer.currentEmp,
    loader: state.paperWorkReducer.loader,
    templateSchema: state.SystemDocuments.templateSchema,
    templateStatus: state.SystemDocuments.templateSchemaStatus,
    sLoader: state.SystemDocuments.schema_loader,
    savePapeworkStatus: state.SystemDocuments.saveEmployeePaperworks,
    allEmployeeDocs: state.paperWorkReducer.allEmployeeDocs
  };
};

export default connect(
  mapStateToProps,
  { getTemplateSchema, employeeForm }
)(PaperworkForms);
