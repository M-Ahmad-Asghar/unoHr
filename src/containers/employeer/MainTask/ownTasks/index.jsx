import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import { getOwnTask } from "../../../../redux/actions/TasksActions";
import SearchBar from "../SearchBar";
import moment from "moment";

class OwnTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      data: [],
      searchQuery: "",
      filterDate: new Date(),
    };
  }

  filterMessages = (query) => {
    this.setState({
      searchQuery: query,
    });
  };
  handleDate = (date) => {
    this.setState({
      filterDate: date,
      searchQuery: moment(date).format("MMM/DD/YYYY"),
    });
  };
  render() {
    const { data, filterDate } = this.state;
    const { t } = this.props;
    console.log(data);
    return (
      <Container>
        <Row>
          <SearchBar
            title="List of Own Tasks"
            filter={this.filterMessages}
            placeholder="Search by Name, Title, Date"
            date={filterDate}
            filterDate={this.handleDate}
            calendar={true}
          />
        </Row>
        <Row>
          <BasicTable searchQuery={this.state.searchQuery} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.TaskReducer.OwnTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader,
});

export default translate("common")(
  connect(mapStateToProps, { getOwnTask })(OwnTask)
);
