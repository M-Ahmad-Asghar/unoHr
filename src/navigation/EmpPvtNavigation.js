import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import EmployeerWrapper from "./employerWrapper";
function EmpPvtNavigation({ children, auth, ...rest }) {
  return (
    <EmployeerWrapper>
      <Route
        {...rest}
        render={() => (auth ? children : <Redirect to={"/"} />)}
      />
    </EmployeerWrapper>
  );
}

export default EmpPvtNavigation;
