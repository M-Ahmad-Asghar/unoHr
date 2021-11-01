import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../LandingPage/index";
import employeeLogin from "../containers/employee/LogIn/index";
import employeerLogin from "../containers/employeer/LogIn/index";
import MainWrapper from "../containers/App/MainWrapper";
function Navigation() {
  return (
    <MainWrapper>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/employee/login" component={employeeLogin} />
        <Route exact path="/employer/login" component={employeerLogin} />

        {/* <Route exact path="/employee/login">
        <LogIn />
      </Route> */}
        {/* <Route exact path="/">
        <employeeLogin />
      </Route> */}
      </Router>
    </MainWrapper>
  );
}

export default Navigation;
