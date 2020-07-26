// import { AsyncStorage } from "react-native";

export const GETAPP = "GETAPP";
export const GETAPPERR = "GETAPPERR";


export function getStartAppFromStorage() {

    return async (dispatch) => {
        try {
            const value = await localStorage.getItem('currentApp');
            
              if (value !== null) {
                dispatch({
                  type:GETAPP,
                  payload:value
              }
              
              );
            }
            else{
                dispatch({
                    type:GETAPP,
                    payload:'nill'
                })
            }
           } catch (error) {
           
             console.log('err',error);
             dispatch({
                type:GETAPPERR
            });
             // Error retrieving data
           }
}
}