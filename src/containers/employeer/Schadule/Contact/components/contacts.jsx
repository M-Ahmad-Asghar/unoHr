import React from "react";
import { Col } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { employeeContacts } from "../../../../../redux/actions/schaduleAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import { connect } from "react-redux";
import Inbox from "./inbox";
import Bar from "./bar";

library.add(faDollarSign);

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 680,
    paddingBottom: "0px",
    borderRight: "0px",
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    margin: "0px 8px",
    width: "100%"
  },
  menu: {
    width: "100%"
  },
  headerClass: {
    fontSize: "1.8rem"
  },
  delButton: {
    color: "#ffffff",
    padding: "6px 20px",
    marginTop: "opx",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "400",
    cursor: "pointer"
  },
  title_desc: {
    // fontWeight: "400",
    fontWeight: "bold",
    width: "80px",
    color: "#646777",
    maxHeight: "32px",
    lineHeight: "1px",
    margin: "0 0",
    paddingTop: "0px",
    paddingBottom: "0px"
  },
  listItem: {
    lineHeight: "1rem",
    paddingBottom: "6px",
    paddingTop: "0px"
  },
  message: {
    border: "1px solid gray",
    minHeight: "50px",
    padding: "5px",
    paddingLeft: "10px",
    borderRadius: "5px",
    maxHeight: "120px",
    textOverflow: "auto",
    overflow: "auto"
  }
});

class SettingMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      contactsArr: [],
      name: "",
      email: "",
      date: ""
    };
  }

  componentDidMount() {
    this.props.employeeContacts(this.props.user.uid);
  }
  componentWillReceiveProps(nextProps) {


    this.setState({
      contactsArr: nextProps.empContacts,
      loading: false
    });
    if (nextProps.getContactStatus == "done") {
    } else if (nextProps.getContactStatus == "error") {
      this.setState({
        loading: false
      });
    }
  }

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };
  onNameChange = evt => {
    this.setState({
      name: evt.target.value
    });
  };

  onEmailChange = evt => {
    this.setState({
      email: evt.target.value
    });
  };
  onDateChange = evt => {
    this.setState({
      date: evt.target.value
    });
  };
  searchingForMessages = searchName => {
    return function(customer) {
      return (
        customer.employeeName
          .toLowerCase()
          .includes(searchName.toLowerCase()) ||
        customer.title.toLowerCase().includes(searchName.toLowerCase()) ||
        moment(customer.PostedTime)
          .format("hh:mm A MM/DD/YYYY")
          .toLowerCase()
          .includes(searchName.toLowerCase()) ||
        !searchName
      );
    };
  };

  // searchingForEmail = searchEmail => {
  //   return function(customer) {
  //     return (
  //       customer.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
  //       !searchEmail
  //     );
  //   };
  // };
  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  searchingForDate = searchDate => {
    return function(customer) {
      return (
        moment(customer.PostedTime)
          .format("hh:mm A MM/DD/YYYY")
          .includes(searchDate) || !searchDate
      );
    };
  };

  filterMessages = query => {
    this.setState({
      name: query
    });
  };

  render() {
    return this.state.loading ? (
      <Col md="12" lg="12" xl="12" style={{ textAlign: "center" }}>
        <CircularProgress />
      </Col>
    ) : (
      <React.Fragment>
        <Bar filter={this.filterMessages} />
        <Inbox
          messages={this.state.contactsArr
            .filter(this.searchingForMessages(this.state.name))
            .filter(this.searchingForDate(this.state.date))}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    empContacts: state.shaduleReducer.employeeContacts,
    getContactStatus: state.shaduleReducer.getContactStatus,
    loader: state.shaduleReducer.loader,
    user: state.userReducer.user
  };
}

export default connect(
  mapStateToProps,
  { employeeContacts }
)(withStyles(styles)(SettingMain));
