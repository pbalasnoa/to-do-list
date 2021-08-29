import { fbFirestore, db } from "../services/firebase";

const refUser = db.collection("users");

export const watcherTask = (callback, userId, isCompleted) => {
  const unsub = refUser
    .doc(userId)
    .collection("task")
    .where("isCompleted", "==", isCompleted)
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

export const postTask = async (values, userId, date = null) => {
  if (date === null || values.hasOwnProperty("date")) {
    return await refUser
      .doc(userId)
      .collection("task")
      .doc()
      .set({
        createdAt: fbFirestore.FieldValue.serverTimestamp(),
        isCompleted: false,
        ...values,
      });
  }

  return await refUser.doc(userId).collection("task").doc().set({
    createdAt: fbFirestore.FieldValue.serverTimestamp(),
    isCompleted: false,
    task: values.task,
    details: values.details,
    date: date,
  });
};

export const putTaskDate = async (id, userId, date) => {
  return await refUser.doc(userId).collection("task").doc(id).update({
    date: date,
  });
};

export const putTaskState = async (id, userId, isCompleted) => {
  return await refUser.doc(userId).collection("task").doc(id).update({
    isCompleted: isCompleted,
  });
};

export const putTask = async (id, values, userId, date = null) => {
  if (date === null) {
    return await refUser
      .doc(userId)
      .collection("task")
      .doc(id)
      .update({
        ...values,
      });
  }
  return await refUser.doc(userId).collection("task").doc(id).update({
    task: values.task,
    details: values.details,
    date: date,
  });
};

export const deleteTask = async (id, userId) => {
  await refUser.doc(userId).collection("task").doc(id).delete();
  return true;
};

export const deleteDateTask = async (id, userId) => {
  return await refUser.doc(userId).collection("task").doc(id).update({
    date: fbFirestore.FieldValue.delete(),
  });
};
