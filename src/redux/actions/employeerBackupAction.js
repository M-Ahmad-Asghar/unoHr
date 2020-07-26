import { db } from "../../boot/firebase";

export const GETEMPLOYERPAYSTUBS = "GETEMPLOYERPAYSTUBS";
export const GETEMPLOYERPAYSTUBSERR = "GETEMPLOYERPAYSTUBSERR";

export function getEmployerBackup(id) {
  return async dispatch => {
    db.collection("paystubs")
      .where("employerUid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });
          });

          console.log('================At getEmployerBackupAction====================');
          console.log("id: "+ id, ", data: "+ datatoStore);
          console.log('====================================');
           
          dispatch({
            type: GETEMPLOYERPAYSTUBS,
            payload: datatoStore
          });
        },
        function(error) {
          dispatch({
            type: GETEMPLOYERPAYSTUBSERR,
            payload: new Date()
          });
        }
      );
  };
}
