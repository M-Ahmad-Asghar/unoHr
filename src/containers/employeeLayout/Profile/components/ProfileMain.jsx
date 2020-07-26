import React from "react";
import { Card, CardBody, Col, Button, Row } from "reactstrap";
import MessageTextOutlineIcon from "mdi-react/MessageTextOutlineIcon";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen} from '@fortawesome/free-solid-svg-icons'


library.add(faPen)

class ProfileMain extends React.Component {
  render() {
    const { user, tasks, ownTasks } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <div className="profile__information">
              <div style={{ width: "100%" }}>
                <p className="profile__activity-name">Name: </p>
                <p className="profile__name">{user.name}</p>
                <p className="profile__activity-name">Email: </p>
                <p className="profile__contact">{user.email}</p>
                <p className="profile__activity-name">Cell: </p>
                <p className="profile__contact">{user.cell}</p>
                <p className="profile__activity-name">Address: </p>
                <Row>
                  <Col md={6} lg={6} xl={6}>
                    <p>
                      {
                        user.address
                      }
                    </p>
                  </Col>
                  <Col md={6} lg={6} xl={6}>
                    <Link to="/home/employee/changeaddress" style={{ textDecoration: "none" }}>
                      <FontAwesomeIcon icon="pen" />
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="profile__stats">
              <div className="profile__stat">
                <p className="profile__stat-number">{tasks.length}</p>
                <p className="profile__stat-title">Active Tasks</p>
              </div>
              {/* <div className="profile__stat">
                <p className="profile__stat-number">0</p>
                <p className="profile__stat-title">Paper Work Tasks</p>
              </div> */}
              <div className="profile__stat">
                <p className="profile__stat-number">{ownTasks.length}</p>
                <p className="profile__stat-title">Active Own Task</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
const mapStateToProps = state => ({
  // user: state.userReducer.user,
  user: state.employeeUserReducer.currentEmp,
  // employees: state.employerReducer.employees,
  tasks: state.employeeTaskReducer.AllTask,
  ownTasks: state.employeeTaskReducer.empOwnTask
});

export default connect(
  mapStateToProps,
  null
)(ProfileMain);
