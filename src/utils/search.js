import { db } from "../boot/firebase";
export const searchDistrict = (string) => {
  return new Promise((resolve, rejects) => {
    db.collection("districts")
      .where("county", ">=", string)
      .where("county", "<=", string + "\uf8ff")
      .limit(20)
      .get()
      .then((doc) => {
        resolve(doc);
      })
      .catch(rejects);
  });
};
