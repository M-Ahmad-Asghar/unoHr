import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "../LandingPage/index";
import MainWrapper from "../containers/App/MainWrapper";
import EmpPvtNavigation from "./EmpPvtNavigation";
import EmplPvtNavigation from "./EmplPvtNavigation";

import { getStartAppFromStorage } from "../redux/actions/storageAction";
import { startGetCurrentUser } from "../redux/actions/userActions";
import { startGetCurrentUserEmployee } from "../redux/actions/employeeUserActions";

// ===============================================Employer's Imports start=====================================================

import Dashboard from "../containers/employeer/Dashboard/index";
import EmployeerLogin from "../containers/employeer/LogIn/index";
import { connect } from "react-redux";
import EmployeerLayout from "../containers/employeerLayout/index";
import employeerLogin from "../containers/employeer/LogIn/index";
import employeerSignUp from "../containers/employeer/signup/index";
import ChangeAddress from "../containers/employeerLayout/Profile/components/ChangeAddress";
import AddTask from "../containers/employeer/MainTask/addTasks";
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
import PaperWork from "../containers/employeer/Paperwork";
import PaperwrokForms from "../containers/employeer/Paperwork/PaperwrokForms";
import PdfRecords from "../containers/employeer/PdfRecords";
import DailyTask from "../containers/employeer/MainTask/dailyTask";
import RewardEmployee from "../containers/employeer/rewardEmployee";
import ReportingScreen from "../containers/employeer/reporting";
import ContactSupport from "../containers/employeer/contactSupport";
import MyTickets from "../containers/employeer/contactSupport/myTickets";

// ===============================================Employer's Imports end=====================================================
// -----------------------------------------------------
// ===============================================Employee's Imports start=====================================================
import EmployeeLayout from "../containers/employeeLayout";
import employeeLogin from "../containers/employee/LogIn/index";
import employeeSignUp from "../containers/employee/signup/index";
import EmpladdTask from "../containers/employee/MainTask/addTasks";
import EmplownTask from "../containers/employee/MainTask/ownTasks";
import EmplpaperWork from "../containers/employee/MainTask/paperWork";
import EmplpaperworkForms from "../containers/employee/MainTask/paperWork/PaperworkForms";
import EmplactiveTask from "../containers/employee/MainTask/activeTasks";
import EmplGettingUser from "../containers/employee/GetUser";
import EmplTimeSheet from "../containers/employeeLayout/Timesheet";
import EmplEmployeeProfile from "../containers/employeeLayout/Profile";
import EmplChangeAddress from "../containers/employeeLayout/Profile/components/ChangeAddress";
import EmplNotFound404 from "../containers/DefaultPage/404/index";
import EmplreviewTimeLine from "../containers/employeeLayout/reviewSubmitTime";
import EmplPayStub from "../containers/employeeLayout/PayStubs";
import EmplDirectDepositAccount from "../containers/employeeLayout/DirectDepositAccount";
import EmplTransactionHistory from "../containers/employeeLayout/TransactionHistory";
import EmplSettings from "../containers/employeeLayout/Settings";
import EmplBackup from "../containers/employeeLayout/Backup";
import EmplForgetPassword from "../containers/employee/ForgetPassword";
import EmplViewSchedule from "../containers/employee/Schadule/ViewSchadule";
import EmplEditSchedule from "../containers/employee/Schadule/ViewSchadule/components/EditSchedule";
import EmplContactEmployer from "../containers/employee/Schadule/contactToEmployer";
import EmplTermsAndConditions from "../shared/components/termsAndCondition";
import EmplPrivacyPolicy from "../shared/components/privacyPolicy";
import EmplDashboard from "../containers/employeeLayout/Dashboard";

function Navigation(props) {
  useEffect(() => {
    props.getStartAppFromStorage();
    props.startGetCurrentUser();
    props.startGetCurrentUserEmployee();
  }, []);

  return (
    <MainWrapper>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <EmplPvtNavigation exact path="/employee/login" auth={true}>
            <employeeLogin />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/employee/signup" auth={true}>
            <employeeSignUp />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/dashboard" auth={true}>
            <EmplDashboard />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/activeTask" auth={true}>
            <EmplactiveTask />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/paperWork" auth={true}>
            <EmplpaperWork />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/paperworkForms"
            auth={true}
          >
            <EmplpaperworkForms />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/ownTask" auth={true}>
            <EmplownTask />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/addTask" auth={true}>
            <EmpladdTask />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/timesheet" auth={true}>
            <EmplTimeSheet />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/profile" auth={true}>
            <EmplEmployeeProfile />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/changeaddress"
            auth={true}
          >
            <EmplChangeAddress />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/paystubs" auth={true}>
            <EmplPayStub />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/directdepositaccount"
            auth={true}
          >
            <EmplDirectDepositAccount />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/transactionhistory"
            auth={true}
          >
            <EmplTransactionHistory />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/settings" auth={true}>
            <EmplSettings />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/settings" auth={true}>
            <EmplSettings />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/reviewtimeline"
            auth={true}
          >
            <EmplreviewTimeLine />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/termsandconditions"
            auth={true}
          >
            <EmplTermsAndConditions />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/privacypolicy"
            auth={true}
          >
            <EmplPrivacyPolicy />
          </EmplPvtNavigation>

          <EmplPvtNavigation exact path="/home/employee/schedule" auth={true}>
            <EmplViewSchedule />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/editschedule"
            auth={true}
          >
            <EmplEditSchedule />
          </EmplPvtNavigation>

          <EmplPvtNavigation
            exact
            path="/home/employee/contactemployer"
            auth={true}
          >
            <EmplContactEmployer />
          </EmplPvtNavigation>

          {/* =============================Employee Navigation End============================================================ */}

          {/* --------------------------------------------------- */}

          {/* =============================Employer Navigation Start========================================================== */}
          <Route path="/employeer/forgetpassword" component={ForgetPassword} />
          <Route exact path="/" component={GetUser} />
          <EmpPvtNavigation exact path="/employeer/login" auth={true}>
            <EmployeerLogin />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/employeer/signup" auth={true}>
            <employeerSignUp />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/dashboard" auth={true}>
            <Dashboard />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/addTask" auth={true}>
            <AddTask />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/ownTask" auth={true}>
            <ownTask />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/employeeTask"
            auth={true}
          >
            <employeeTask />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/dailyTask" auth={true}>
            <DailyTask />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/completeTask"
            auth={true}
          >
            <completeTask />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/profile" auth={true}>
            <EmployeerProfile />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/select" auth={true}>
            <SelectEmployee />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/settings" auth={true}>
            <Settings />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/changeaddress"
            auth={true}
          >
            <ChangeAddress />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/reward-employee"
            auth={true}
          >
            <RewardEmployee />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/employeeBackgroundCheck"
            auth={true}
          >
            <employeeBackgroundCheck />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/paperWrokForms"
            auth={true}
          >
            <PaperwrokForms />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/mytickets" auth={true}>
            <MyTickets />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/contactsupport"
            auth={true}
          >
            <ContactSupport />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/reporting" auth={true}>
            <ReportingScreen />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/employeeCreation"
            auth={true}
          >
            <employeeCreation />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/termsandconditions"
            auth={true}
          >
            <TermsAndConditions />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/privacypolicy"
            auth={true}
          >
            <PrivacyPolicy />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/employeeView"
            auth={true}
          >
            <employeeView />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/pdf" auth={true}>
            <PdfViewer />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/timesheet" auth={true}>
            <EmployeeTimeSheet />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/schadule" auth={true}>
            <SchaduleView />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/addschadule"
            auth={true}
          >
            <SchaduleAdd />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/assignschadule"
            auth={true}
          >
            <SchaduleAssign />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/editschadule"
            auth={true}
          >
            <EditSchadule />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/viewschadule"
            auth={true}
          >
            <ViewShadule />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/statecontacts"
            auth={true}
          >
            <StateContact />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/directdeposit"
            auth={true}
          >
            <DirectDeposit />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/paperWork" auth={true}>
            <PaperWork />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/pdfRecords" auth={true}>
            <PdfRecords />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/transactionhistory"
            auth={true}
          >
            <TransactionHistory />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/selectemployee"
            auth={true}
          >
            <TimeSheetSelectEmp />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/selectpayperiod"
            auth={true}
          >
            <SelectPayPeriod />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/editpayroll"
            auth={true}
          >
            <EditPayroll />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/selectempforpaystub"
            auth={true}
          >
            <SelectEmpForPayStubs />
          </EmpPvtNavigation>

          <EmpPvtNavigation
            exact
            path="/home/employeer/selectpaystub"
            auth={true}
          >
            <SelectPaySbubs />
          </EmpPvtNavigation>

          <EmpPvtNavigation exact path="/home/employeer/inbox" auth={true}>
            <Contact />
          </EmpPvtNavigation>
          <Route component={NotFound404} />
        </Switch>
      </Router>
    </MainWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.storageReducer.getapp,
    loading: state.storageReducer.loading,
    user: state.userReducer.user,
    userLoading: state.userReducer.userLoading,
    empLoading: state.employeeUserReducer.userLoading,
  };
};

export default connect(
  mapStateToProps,
  {
    getStartAppFromStorage,
    startGetCurrentUser,
    startGetCurrentUserEmployee,
  }
)(Navigation);
