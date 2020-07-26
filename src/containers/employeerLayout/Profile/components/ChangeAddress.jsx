/* eslint-disable react/no-children-prop */
import React, { Component } from "react";
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
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "80%"
  }
});

class ProfileSettings extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      address: "",
      // street: "",
      // city: "",
      // state: "",
      // country: "",
      // zip: "",
      // docid: "",
      loader: false
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    let user = this.props.user;
    this.setState({
      address: user.address,
      docid: user.docid
      // street: user.street,
      // city: user.city,
      // state: user.state,
      // country: user.country,
      // zip: user.zip
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("=========nextProps===========================");
    console.log(nextProps.adressStatus);
    console.log("====================================");
    if (nextProps.adressStatus === "done") {
      this.setState({
        loader: false
      });
      toast.success("Successfully Change the Address");
      this.props.history.push("/home/employeer/profile");
    } else if (nextProps.adressStatus === "error") {
      this.setState({
        loader: false
      });
      toast.error("Error!");
    }
  }

  getAddress = address => {
    this.setState({
      address
    });
  };

  changeAddress = e => {
    e.preventDefault();
    this.setState({
      loader: true
    });
    let newAddress = {
      address: this.state.address,
      docid: this.state.docid
    };
    this.props.changeAddress(newAddress);
  };

  render() {
    const { handleSubmit, reset, classes, user } = this.props;
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
                        <MapApi getAddress={this.getAddress} />
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
                    {this.state.loader ? (
                      <Button color="primary">
                        <BeatLoader color={"#123abc"} size={12} />
                      </Button>
                    ) : (
                      <Button color="primary" onClick={this.changeAddress}>
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
}
ProfileSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  adressStatus: state.userReducer.adressStatus,
  loader: state.userReducer.loader
});

export default connect(
  mapStateToProps,
  { changeAddress }
)(withStyles(styles)(ProfileSettings));
