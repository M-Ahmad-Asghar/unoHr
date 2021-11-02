import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MainWrapper from "../containers/App/MainWrapper";
import EmployeeLayout from "../containers/employeeLayout/index";
import employeeLogin from "../containers/employee/LogIn/index";
import employeeSignUp from "../containers/employee/signup/index";
import addTask from "../containers/employee/MainTask/addTasks";
import ownTask from "../containers/employee/MainTask/ownTasks";
import paperWork from "../containers/employee/MainTask/paperWork";
import paperworkForms from "../containers/employee/MainTask/paperWork/PaperworkForms";
import activeTask from "../containers/employee/MainTask/activeTasks";
import GettingUser from "../containers/employee/GetUser";
import TimeSheet from "../containers/employeeLayout/Timesheet";
import EmployeeProfile from "../containers/employeeLayout/Profile";
import ChangeAddress from "../containers/employeeLayout/Profile/components/ChangeAddress";
import NotFound404 from "../containers/DefaultPage/404/index";
import reviewTimeLine from "../containers/employeeLayout/reviewSubmitTime";
import PayStub from "../containers/employeeLayout/PayStubs";
import DirectDepositAccount from "../containers/employeeLayout/DirectDepositAccount";
import TransactionHistory from "../containers/employeeLayout/TransactionHistory";
import Settings from "../containers/employeeLayout/Settings";
import Backup from "../containers/employeeLayout/Backup";
import ForgetPassword from "../containers/employee/ForgetPassword";
import ViewSchedule from "../containers/employee/Schadule/ViewSchadule";
import EditSchedule from "../containers/employee/Schadule/ViewSchadule/components/EditSchedule";
import ContactEmployer from "../containers/employee/Schadule/contactToEmployer";
import TermsAndConditions from "../shared/components/termsAndCondition";
import PrivacyPolicy from "../shared/components/privacyPolicy";
import Dashboard from "../containers/employeeLayout/Dashboard";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
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

const wrappedRoutesEmployee = () => (
  <div>
    <EmployeeLayout />
    <div className="container__wrap">
      <Route path="/home/employee/dashboard" component={Dashboard} />
      <Route path="/home/employee/activeTask" component={activeTask} />
      <Route path="/home/employee/paperWork" component={paperWork} />
      <Route path="/home/employee/paperworkForms" component={paperworkForms} />
      <Route path="/home/employee/ownTask" component={ownTask} />
      <Route path="/home/employee/addTask" component={addTask} />
      <Route path="/home/employee/timesheet" component={TimeSheet} />
      <Route path="/home/employee/profile" component={EmployeeProfile} />
      <Route path="/home/employee/changeaddress" component={ChangeAddress} />
      <Route path="/home/employee/paystubs" component={PayStub} />
      <Route
        path="/home/employee/directdepositaccount"
        component={DirectDepositAccount}
      />
      <Route
        path="/home/employee/transactionhistory"
        component={TransactionHistory}
      />
      <Route path="/home/employee/settings" component={Settings} />

      <Route path="/home/employee/reviewtimeline" component={reviewTimeLine} />
      <Route
        path="/home/employee/termsandconditions"
        component={TermsAndConditions}
      />
      <Route path="/home/employee/privacypolicy" component={PrivacyPolicy} />
      <Route path="/home/employee/schedule" component={ViewSchedule} />
      <Route path="/home/employee/editschedule" component={EditSchedule} />
      <Route
        path="/home/employee/contactemployer"
        component={ContactEmployer}
      />
    </div>
  </div>
);

class Router extends React.Component {
  render() {
    console.log("====user empployee=========");
    console.log(this.props.user);
    return (
      <MainWrapper>
        <main>
          <Switch>
            {/* <Route exact path="/" component={mainlanding} /> */}
            <Route path="/employee/login" component={employeeLogin} />

            <Route path="/employee/backup" component={Backup} />

            <Route path="/employee/forgetpassord" component={ForgetPassword} />
            <Route path="/employee/signup" component={employeeSignUp} />
            <Route path="/404" component={NotFound404} />
            <RestrictedRoute
              path="/home"
              component={wrappedRoutesEmployee}
              authUser={this.props.user}
            />
            <Route
              exact
              path="/"
              component={GettingUser}
              // authUser={this.props.user}
            />
          </Switch>
        </main>
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.employeeUserReducer.userStatusEmp,
  };
};

// export default  Router
export default connect(
  mapStateToProps,
  null
)(Router);
