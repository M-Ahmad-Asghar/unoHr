/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonToolbar,
  Container,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import { BeatLoader, PulseLoader } from "react-spinners";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { changeAddress } from "../../../../redux/actions/userActions";
import MapApi from '../../../../mapApi';
import { toast } from "react-toastify";
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "80%"
  }
});

function ProfileSettings ({handleSubmit})  {
  const history = useHistory()
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const [loader, setLoader] = useState(false)
  const [docid, setDocid] = useState('')


  const user = useSelector(state=>state.userReducer.user)
  const adressStatus = useSelector(state=>state.userReducer.adressStatus)
  const stateLoader = useSelector(state=>state.userReducer.loader)


  useEffect(()=>{

    setAddress(user.address)
    setDocid(user.docid)
  },[])

useEffect(()=>{

  if (adressStatus === "done") {
    setLoader(false)

    toast.success("Successfully Change the Address");
     history.push("/home/employeer/profile");
  } else if (adressStatus === "error") {
    setLoader(false)

    toast.error("Error!");
  }

},[adressStatus])



  const handleChange = name => event => {
    console.log(name)
   // this.setState({ [name]: event.target.value });
 };


 const getAddress = address => {
   setAddress(address)

  };

 const  changeUserAddress = e => {
    e.preventDefault();
    setLoader(true)

    let newAddress = {
     address,
      docid
    };
  dispatch(changeAddress(newAddress))
  };

    
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <div className="card__title">
                  <h5 className="bold-text">Change Address</h5>
                </div>
                <form className="form form--horizontal" onSubmit={handleSubmit}>
                  {/* <div className="form__form-group">
                    <span className="form__form-group-label">Address</span>
                    <div className="form__form-group-field">
                      <TextField
                        defaultValue={user.address}
                        className={classes.textField}
                        onChange={this.handleChange("address")}
                        margin="normal"
                      />
                    </div>
                  </div> */}

                  <div className="form__form-group">
                    <span className="form__form-group-label">Address</span>
                    <div className="form__form-group-field">
                      <div style={{width: '100%'}}>
                        <MapApi getAddress={getAddress} />
                      </div>
                    </div>
                  </div>

                  {/* <div className="form__form-group">
                    <span className="form__form-group-label">City</span>
                    <div className="form__form-group-field">
                      <TextField
                        defaultValue={user.city}
                        className={classes.textField}
                        onChange={this.handleChange("city")}
                        margin="normal"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">State</span>
                    <div className="form__form-group-field">
                      <TextField
                        defaultValue={user.state}
                        className={classes.textField}
                        onChange={this.handleChange("state")}
                        margin="normal"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Country</span>
                    <div className="form__form-group-field">
                      <TextField
                        defaultValue={user.country}
                        className={classes.textField}
                        onChange={this.handleChange("country")}
                        margin="normal"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Zip</span>
                    <div className="form__form-group-field">
                      <TextField
                        defaultValue={user.zip}
                        className={classes.textField}
                        onChange={this.handleChange("zip")}
                        margin="normal"
                      />
                    </div>
                  </div> */}

                  <ButtonToolbar className="form__button-toolbar">
                    {loader ? (
                      <Button color="primary">
                        <BeatLoader color={"#123abc"} size={12} />
                      </Button>
                    ) : (
                      <Button color="primary" onClick={changeUserAddress}>
                        Submit
                      </Button>
                    )}
                  </ButtonToolbar>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  
}




export default (withStyles(styles)(ProfileSettings));
