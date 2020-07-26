import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { withRouter } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAssignedShiftsByEmployee } from '../../../../../redux/actions/shiftAction';
moment.locale('en-GB');

const localizer = BigCalendar.momentLocalizer(moment);

let formats = {
    dateFormat: "DD",
}

var id = '';

const MonthEvent = ({ event }) => (
  <div>
    <div>{event.title}</div>
    <div style={{fontSize: '12px'}}>{moment(event.start).format('LT')}-{moment(event.end).format('LT')}</div>
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

class ViewSchadule extends Component {
    state = {
        shifts: [],
        loader: true,
        events: []
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
     
    eventClickHandler = (event) => {
      this.props.history.push({
        pathname: "/home/employeer/editschadule",
        search: this.props.id,
        state: event
      });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        loader: false
      })
        if(nextProps.getAssignedShiftStatus == "done") {  
          if(nextProps.assignedShifts.length > 0) {
            let events = [];
            nextProps.assignedShifts.map( aShift => {
              let id = aShift.id;
              let title = aShift.shift.name;
              let color = aShift.shift.color;
              let ashifts = aShift.shift.shifts;
              ashifts = distributeShifts(id, title, color, ashifts);
              events = events.concat(ashifts);
            })
            
            this.setState({
                loader: false,
                events
            })
          }  
        }
    }

    render() {
        let { events } = this.state;
        return (
            !this.state.loader ? 
              events.length > 0 ?
                <div style={{height: 700, width: '100%'}}>
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
                :
                <div style={{display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                  <h3 style={{textAlign: 'center'}}>No schedule found for this Employee!</h3>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
                  <CircularProgress style={{alignSelf: 'center',}} />
                </div>
        )
    }
};


const mapStateToProps = state => ({
    loader: state.shiftReducer.loader,
    getAssignedShiftStatus: state.shiftReducer.getAssignedShiftStatus,
    assignedShifts: state.shiftReducer.assignedShiftsEmployee
  });

export default connect(mapStateToProps, {
    getAssignedShiftsByEmployee,
})(withRouter(ViewSchadule));