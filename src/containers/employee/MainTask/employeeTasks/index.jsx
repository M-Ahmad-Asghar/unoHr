import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
// import { getOwnTask } from "../../../redux/actions/EmployeeTaskActions";
import { getEmployees } from "../../../../redux/actions/employerActions";
import { getTask } from "../../../../redux/actions/TasksActions";
import { useDispatch, useSelector } from "react-redux";

function EmployeeTask() {
  const [active, setActive] = useState("true");
  const [DueDate, setDueDate] = useState("");
  const [loader, setLoader] = useState(true);
  const [dataLength, setDataLength] = useState(true);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const items = useSelector((state) => state.TaskReducer.AllTask);
  const user = useSelector((state) => state.userReducer.user);
  const stateLoader = useSelector((state) => state.TaskReducer.loader);

  useEffect(() => {
    dispatch(getTask(user.uid));
  }, []);

  useEffect(() => {
    if (stateLoader === "false") {
      setLoader(false);
      setData(items);
    }
  }, [items, StateLoader]);

  const { t } = this.props;
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t("Paper Work")}</h3>
        </Col>
      </Row>
      <Row>
        <h1>Paper Work Page </h1>
      </Row>
    </Container>
  );
}

export default translate("common")(EmployeeTask);
