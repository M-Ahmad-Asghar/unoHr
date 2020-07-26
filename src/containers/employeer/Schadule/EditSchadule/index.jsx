import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Label, Input, Button, ButtonToolbar, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { withRouter } from "react-router-dom";
import { SketchPicker } from 'react-color';
import './styles.css';

import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  updateShifts,
  getAssignedShiftsByEmployee
} from "../../../../redux/actions/shiftAction";

const localizer = BigCalendar.momentLocalizer(moment);

let formats = {
  dateFormat: 'dd',
  dayFormat: "dddd"
}


class Selectable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shifts: [],
      events: [],
      loader: false,
      modal: false,
      color: '',
      shiftName: '',
    };
  }

  eventStyleGetter = (event) => {
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '5px',
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '-20px'
    };
    return {
        style: style
    };
  }

  componentDidMount() {
    if(this.state.events.length < 1) {
      let event = this.props.history.location.state;
      this.setState( prevSt => {
        let events = prevSt.events;
        events.push(event)
        return {
          events
        }
      })
    }
    this.props.getAssignedShiftsByEmployee(this.props.history.location.search.substring(1));
  }


  onChangeScroll(slotInfo) {
    let start = new Date(slotInfo.start);
    let end = new Date(slotInfo.end);

    this.setState( prevState => {
      let e = {
        id: prevState.events[0].id,
        title: prevState.events[0].title,
        color: prevState.events[0].color,
        start,
        end,
      }
      let events = [];
      events.push(e);

      return {
        events
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.updateAssignedShiftStatus == "done") {
      this.setState({
        loader: false
      })
      toast.success("Shift updated successfully!")
      this.props.history.push({
        pathname: "/home/employeer/schadule"
      });
    } else if(nextProps.updateAssignedShiftStatus == "error") {
      toast.error("Shift update failed!")
      this.setState({
        loader: false
      })
    }
    if(nextProps.getAssignedShiftStatus == "done") {  
      if(nextProps.assignedShifts.length > 0) {       
        this.setState({
            loader: false,
            shifts: nextProps.assignedShifts
        })
      } else {
        this.setState({
          loader: false
        })
      }  
    } else {
    this.setState({
        loader: false
      });
    }
  }

  markHoliday = () => {
    let event = this.state.events[0];

    this.setState({
      loader: true
    });
    
    let employeeid = '';
    let employerid = '';
    let id = '';
    let color = '';
    let name = '';
    let employeruid = '';
    let shiftid = '';
    let shifts = [];

    this.state.shifts.map( sh => {
      if(sh.shift.name === event.title) {
        
        employeeid = sh.employeeid;
        employerid = sh.employerid;
        id = sh.id;
        name = sh.shift.name;
        color = sh.shift.color;
        employeruid = sh.shift.employeruid;
        shiftid = sh.shift.id;

        let index = -1;
        let shifts1 = sh.shift.shifts.map( (s, i) => {
          if(s.start.substring(0, 3) === moment(event.start).format('ddd') ) {
            index = i;
            let shi = {
              start: event.start.toString(),
              end: event.end.toString()
            }
            return shi;
          } else {
            let shi = {
              start: s.start,
              end: s.end
            }
            return shi;
          }
        })

        let sss= shifts1;
        sss.splice(index,1);
        shifts = sss;
    }
  })


    let myShift = {
      employeeid,
      employerid,
      shift: {
        color,
        name,
        id: shiftid,
        employeruid,
        shifts
      }
    }
    this.props.updateShifts(id, myShift);
  }

  updateShift = () => {
    let events = this.state.events;
    if (events.length > 0) {
      this.setState({
        loader: true
      });
      
      let employeeid = '';
      let employerid = '';
      let id = '';
      let color = '';
      let name = '';
      let employeruid = '';
      let shiftid = '';
      let shifts = [];

      this.state.shifts.map( sh => {
        if(sh.shift.name === events[0].title) {
          
          employeeid = sh.employeeid;
          employerid = sh.employerid;
          id = sh.id;
          name = sh.shift.name;
          color = sh.shift.color;
          employeruid = sh.shift.employeruid;
          shiftid = sh.shift.id;

          let shifts1 = sh.shift.shifts.map( s => {
            if(s.start.substring(0, 3) === moment(events[0].start).format('ddd') ) {
              let shi = {
                start: events[0].start.toString(),
                end: events[0].end.toString()
              }
              return shi;
            } else {
              let shi = {
                start: s.start,
                end: s.end
              }
              return shi;
            }
          })
        shifts = shifts1;
      }
    })

      let myShift = {
        employeeid,
        employerid,
        shift: {
          color,
          name,
          id: shiftid,
          employeruid,
          shifts
        }
      }
      this.props.updateShifts(id, myShift);
    } else {
      toast.error("Please select time for the shift");
    }
  }

  render() {
    const { events, loader } = this.state;
    return (
      <div className="app-calendar app-cul-calendar animated slideInUpTiny animation-duration-3">

        <h3 className="callout" style={{marginTop: '20px', marginBottom: '20px'}}>
          Drag the mouse over calendar to change the shedule time.
        </h3>
        <BigCalendar
          selectable
          formats={formats}
          events={events}
          localizer={localizer}
          defaultView="day"
          views={['day']}
          toolbar={false}
          showMultiDayTimes={true}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={ this.props.history.location.state != null ? this.props.history.location.state.start : new Date() }
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={slotInfo => this.onChangeScroll(slotInfo)}
          eventPropGetter={(this.eventStyleGetter)}
        />

        <ButtonToolbar
          className="form__button-toolbar"
          style={{
            marginTop: "20px !important",
            justifyContent: "flex-end",
            marginRight: "60px"
          }}
        >
          {loader ? (
            <Button color="success" disabled>
              <PulseLoader color={"#123abc"} size={12} />
            </Button>
          ) : (
          <Button color="success" onClick={this.markHoliday}>
              Mark Holiday
          </Button>
          )}

          {loader ? (
            <Button color="success" disabled>
              <PulseLoader color={"#123abc"} size={12} />
            </Button>
          ) : (
              <Button color="success" onClick={this.updateShift}>
                Update Shift
            </Button>
            )}
        </ButtonToolbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loader: state.shiftReducer.loader,
  user: state.userReducer.user,
  getAssignedShiftStatus: state.shiftReducer.getAssignedShiftStatus,
  updateAssignedShiftStatus: state.shiftReducer.updateAssignedShiftStatus,
  assignedShifts: state.shiftReducer.assignedShiftsEmployee
});

export default withRouter(
  connect(
    mapStateToProps,
    { updateShifts, getAssignedShiftsByEmployee }
  )(Selectable)
);
