import React, { Component ,useState,useEffect} from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
// import { getOwnTask } from "../../../redux/actions/EmployeeTaskActions";
// import { getEmployees } from "../../../redux/actions/employerActions";
// import { getTask } from "../../../redux/actions/TasksActions";

// import { getCompletedTask } from "../../../../redux/actions/TasksActions";
import {
  getEmployeStatus,
  getWeekStatus,
} from "../../../../redux/actions/attendanceAction";
import moment from "moment";
import { getTask } from "../../../../redux/actions/EmployeeTaskActions";
import SearchBar from "../../../employeer/MainTask/SearchBar";
import {useDispatch,useSelector}from 'react-redux'

function CompletedTask (props)  {
  const [active, setActive] = useState('true')
  const [DueDate, setDueDate] = useState('')
  const [loader, setLoader] = useState(true)
  const [dataLength, setDataLength] = useState(true)
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDate, setFilterDate] = useState(new Date())
      

  ///Redux Dispatch///
  const dispatch = useDispatch()

 

  //Redux UseSelector //
  const employee = useSelector(state=>state.employeeUserReducer.currentEmp)
  const currentEmp = useSelector(state=>state.employeeUserReducer.currentEmp)
  const items = useSelector(state=>state.employeeTaskReducer.AllTask)
  const user = useSelector(state=>state.employeeUserReducer.currentEmp)
  const stateloader = useSelector(state=>state.employeeTaskReducer.loader)

  useEffect(()=>{
    dispatch(getTask(user.employeruid, user.employeeid))
  },[])


  useEffect(()=>{

    if(stateloader === "false") {
      setLoader(false)
      setData(items)
    }
  },[stateloader,items])

  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.loader === "false") {
  //     this.setState({
  //       loader: false,
  //       data: nextProps.items,
  //     });
  //   }
  // };

  const  filterMessages = (query) => {
   
     setSearchQuery(query)

  };
 const  handleDate = (date) => {
   
      setFilterDate(date)
      setSearchQuery( moment(date).format("MMM/DD/YYYY"))
   
  };
  
    // const { data ,filterDate} = this.state;
    // const { t } = this.props;
    return (
      <Container>
        <Row>
          <SearchBar
            title="List of Active Tasks"
            filter={filterMessages}
            placeholder="Search by Title, Date"
            date={filterDate}
            filterDate={handleDate}
            calendar={true}
          />
        </Row>
        <Row>
          <BasicTable searchQuery={searchQuery} />
        </Row>
      </Container>
    );

}



export default translate("common")(
(CompletedTask)
);
