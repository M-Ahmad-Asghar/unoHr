import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
// import HorizontalForm from "./AddForm";
// import OwnTasks from "../../taskView";
// import EmployeeTasks from '../../taskView/employeeTask'

function DefaultTabsBorderedTop({ t }) {
  const propTypes = {
    t: PropTypes.func.isRequired,
  };

  const [activeTab, setActiveTab] = useState("2");

  const toggle = (tab) => {
    if (ctiveTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Col xs={12} md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <div className="tabs tabs--bordered-top">
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Add Task
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    List of Own Task
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    List of Employee Task
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">{/* <HorizontalForm /> */}</TabPane>
                <TabPane tabId="2">{/* <OwnTasks /> */}</TabPane>
                {/* <TabPane tabId="3">
                    <EmployeeTasks />
                  </TabPane> */}
              </TabContent>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default translate("common")(DefaultTabsBorderedTop);
