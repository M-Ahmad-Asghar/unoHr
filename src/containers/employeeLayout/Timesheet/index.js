import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PunchTime from "./punchTime";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

function TimeSheet() {
  const [loading, setLoading] = useState(true);
  const [currentWeekStatus, setCurrentWeekStatus] = useState(false);
  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employeeUserReducer.currentEmp);
  const currentEmp = useSelector(
    (state) => state.employeeUserReducer.currentEmp
  );
  const done = useSelector((state) => state.attendanceReducer.done);
  const submitStatus = useSelector(
    (state) => state.attendanceReducer.submitStatus
  );
  const employeeDay = useSelector(
    (state) => state.attendanceReducer.employeeDay
  );
  const employeeCheckIn = useSelector(
    (state) => state.attendanceReducer.employeeCheckIn
  );
  const empOldWeekStatus = useSelector(
    (state) => state.attendanceReducer.empOldWeekStatus
  );
  const status = useSelector((state) => state.attendanceReducer.status);
  const weekStatus = useSelector((state) => state.attendanceReducer.weekStatus);

  useEffect(() => {
    if (weekStatus !== undefined) {
      let today = new Date();
      let startDate = today;
      let stopDate = today;

      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
      startDate = moment(startDate).format("MM/DD/YYYY");

      stopDate.setDate(stopDate.getDate() + ((0 + 7 - stopDate.getDay()) % 7));
      stopDate = moment(stopDate).format("MM/DD/YYYY");
      let checkingDate = moment(weekStatus.submitDate).format("MM/DD/YYYY");

      let result = checkingDate >= startDate && checkingDate <= stopDate;
      setLoading(false);
      setCurrentWeekStatus(result);
    }
  }, [weekStatus]);

  useEffect(() => {
    if (weekStatus !== undefined) {
      let today = new Date();
      let startDate = today;
      let stopDate = today;

      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
      startDate = moment(startDate).format("MM/DD/YYYY");

      stopDate.setDate(stopDate.getDate() + ((0 + 7 - stopDate.getDay()) % 7));
      stopDate = moment(stopDate).format("MM/DD/YYYY");

      let checkingDate = moment(weekStatus.submitDate).format("MM/DD/YYYY");

      let result = checkingDate >= startDate && checkingDate <= stopDate;
      setLoading(false);
      setCurrentWeekStatus(result);
    } else {
      setLoading(false);
      setCurrentWeekStatus(false);
    }
  }, [weekStatus]);

  return (
    <div>
      {loading ? (
        <div className="load">
          <div className="load__icon-wrap">
            <svg className="load__icon">
              <path
                fill="#3f51b5"
                d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
              />
            </svg>
          </div>
        </div>
      ) : currentWeekStatus ? (
        <Paper style={{ padding: 30 }} align="center" elevation={5}>
          <Typography component="p">
            You have been submitted attendence for this week!
          </Typography>
        </Paper>
      ) : (
        <PunchTime />
      )}
    </div>
  );
}

export default TimeSheet;
