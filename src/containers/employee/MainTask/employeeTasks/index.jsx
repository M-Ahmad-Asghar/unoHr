import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
// import { getOwnTask } from "../../../redux/actions/EmployeeTaskActions";
import { getEmployees } from "../../../../redux/actions/employerActions";
import { getTask } from "../../../../redux/actions/TasksActions";

class EmployeeTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true",
      DueDate: "",
      loader: true,
      dataLength: true,
      data: []
    };
  }

  componentDidMount() {
    //   console.log('props check',this.props.user.uid);
      this.props.getTask(this.props.user.uid);
      // this.props.getEmployees(this.props.user.uid);
    // this.props.getTask("IOGtaKpP7lT56soMtZgdyrShiQq1");
    // this.props.getEmployees("IOGtaKpP7lT56soMtZgdyrShiQq1");
  }

  componentWillReceiveProps = nextProps => {
    // console.log("===========nextProps employee =========================");
    // console.log(nextProps);
    // console.log("====================================");

    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        data: nextProps.items
      });
    }
  };

  render() {
    const { data } = this.state;
    const {t } = this.props;
    return (
      <Container>
        <Row>
      <Col md={12}>
        <h3 className="page-title">{t('Paper Work')}</h3>
      </Col>
    </Row>
        <Row>
          <h1>Paper Work Page </h1>
          {/* <BasicTable Tasks={data} /> */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.TaskReducer.AllTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader
});

export default translate("common")(
  connect(
    mapStateToProps,
    {
      getTask,
      getEmployees
    }
  )(EmployeeTask)
);


