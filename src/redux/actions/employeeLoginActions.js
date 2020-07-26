export const EMPLOYEE_LOGIN = 'EMPLOYEE_LOGIN';

export function checkEmployeeLogin(data) {
  console.log('Action file! ', data);
  return {
    type: EMPLOYEE_LOGIN,
    payload: data,
  };
}
