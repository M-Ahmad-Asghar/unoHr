import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import './styles.css';
import {
    Button,
    ButtonToolbar
  } from "reactstrap";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  updateShifts,
  getAssignedShiftsByEmployee
} from "../../../../../redux/actions/shiftAction";

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
      submitLoader: false,
      submitDisable: false,
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
    console.log("PROPS: ", nextProps);
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

  render() {
    const { events, loader } = this.state;
    return (
      <div className="app-calendar app-cul-calendar animated slideInUpTiny animation-duration-3">
 
         {/* <h3 className="callout" style={{marginTop: '20px', marginBottom: '20px'}}>
           Drag the mouse over calendar to change the shedule time.
         </h3> */}
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
          eventPropGetter={(this.eventStyleGetter)}
        />
        <ButtonToolbar
              style={{ marginRight: "15px" }}
              className="invoice__toolbar"
            >
              {this.state.submitLoader ? <CircularProgress /> : <p />}

              <Button
                color="primary"
                onClick={() =>
                  this.props.history.push("/home/employee/contactemployer")
                }
                disabled={this.state.submitDisable}
              >
                {" "}
                Contact to Employer
              </Button>
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