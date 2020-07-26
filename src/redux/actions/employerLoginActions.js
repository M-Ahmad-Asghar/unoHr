export const EMPLOYER_LOGIN = 'EMPLOYER_LOGIN';

export function checkEmployerLogin(data) {
  console.log('Action file! ', data);
  return {
    type: EMPLOYER_LOGIN,
    payload: data,
  };
}
