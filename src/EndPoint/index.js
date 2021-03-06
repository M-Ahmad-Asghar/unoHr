const url = "https://unohr-server.herokuapp.com";
//let url = "http://localhost:5000";

export let restful_url =
  "https://us-central1-promising-saga-232017.cloudfunctions.net/restfullapi";

// "http://localhost:5001/promising-saga-232017/us-central1/clientApi";
export const client_url =
  "https://us-central1-promising-saga-232017.cloudfunctions.net/clientApi";
//  "http://localhost:5001/promising-saga-232017/us-central1/clientApi";

export const checkApi = "31ba7c4f1931eca6915bb2108993160621182f09";
export const checkApiUrl =
  // "https://cors-anywhere.herokuapp.com/https://sandbox.checkhq.com";
  "https://techloset-cors-server.herokuapp.com/https://sandbox.checkhq.com";

export const dwollaApi = {
  customer_add_funding: "/dwolla/customer_Add_FundingSource",
  customer_transaction: "/dwolla/customer_Transactions",
  customer_detail: "/dwolla/customer_Details",
  funding_source_token: "/dwolla/fundingsource_token",
  varified_personal_customer: "/dwolla/verified_Personal_Customer",
  employees_change_paymentMethod: "/dwolla/employeesChangePaymentMethod",
};

export const authApi = {
  employer_singup: "/employer/signup",
  emoloyee_singup: "/employee/signup",
  employee_invite: "/employee/invite",
};
export const payrollApi = {
  create_payPeriod: "/payroll/createPayPeriod",
  change_timeMode: "/payroll/changeTimeMode",
  generate_payStubs: "/payroll/generatePayStubs",
};

export const taskApi = {
  add_task: "/tasks/addTask",
  server_task: "/tasks/serverTask",
};

export const giftApi = {
  get_shopCard: "/gifts/getShopCards",
  send_reward: "/gifts/sendReward",
};
export const updateApi = "/apikeys/updateApi";
export const addNewReviewerApi = "/reviewer/addNewReviewer";

export default url;
