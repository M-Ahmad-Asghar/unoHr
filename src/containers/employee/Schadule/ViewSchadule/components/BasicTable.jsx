import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  Table,
  Container,
  Row,
  Button,
  ButtonToolbar,
} from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BigCalendar from "react-big-calendar";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAssignedShiftsByEmployee } from "../../../../../redux/actions/shiftAction";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const localizer = BigCalendar.momentLocalizer(moment);

var id = "";

let formats = {
  dateFormat: "DD",
};

const MonthEvent = ({ event }) => (
  <div>
    <div>{event.title}</div>
    <div style={{ fontSize: "12px" }}>
      {moment(event.start).format("LT")}-{moment(event.end).format("LT")}
    </div>
  </div>
);

const distributeShifts = (id, title, color, ashifts) => {
  let last_date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  let last = parseInt(last_date.toString().substring(8, 10));
  let nShifts = [];

  ashifts.map((shift) => {
    let sDate = shift.start;
    let eDate = shift.end;
    for (let i = 1; i <= last; i++) {
      let current_date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        i
      );
      if (moment(current_date).format("ddd") === sDate.substring(0, 3)) {
        var sEvent = new Date(
          current_date.toString().substring(0, 15) +
            sDate.substring(15, 24) +
            current_date.toString().substring(24)
        );
        var eEvent = new Date(
          current_date.toString().substring(0, 15) +
            eDate.substring(15, 24) +
            current_date.toString().substring(24)
        );

        let event = {
          id,
          title,
          color,
          start: sEvent,
          end: eEvent,
        };
        nShifts.push(event);
      }
    }
  });
  return nShifts;
};

function BasicTable() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.employeeUserReducer.currentEmp)
  const getAssignedShiftStatus = useSelector(
    (state) => state.shiftReducer.getAssignedShiftStatus
  );
  const stateLoader = useSelector(
    (state) => state.employeeUserReducer.currentEmp
  );
  const assignedShifts = useSelector(
    (state) => state.shiftReducer.assignedShiftsEmployee
  );

  const eventStyleGetter = (event) => {
    var backgroundColor = event.color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "5px",
      color: "white",
      border: "0px",
      display: "block",
      padding: "-20px",
    };
    return {
      style: style,
    };
  };

  // const onChangeScroll(slotInfo) {}
  useEffect(() => {
    id = user.employeeid;
    dispatch(getAssignedShiftsByEmployee(id));
  }, []);

  const eventClickHandler = (event) => {
    history.push({
      pathname: "/home/employee/editschedule",
      search: user.employeeid,
      state: event,
    });
  };

  useEffect(() => {
    if (getAssignedShiftStatus == "done") {
      if (assignedShifts.length > 0) {
        let events = [];
        assignedShifts.map((aShift) => {
          let id = aShift.id;
          let title = aShift.shift.name;
          let color = aShift.shift.color;
          let ashifts = aShift.shift.shifts;
          ashifts = distributeShifts(id, title, color, ashifts);
          events = events.concat(ashifts);
        });
        setLoading(false);
        setEvents(events);
      } else {
        setLoading(false);
      }
    }
  }, [getAssignedShiftStatus, assignedShifts]);

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          {loading ? (
            <td colspan="6">
              <div style={{ marginTop: "35px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            </td>
          ) : events.length > 0 ? (
            <div style={{ height: "700px" }}>
              <BigCalendar
                selectable
                popup={true}
                formats={formats}
                events={events}
                localizer={localizer}
                defaultView="month"
                toolbar={false}
                startAccessor="start"
                endAccessor="end"
                showMultiDayTimes={false}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={(event) => eventClickHandler(event)}
                components={{
                  event: MonthEvent,
                }}
                eventPropGetter={eventStyleGetter}
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h3>No schedule found for this Employee!</h3>
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(translate("common")(BasicTable));
