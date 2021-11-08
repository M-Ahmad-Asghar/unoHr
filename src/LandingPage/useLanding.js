import React from "react";

function UseLanding() {
  const [selectApp, setSelectApp] = React.useState(null);

  const EmployerApp = () => {
    setSelectApp("employerApp");
  };

  const EmployeeApp = () => {
    setSelectApp("employeeApp");
  };
  return { EmployerApp, EmployeeApp, selectApp, setSelectApp };
}

export default UseLanding;
