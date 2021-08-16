import { fbFirestore, db } from "../services/firebase";

const refUser = db.collection("users");

export const watcherTask = (callback, collection, userId) => {
  const unsub = refUser
    .doc(userId)
    .collection(collection)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      callback(docs);
    });
  return unsub;
};

export const postTask = async (collection, values, userId, date = null) => {
  if (date === null || values.hasOwnProperty("date")) {
    return await refUser
      .doc(userId)
      .collection(`${collection}`)
      .doc()
      .set({
        createdAt: fbFirestore.FieldValue.serverTimestamp(),
        ...values,
      });
  }

  return await refUser.doc(userId).collection(`${collection}`).doc().set({
    createdAt: fbFirestore.FieldValue.serverTimestamp(),
    task: values.task,
    details: values.details,
    date: date,
  });
};

export const putTaskDate = async (id, collection, userId, date) => {
  return await refUser.doc(userId).collection(`${collection}`).doc(id).update({
    date: date,
  });
};

export const putTask = async (id, collection, values, userId, date = null) => {
  if (date === null) {
    return await refUser
      .doc(userId)
      .collection(`${collection}`)
      .doc(id)
      .update({
        createdAt: fbFirestore.FieldValue.serverTimestamp(),
        ...values,
      });
  }
  return await refUser.doc(userId).collection(`${collection}`).doc(id).update({
    createdAt: fbFirestore.FieldValue.serverTimestamp(),
    task: values.task,
    details: values.details,
    date: date,
  });
};

export const deleteTask = async (id, collection, userId) => {
  await refUser.doc(userId).collection(collection).doc(id).delete();
  return true;
};

export const toggleTask = (id, collection, values, userId) => {
  postTask(collection, values, userId);
  if (collection === "task") return deleteTask(id, "taskCompleted", userId);
  deleteTask(id, "task", userId);
};

export const deleteDateTask = async (id, collection, userId) => {
  return await refUser.doc(userId).collection(collection).doc(id).update({
    date: fbFirestore.FieldValue.delete(),
  });
};
