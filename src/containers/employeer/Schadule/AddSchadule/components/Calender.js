import React, { useState, useEffect } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import {
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  ButtonToolbar,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { SketchPicker } from "react-color";
import "./styles.css";

import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { addShift, getShifts } from "../../../../../redux/actions/shiftAction";
import { useDispatch, useSelector } from "react-redux";
import { useObjectState } from "../../../../../utils/commonState";
const localizer = BigCalendar.momentLocalizer(moment);

let formats = {
  dateFormat: "dd",
  dayFormat: "dddd",
};

function Selectable(props) {
  const dispatch = useDispatch();
  const [state, setState] = useObjectState({
    events: [],
    loader: false,
    modal: false,
    color: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    sm: "AM",
    em: "AM",
  });

  const shiftAddStatus = useSelector(
    (state) => state.shiftReducer.shiftAddStatus
  );
  const stateLoader = useSelector((state) => state.shiftReducer.loader);
  const user = useSelector((state) => state.userReducer.user);
  const allShifts = useSelector((state) => state.shiftReducer.allShifts);

  useEffect(() => {
    dispatch(getShifts(user.uid));
  }, []);

  const toggle = () => {
    setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  const onChangeScroll = (slotInfo) => {
    let start = new Date(slotInfo.start);
    let end = new Date(slotInfo.end);
    let data = {
      start: start,
      end: end,
    };
    let events = state.events;
    let isDuplicate = false;

    events.map((e) => {
      if (
        moment(e.start).format("dddd") === moment(data.start).format("dddd")
      ) {
        isDuplicate = true;
      }
    });

    if (isDuplicate) {
      events = events.map((e) => {
        if (
          moment(e.start).format("dddd") === moment(data.start).format("dddd")
        ) {
          return data;
        } else {
          return e;
        }
      });
    } else {
      events.push(data);
    }

    setState({
      events,
    });
  };
  useEffect(() => {
    setState({
      loader: false,
    });
  }, [stateLoader]);

  const handleStartTimeChange = (event) => {
    setState({
      startTime: event.target.value,
    });
  };

  const handleEndTimeChange = (event) => {
    setState({
      endTime: event.target.value,
    });
  };

  const resetShift = () => {
    setState({
      events: [],
    });
  };

  const handleNameChabge = (event) => {
    setState({
      shiftName: event.target.value,
    });
  };

  const handleChangeComplete = (color) => {
    setState({ color: color.hex });
  };

  const onSMChange = () => {
    setState(state.sm === "AM" ? { sm: "PM" } : { sm: "AM" });
  };

  const onEMChange = () => {
    setState(state.em === "AM" ? { em: "PM" } : { em: "AM" });
  };

  const onSetDefaultHandler = () => {
    let { startTime, endTime, sm, em } = state;
    if (
      startTime.match(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/) &&
      endTime.match(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
    ) {
      toast.success(startTime + sm + " - " + endTime + em);
      compatibleShift(startTime, endTime, sm, em);
    } else {
      toast.error("Incorrect Time Format!");
    }
  };

  const compatibleShift = (sTime, eTime, sm, em) => {
    let fStartDate = "";
    let fEndDate = "";
    let newDate = new Date().toString();
    var nDate = newDate.substring(0, 16);

    let si = sTime.indexOf(":");
    let ei = eTime.indexOf(":");
    if (si === 1) {
      sTime = "0" + sTime;
    }
    if (ei === 1) {
      eTime = "0" + eTime;
    }

    if (sm === "AM") {
      sTime = sTime + ":00";
      fStartDate = nDate + sTime + newDate.slice(23);
    } else if (sm === "PM") {
      sTime = Number(sTime.slice(0, 2)) + 12;
      sTime = sTime + ":00";
      fStartDate = nDate + sTime + newDate.slice(21);
    }

    if (em === "AM") {
      eTime = eTime + ":00";
      fEndDate = nDate + eTime + newDate.slice(23);
    } else if (em === "PM") {
      let e = Number(eTime.slice(0, 2)) + 12;
      eTime = e + eTime.slice(2);
      fEndDate = nDate + eTime + newDate.slice(21);
    }

    let arr = [];

    let sDate = new Date(fStartDate.slice(0, 24));
    let eDate = new Date(fEndDate.slice(0, 24));
    let sDays = getdaysOfWeek(sDate);
    let eDays = getdaysOfWeek(eDate);

    for (let i = 0; i < 7; i++) {
      let data = {
        start: sDays[i],
        end: eDays[i],
      };
      arr.push(data);
    }

    setState({ events: arr });
  };

  const getdaysOfWeek = (current) => {
    var week = new Array();
    current.setDate(current.getDate() - current.getDay());
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const addNewShift = () => {
    if (state.events.length > 0) {
      if (state.shiftName == "" || state.color == "") {
        toast.error("Shift name and color are required!");
      } else {
        setState({
          loader: true,
        });

        let events = state.events;
        events = events.map((e) => {
          return {
            start: e.start.toString(),
            end: e.end.toString(),
          };
        });

        let shift = {
          employeruid: user.uid,
          shifts: events,
          color: state.color,
          name: state.shiftName,
        };
        let shifts = [];
        shifts = allShifts;
        if (shifts.length > 0) {
          let shi = [];
          shi = shifts.filter((sh) => sh.name === shift.name);
          if (shi.length > 0) {
            toast.error("Shift with same name already exists!");
            setState({
              loader: false,
            });
          } else dispatch(addShift(shift));
        } else {
          dispatch(addShift(shift));
        }
      }
    } else {
      toast.error("Please select a time for the shift");
    }
  };

  return (
    <div className="app-calendar app-cul-calendar animated slideInUpTiny animation-duration-3">
      <Label for="shiftName">Name</Label>
      <Input
        id="shiftName"
        value={state.shiftName}
        onChange={handleNameChabge}
        placeholder="Enter Shift Name"
      />
      <Label for="shiftColor" style={{ marginTop: "20px" }}>
        Color
      </Label>
      <Input
        id="shiftColor"
        value={state.color}
        placeholder="Choose Shift Color"
        onClick={() => setState({ modal: true })}
        style={{ backgroundColor: state.color, color: "white" }}
      />
      <Label for="startTime" style={{ marginTop: "20px" }}>
        Default Start Time
      </Label>
      <InputGroup className="group">
        <Input
          placeholder="Enter Start Time e.g. 01:30"
          value={state.startTime}
          onChange={handleStartTimeChange}
        />
        <InputGroupAddon
          addonType="append"
          onClick={onSMChange}
          className="SAM AMPM"
        >
          {state.sm}
        </InputGroupAddon>
      </InputGroup>
      <Label for="endTime" style={{ marginTop: "20px" }}>
        Default End Time
      </Label>
      <InputGroup className="group">
        <Input
          placeholder="Enter End Time e.g. 01:30"
          value={state.endTime}
          onChange={handleEndTimeChange}
        />
        <InputGroupAddon
          addonType="append"
          onClick={onEMChange}
          className="EAM AMPM"
        >
          {state.em}
        </InputGroupAddon>
      </InputGroup>
      <Button
        color="success"
        onClick={onSetDefaultHandler}
        style={{ marginTop: 15 }}
      >
        Set Default Time
      </Button>

      <Modal
        isOpen={state.modal}
        toggle={toggle}
        className={props.className}
        id="modal"
      >
        <ModalBody className="modalBody">
          <SketchPicker
            className="colorPicker"
            color={state.color}
            onChangeComplete={handleChangeComplete}
          />
        </ModalBody>
        <ModalFooter className="modalFooter">
          <Button
            close
            className="closeButton"
            onClick={() => setState({ modal: false })}
          />
        </ModalFooter>
      </Modal>

      <h3 className="callout" style={{ marginTop: "20px" }}>
        Drag the mouse over calendar to set the shedule time for a day.
      </h3>
      <BigCalendar
        selectable
        formats={formats}
        events={state.events}
        localizer={localizer}
        defaultView="week"
        views={["week"]}
        toolbar={false}
        showMultiDayTimes={true}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectSlot={(slotInfo) => onChangeScroll(slotInfo)}
      />

      <ButtonToolbar
        className="form__button-toolbar"
        style={{
          marginTop: "20px !important",
          justifyContent: "flex-end",
          marginRight: "60px",
        }}
      >
        {state.loader ? (
          <Button color="success" disabled>
            <PulseLoader color={"#123abc"} size={12} />
          </Button>
        ) : (
          <Button color="success" onClick={resetShift}>
            Reset
          </Button>
        )}

        {state.loader ? (
          <Button color="success" disabled>
            <PulseLoader color={"#123abc"} size={12} />
          </Button>
        ) : (
          <Button color="success" onClick={addNewShift}>
            Create Shift
          </Button>
        )}
      </ButtonToolbar>
    </div>
  );
}

export default withRouter(Selectable);
