export const EMPLOYER_SIGN_UP = 'EMPLOYER_SIGN_UP';

export function checkEmployerLogin(data) {
  console.log('Action sign Up file! ', data);
  return {
    type: EMPLOYER_SIGN_UP,
    payload: data,
  };
}
