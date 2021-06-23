import { db } from "../services/firebase";

export const watchTask = (callback, collection) => {
  const unsub = db.collection(collection).onSnapshot((snapshot) => {
    const docs = [];
    snapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    callback(docs);
  });
  return unsub;
};

export const postTask = async (collection, values) => {
  return await db.collection(`${collection}`).doc().set(values);
};

export const putTask = async (id, collection, values) => {
  return await db.collection(`${collection}`).doc(id).update(values);
};

export const deleteTask = async (id, collection) => {
  await db.collection(collection).doc(id).delete();
  return true;
};
