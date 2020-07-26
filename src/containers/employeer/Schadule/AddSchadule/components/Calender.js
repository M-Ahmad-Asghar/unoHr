import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Label, Input, InputGroup, InputGroupAddon, Button, ButtonToolbar, Modal, ModalBody, ModalFooter } from "reactstrap";
import { withRouter } from "react-router-dom";
import { SketchPicker } from 'react-color';
import './styles.css';

import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  addShift, getShifts
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
      events: [],
      loader: false,
      modal: false,
      color: '',
      shiftName: '',

      startTime: '',
      endTime: '',
      sm: 'AM',
      em: 'AM'
    };
  }

  componentDidMount() {
    this.props.getShifts(this.props.user.uid);
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  onChangeScroll(slotInfo) {
    let start = new Date(slotInfo.start);
    let end = new Date(slotInfo.end);
    let data = {
      start: start,
      end: end
    };
    let events = this.state.events;
    let isDuplicate = false;

    events.map(e => {
      if (moment(e.start).format('dddd') === moment(data.start).format('dddd')) {
        isDuplicate = true;
      }
    })

    if (isDuplicate) {
      events = events.map(e => {
        if (moment(e.start).format('dddd') === moment(data.start).format('dddd')) {
          return data;
        } else {
          return e;
        }
      })
    } else {
      events.push(data);
    }

    this.setState({
      events
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        loader: false
      });
  }

  handleStartTimeChange = (event) => {
    this.setState({
      startTime: event.target.value
    })
  }

  handleEndTimeChange = (event) => {
    this.setState({
      endTime: event.target.value
    })
  }

  resetShift = () => {
    this.setState({
      events: []
    })
  }

  handleNameChabge = (event) => {
    this.setState({
      shiftName: event.target.value
    })
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  onSMChange = () => {
    
    this.setState(prevSt => {
      if(prevSt.sm === "AM") {
        return {
          sm: "PM"
        }
      } else if(prevSt.sm === "PM") {
        return {
          sm: "AM"
        }
      }
    })
  }

  onEMChange = () => {
    
    this.setState(prevSt => {
      if(prevSt.em === "AM") {
        return {
          em: "PM"
        }
      } else if(prevSt.em === "PM") {
        return {
          em: "AM"
        }
      }
    })
  }

  onSetDefaultHandler = () => {
    let { startTime, endTime, sm, em } = this.state;
    if( startTime.match(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/) && endTime.match(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)) {
      toast.success(startTime + sm + ' - ' + endTime + em);
      this.compatibleShift(startTime, endTime, sm, em);
    } else {
      toast.error('Incorrect Time Format!')
    }
  }

  compatibleShift = (sTime, eTime, sm, em) => {
    let fStartDate = '';
    let fEndDate = '';
    let newDate = new Date().toString();
    var nDate = newDate.substring(0, 16);
    
    let si = sTime.indexOf(':');
    let ei = eTime.indexOf(":");
    if(si === 1) {
      sTime = "0" + sTime;
    }
    if(ei === 1) {
      eTime = '0' + eTime;
    }

    if(sm === "AM") {
      sTime = sTime + ":00";
      fStartDate = nDate + sTime + newDate.slice(23);
    } else if(sm === "PM") {
      sTime = Number(sTime.slice(0, 2)) + 12;
      sTime = sTime + ":00";
      fStartDate = nDate + sTime + newDate.slice(21);
    }

    if(em === "AM") {
      eTime = eTime + ":00";
      fEndDate = nDate + eTime + newDate.slice(23);
    } else if(em === "PM") {
      let e = Number(eTime.slice(0, 2)) + 12;
      eTime = e + eTime.slice(2);
      fEndDate = nDate + eTime + newDate.slice(21);
    }

    let arr = [];
      
    let sDate = new Date(fStartDate.slice(0, 24));
    let eDate = new Date(fEndDate.slice(0, 24));
    let sDays = this.getdaysOfWeek(sDate);
    let eDays = this.getdaysOfWeek(eDate);

    for(let i=0; i<7; i++) {
      let data = {
        start: sDays[i],
        end: eDays[i]
      }
      arr.push(data);
    }

    this.setState({events: arr});
  }

  getdaysOfWeek = (current) => {
    var week = new Array();
    current.setDate((current.getDate() - current.getDay() ));
    for (var i = 0; i < 7; i++) {
      week.push(
        new Date(current)
      );
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  addNewShift = () => {
    if (this.state.events.length > 0) {
      if(this.state.shiftName == "" || this.state.color == "") {
        toast.error("Shift name and color are required!");
      } else {
        this.setState({
          loader: true
        });
        
        let events = this.state.events;
        events = events.map(e => {
          return {
            start: e.start.toString(),
            end: e.end.toString()
          }
        })

        let shift = {
          employeruid: this.props.user.uid,
          shifts: events,
          color: this.state.color,
          name: this.state.shiftName
        };
        let shifts = [];
        shifts = this.props.allShifts;
        if(shifts.length > 0) {
          let shi = [];
          shi = shifts.filter(sh => sh.name === shift.name);
          if(shi.length > 0){
            toast.error("Shift with same name already exists!");
            this.setState({
              loader: false
            })
          }
          else
            this.props.addShift(shift);  
        } else {
          this.props.addShift(shift);
        }
          
      }
    } else {
      toast.error("Please select a time for the shift");
    }
  };

  render() {
    const { events, loader } = this.state;
    return (
      <div className="app-calendar app-cul-calendar animated slideInUpTiny animation-duration-3">

        <Label for="shiftName">Name</Label>
        <Input id="shiftName" value={this.state.shiftName} onChange={this.handleNameChabge} placeholder="Enter Shift Name"  />
        <Label for="shiftColor" style={{marginTop: '20px'}}>Color</Label>
        <Input id="shiftColor" value={this.state.color} placeholder="Choose Shift Color" onClick={() => this.setState({ modal: true })} style={{backgroundColor: this.state.color, color: 'white'}} />
        <Label for="startTime" style={{marginTop: '20px'}}>Default Start Time</Label>
        <InputGroup className="group">
          <Input placeholder="Enter Start Time e.g. 01:30" value={this.state.startTime} onChange={this.handleStartTimeChange} />
          <InputGroupAddon addonType="append" onClick={this.onSMChange} className='SAM AMPM'>{this.state.sm}</InputGroupAddon>
        </InputGroup>
        <Label for="endTime" style={{marginTop: '20px'}}>Default End Time</Label>
        <InputGroup className="group">
          <Input placeholder="Enter End Time e.g. 01:30" value={this.state.endTime} onChange={this.handleEndTimeChange} />
          <InputGroupAddon addonType="append"onClick={this.onEMChange}  className='EAM AMPM'>{this.state.em}</InputGroupAddon>
        </InputGroup>
        <Button color="success" onClick={this.onSetDefaultHandler} style={{marginTop: 15}}>Set Default Time</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modal">
          <ModalBody className='modalBody'>
            <SketchPicker 
              className="colorPicker"
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
          </ModalBody>
          <ModalFooter className="modalFooter">
            <Button close className="closeButton" onClick={() => this.setState({modal: false})}/>
          </ModalFooter>
        </Modal>

        <h3 className="callout" style={{marginTop: '20px'}}>
          Drag the mouse over calendar to set the shedule time for a day.
        </h3>
        <BigCalendar
          selectable
          formats={formats}
          events={events}
          localizer={localizer}
          defaultView="week"
          views={["week"]}
          toolbar={false}
          showMultiDayTimes={true}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectSlot={slotInfo => this.onChangeScroll(slotInfo)}
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
              <Button color="success" onClick={this.resetShift}>
                Reset
            </Button>
            )}

          {loader ? (
            <Button color="success" disabled>
              <PulseLoader color={"#123abc"} size={12} />
            </Button>
          ) : (
              <Button color="success" onClick={this.addNewShift}>
                Create Shift
            </Button>
            )}
        </ButtonToolbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shiftAddStatus: state.shiftReducer.shiftAddStatus,
  loader: state.shiftReducer.loader,
  user: state.userReducer.user,
  allShifts: state.shiftReducer.allShifts
});

export default withRouter(
  connect(
    mapStateToProps,
    { addShift, getShifts }
  )(Selectable)
);
