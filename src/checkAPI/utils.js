import axios from "axios";
import { checkApi, checkApiUrl } from "./config";

export const getPayStubs = async (empId, payrollId) => {
  var config = {
    method: "get",
    url: `${checkApiUrl}employees/${empId}/paystubs/${payrollId}`,
    headers: {
      Authorization: `Bearer ${checkApi}`,
    },
  };

  const res = axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
export const getPayStubsPDF = async (empId) => {
  var config = {
    method: "get",
    url: `${checkApiUrl}employees/${empId}/paystubs`,
    headers: {
      Accept: "application/pdf",
      Authorization: `Bearer ${checkApi}`,
    },
  };

  const res = axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
