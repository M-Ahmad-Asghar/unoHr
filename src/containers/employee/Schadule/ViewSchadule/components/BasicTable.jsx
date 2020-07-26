import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  Table,
  Container,
  Row,
  Button,
  ButtonToolbar
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

const localizer = BigCalendar.momentLocalizer(moment);

var id = '';

let formats = {
    dateFormat: "DD",
}

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
      if(moment(current_date).format('ddd') === sDate.substring(0, 3) ) {
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

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true
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

  onChangeScroll(slotInfo) {
  }

  componentDidMount() {
    id = this.props.user.employeeid;
    this.props.getAssignedShiftsByEmployee(id);
  }

  eventClickHandler = (event) => {
    this.props.history.push({
      pathname: "/home/employee/editschedule",
      search: this.props.user.employeeid,
      state: event
    });
  }

  componentWillReceiveProps(nextProps) {
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
          loading: false,
          events
        })
      } else {
        this.setState({
          loading: false
        })
      }  
    }
}

  render() {
    const { loading, events } = this.state;

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
            ) : events.length > 0 ?
                  <div style={{height: '700px'}}>
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
                          onSelectEvent={(event) => this.eventClickHandler(event)}
                          components={{
                            event: MonthEvent,
                          }}
                          eventPropGetter={(this.eventStyleGetter)}
                      />
                  </div>
                  :
                  <div style={{textAlign: 'center'}}> 
                    <h3>No schedule found for this Employee!</h3>
                  </div>
                }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.employeeUserReducer.currentEmp,
  getAssignedShiftStatus: state.shiftReducer.getAssignedShiftStatus,
  loader: state.shiftReducer.loader,
  assignedShifts: state.shiftReducer.assignedShiftsEmployee
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAssignedShiftsByEmployee }
  )(translate("common")(BasicTable))
);
