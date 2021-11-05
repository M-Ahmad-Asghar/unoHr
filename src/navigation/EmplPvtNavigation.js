import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import EmployeeWrapper from "./employeeWrapper";
function EmplPvtNavigation({ children, auth, ...rest }) {
  return (
    <EmployeeWrapper>
      <Route
        {...rest}
        render={() => (auth ? children : <Redirect to={"/"} />)}
      />
    </EmployeeWrapper>
  );
}

export default EmplPvtNavigation;
