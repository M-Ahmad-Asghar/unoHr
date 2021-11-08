import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MainWrapper from "../containers/App/MainWrapper";
import EmployeerLayout from "../containers/employeerLayout/index";
import employeerLogin from "../containers/employeer/LogIn/index";
import employeerSignUp from "../containers/employeer/signup/index";
import ChangeAddress from "../containers/employeerLayout/Profile/components/ChangeAddress";
import addTask from "../containers/employeer/MainTask/addTasks";
import ownTask from "../containers/employeer/MainTask/ownTasks";
import employeeTask from "../containers/employeer/MainTask/employeeTasks";
import completeTask from "../containers/employeer/MainTask/completedTasks";
import EmployeerProfile from "../containers/employeerLayout/Profile";
import employeeCreation from "../containers/employeer/employeeCreation";
import employeeView from "../containers/employeer/employeeView";
import employeeBackgroundCheck from "../containers/employeer/employeeBackgroundCheck";
import SelectEmployee from "../containers/employeerLayout/payrollTab/runPayroll/SelectEmployee";
import NotFound404 from "../containers/DefaultPage/404/index";
import EmployeeTimeSheet from "../containers/employeerLayout/payrollTab/EmployeeTimesheet";
import TimeSheetSelectEmp from "../containers/employeerLayout/payrollTab/EmployeeTimesheet/SelectEmployee";
import SelectPayPeriod from "../containers/employeerLayout/payrollTab/runPayroll/SelectPayPeriod";
import SelectEmpForPayStubs from "../containers/employeerLayout/payrollTab/PayStubs/SelectEmployee";
import SelectPaySbubs from "../containers/employeerLayout/payrollTab/PayStubs/SelectPayStubs";
import GetUser from "../containers/employeer/GetUser";
import Settings from "../containers/employeerLayout/Settings";
import ForgetPassword from "../containers/employeer/ForgetPassword";
import PdfViewer from "../containers/employeerLayout/PdfViewer";
import TermsAndConditions from "../shared/components/termsAndCondition";
import PrivacyPolicy from "../shared/components/privacyPolicy";
import SchaduleView from "../containers/employeer/Schadule/ViewSchadule";
import SchaduleAdd from "../containers/employeer/Schadule/AddSchadule";
import SchaduleAssign from "../containers/employeer/Schadule/AssignSchadule/AssignSchedule";
import EditSchadule from "../containers/employeer/Schadule/EditSchadule";
import Contact from "../containers/employeer/Schadule/Contact";
import ViewShadule from "../containers/employeer/Schadule/ViewSchadule/components/ViewSchadule";
import StateContact from "../containers/employeer/StateContact";
import DirectDeposit from "../containers/employeer/DirectDeposit";
import TransactionHistory from "../containers/employeer/TransactionHistory";
import EditPayroll from "../containers/employeerLayout/payrollTab/runPayroll/editPayroll";
import Dashboard from "../containers/employeer/Dashboard";
import PaperWork from "../containers/employeer/Paperwork";
import PaperwrokForms from "../containers/employeer/Paperwork/PaperwrokForms";
import PdfRecords from "../containers/employeer/PdfRecords";
import DailyTask from "../containers/employeer/MainTask/dailyTask";
import RewardEmployee from "../containers/employeer/rewardEmployee";
import ReportingScreen from "../containers/employeer/reporting";
import ContactSupport from "../containers/employeer/contactSupport";
import MyTickets from "../containers/employeer/contactSupport/myTickets";
import Landing from "../LandingPage/index";
import { startGetCurrentUser } from "../redux/actions/userActions";
const RestrictedRoute = ({ component: Component, authUser, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetCurrentUser());
  }, [usr]);
  const usr = useSelector((state) => state.userReducer.userLoading);
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser.uid ? (
          <Component {...props} />
        ) : usr ? (
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
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const wrappedRoutesEmployeer = () => (
  <div>
    <EmployeerLayout />
    <div className="container__wrap">
      <Route path="/home/employeer/dashboard" component={Dashboard} />
      <Route path="/home/employeer/addTask" component={addTask} />
      <Route path="/home/employeer/ownTask" component={ownTask} />
      <Route path="/home/employeer/employeeTask" component={employeeTask} />
      <Route path="/home/employeer/dailyTask" component={DailyTask} />
      <Route path="/home/employeer/completeTask" component={completeTask} />
      <Route path="/home/employeer/profile" component={EmployeerProfile} />
      <Route path="/home/employeer/select" component={SelectEmployee} />
      <Route path="/home/employeer/settings" component={Settings} />
      <Route path="/home/employeer/changeaddress" component={ChangeAddress} />
      <Route
        path="/home/employeer/reward-employee"
        component={RewardEmployee}
      />
      <Route path="/home/employeer/mytickets" component={MyTickets} />
      <Route path="/home/employeer/contactsupport" component={ContactSupport} />
      <Route path="/home/employeer/reporting" component={ReportingScreen} />
      <Route
        path="/home/employeer/employeeCreation"
        component={employeeCreation}
      />
      <Route
        path="/home/employeer/termsandconditions"
        component={TermsAndConditions}
      />
      <Route path="/home/employeer/privacypolicy" component={PrivacyPolicy} />

      <Route path="/home/employeer/employeeView" component={employeeView} />
      <Route
        path="/home/employeer/employeeBackgroundCheck"
        component={employeeBackgroundCheck}
      />
      <Route path="/home/employeer/pdf" component={PdfViewer} />
      <Route path="/home/employeer/timesheet" component={EmployeeTimeSheet} />
      <Route path="/home/employeer/schadule" component={SchaduleView} />
      <Route path="/home/employeer/addschadule" component={SchaduleAdd} />
      <Route path="/home/employeer/assignschadule" component={SchaduleAssign} />
      <Route path="/home/employeer/editschadule" component={EditSchadule} />
      <Route path="/home/employeer/viewschadule" component={ViewShadule} />
      <Route path="/home/employeer/statecontacts" component={StateContact} />
      <Route path="/home/employeer/directdeposit" component={DirectDeposit} />
      <Route path="/home/employeer/paperWork" component={PaperWork} />
      <Route path="/home/employeer/paperWrokForms" component={PaperwrokForms} />
      <Route path="/home/employeer/pdfRecords" component={PdfRecords} />

      <Route
        path="/home/employeer/transactionhistory"
        component={TransactionHistory}
      />
      {/* this place */}
      <Route
        path="/home/employeer/selectemployee"
        component={TimeSheetSelectEmp}
      />
      <Route
        path="/home/employeer/selectpayperiod"
        component={SelectPayPeriod}
      />
      <Route path="/home/employeer/editpayroll" component={EditPayroll} />
      <Route
        path="/home/employeer/selectempforpaystub"
        component={SelectEmpForPayStubs}
      />
      <Route path="/home/employeer/selectpaystub" component={SelectPaySbubs} />
      <Route path="/home/employeer/inbox" component={Contact} />
    </div>
  </div>
);

class Router extends React.Component {
  render() {
    // console.log("match", this.props.match.url);
    const { user } = this.props;
    return (
      <MainWrapper>
        <main>
          <Switch>
            {/* <Route exact path="/" component={Landing} /> */}
            <Route path="/employeer/login" component={employeerLogin} />
            <Route path="/employeer/signup" component={employeerSignUp} />
            <Route
              path="/employeer/forgetpassword"
              component={ForgetPassword}
            />
            <Route path="/404" component={NotFound404} />
            <RestrictedRoute
              path="/home"
              component={wrappedRoutesEmployeer}
              authUser={user}
            />
            <Route exact path="/" component={GetUser} />
          </Switch>
        </main>
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(Router);
