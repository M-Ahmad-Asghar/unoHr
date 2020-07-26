import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import BigCalendar from "react-big-calendar";
import moment from "moment";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Card, CardBody, Col, Button, Row } from "reactstrap";

import CircularProgress from "@material-ui/core/CircularProgress";
import { getAllAssignedShifts } from '../../../../../redux/actions/shiftAction';
import { colors } from '../../../../../cities/colors';
moment.locale('en-GB');

const localizer = BigCalendar.momentLocalizer(moment);

let formats = {
    dateFormat: "DD",
}

var id = '';

const MonthEvent = ({ event }) => (
  <div>
    { event.number === 1 
    ?
      <div>
        <div>{event.empName}</div>
        <div>{event.number} Shift</div>
      </div>  
    :
      <div>
        <div>{event.empName}</div>
        <div>{event.number} Shifts</div>
      </div>  
  }
  </div>  
);

const distributeShifts = (id, title, color, ashifts) => {

  let last_date = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0);
  let last = parseInt(last_date.toString().substring(8, 10));
  let nShifts = [];
  
  
  ashifts.map( shift => {
    let sDate = shift.start;
    let eDate = shift.end;
    for(let i=1; i<= last; i++) {
      let current_date = new Date(new Date().getFullYear(), new Date().getMonth(), i);  
      if(moment(current_date).format('ddd') === sDate.substring(0, 3)) {
        var sEvent = new Date( current_date.toString().substring(0, 15) + sDate.substring(15, 24)  + current_date.toString().substring(24) );
        var eEvent = new Date( current_date.toString().substring(0, 15) + eDate.substring(15, 24)  + current_date.toString().substring(24) );
        
        let event = {
          id,
          title,
          color,
          start: sEvent,
          end: eEvent
        }
        nShifts.push(event);
      }
    }
  });
  return nShifts;
}

class AllEmployeesSchedule extends Component {
    state = {
        shifts: [],
        loader: true,
        events: [],
        employeesColors: [],
        openDialog: false,
        event: {},
        sDates: [],
        eDates: []
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

    numberShifts = (events) => {
      let finalEvents = [];
      let last_date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      let last = parseInt(last_date.toString().substring(8, 10));
      for (let i = 1; i <= last; i++) {
        let sameDay = [];
        let current_date = new Date(new Date().getFullYear(), new Date().getMonth(), i);
        events.map(e => {
          if (e.start.toString().substring(0, 15) === current_date.toString().substring(0, 15)) {
            sameDay.push(e);
          }
        })
        this.state.employeesColors.map(eColor => {
          let sameColor = [];
          sameDay.map(sDay => {
            if (eColor.color === sDay.color) {
              sDay['empName'] = eColor.name;
              sameColor.push(sDay);
            }
          })

          let len = sameColor.length;
          if (len > 0) {
            let sDates = [];
            let eDates = [];
            sameColor.map(sCol => {
              sDates.push(sCol.start)
              eDates.push(sCol.end)
            })
            let eventSame = sameColor[0];
            eventSame['number'] = len;
            eventSame['sDates'] = sDates;
            eventSame['eDates'] = eDates;
            finalEvents.push(eventSame);
          }
        })
      }
      return finalEvents;
    }

    componentDidMount() {
        this.props.getAllAssignedShifts(this.props.user.uid);
        
        let emps = this.props.employees;
        if(emps.length > 0) {
          let employeesColors = [];
          emps.map(emp => {
            employeesColors.push({
              id: emp.employeeid,
              name: emp.name,
              color: colors[Math.floor(Math.random()*64)]
            })
          })

          this.setState({
            employeesColors
          })
        }
    }

    eventClickHandler = (event) => {
      console.log("Event===> ", event);
      this.setState({
        event,
        sDates: event.sDates,
        eDates: event.eDates,
        openDialog: true
      })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getAssignedShiftStatus == "done") { 
          if(nextProps.assignedShifts.length > 0) {
            let employeesColors = this.state.employeesColors;
            let events = [];

            nextProps.assignedShifts.map( (aShift, index) => {
              let id = aShift.id;
              let title = aShift.shift.name;
              let color = '#ffffff';

              if(employeesColors.length > 0) {
                employeesColors.map(emp => {
                  if(emp.id === aShift.employeeid)
                    color = emp.color;
                })
              }

              let ashifts = aShift.shift.shifts;
              ashifts = distributeShifts(id, title, color, ashifts);
              events = events.concat(ashifts);
            })

            this.setState({
                loader: false,
                events: this.numberShifts(events)
            })
          } else {
            this.setState({
              loader: false
            })
          }  
        }
    }

    handleRequestClose = () => {
      this.setState({ openDialog: false });
    };

    render() {
        let { events, event, sDates, eDates } = this.state;
        let color = event.color;

        return (
            !this.state.loader ? 
              events.length > 0 ?
                <div style={{height: '100%', width: '100%'}}>
                  
                  <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={Slide}
                    onClose={this.handleRequestClose}
                    fullWidth
                  >
                    <DialogTitle align="center">
                      <div>Schedule</div>
                    </DialogTitle>
                    <DialogContent align="center">
                      { sDates.length > 0 ?
                          <div style={{ fontSize: 18 }}>
                            <b>Employee: </b>{event.empName}
                            <div>{moment(sDates[0]).format('dddd')}</div>
                            <div style={{ fontWeight: 'bold' }}>-----------------------</div>
                            { sDates.map((sD, i) => (
                              <div style={{ margin: 10, fontSize: 16 }}>
                                <b>Start: </b>{moment(sD).format('hh:mm:ss A')} 
                                <br />
                                <b>End: </b>{'   ' + moment(eDates[i]).format('hh:mm:ss A')}
                                <div style={{ fontWeight: 'bold' }}>-----------------------</div>
                              </div>
                            )) }
                          </div>
                        :
                          <h5 style={{ color: 'red' }}>No shift found!</h5>
                      }
                    </DialogContent>
                    <DialogActions align="center">
                        <Button
                          onClick={this.handleRequestClose}
                          variant="contained"
                          style={{ margin: "auto" }}
                          color="primary"
                        >
                          Close
                        </Button>
                    </DialogActions>
                  </Dialog>

                  <div style={{marginBottom: 15}}>
              
                    { this.state.employeesColors.length > 0 ?
                      <div>
                        {this.state.employeesColors.map(emp => (
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{alignSelf: 'center', height: 12, width: 12, backgroundColor: emp.color, marginRight: 5}}></div>
                            <b style={{textAlign: 'center'}}>{emp.name + '  '}</b>
                          </div>
                        ))}
                      </div>
                    :
                      '' }
                  </div>
                  <div style={{height: 900, width: '100%'}}>
                      <BigCalendar
                          selectable
                          popup={true}
                          timeslots={4}
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
                          onSelectEvent={(event) => this.eventClickHandler(event)}
                          components={{
                            event: MonthEvent,
                          }}
                          eventPropGetter={(this.eventStyleGetter)}
                      />
                  </div>
                </div>
                :
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <h3>No schedule found for this Employee!</h3>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
                  <CircularProgress style={{alignSelf: 'center',}} />
                </div>
        )
    }
};


const mapStateToProps = state => ({
    user: state.userReducer.user,
    employees: state.employerReducer.employees,
    loader: state.shiftReducer.loader,
    getAssignedShiftStatus: state.shiftReducer.getAllAssignedShiftStatus,
    assignedShifts: state.shiftReducer.allAssignedShifts
  });

export default connect(mapStateToProps, {
    getAllAssignedShifts,
})(AllEmployeesSchedule);