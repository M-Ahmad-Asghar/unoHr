export const EMPLOYEE_SIGN_UP = 'EMPLOYEE_SIGN_UP';

export function registerEmployee(data) {
  console.log('Action file! ', data);
  return {
    type: EMPLOYEE_SIGN_UP,
    payload: data,
  };
}
