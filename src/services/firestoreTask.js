import { db } from "../services/firebase";

const refUser = db.collection("users");

export const watcherTask = (callback, collection, userId) => {
  const unsub = refUser
    .doc(userId)
    .collection(collection)
    .onSnapshot((snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      callback(docs);
    });
  return unsub;
};

export const getDeepCollection = async () => {
  const data = await refUser
    .doc("k9hZoC5GeTMbi64n9UpFgIQtd0p1")
    .collection("taskUser")
    .doc("IbByNxsXGN4HHC1j8NzF")
    .get()
    .then((data) => {
      return data.data();
    })
    .catch((err) => {
      console.error(err.message);
    });
  console.log("deep", data);
};

export const postTask = async (collection, values, userId) => {
  return await refUser
    .doc(userId)
    .collection(`${collection}`)
    .doc()
    .set(values);
};

export const putTask = async (id, collection, values, userId) => {
  console.log("en putTask", values);
  // console.log("try timestamp", this.props.firebase.serverValue.TIMESTAMP);
  return await refUser.doc(userId).collection(`${collection}`).doc(id).update({
    task: values.task,
    details: values.details,
  });
  // return await refUser
  //   .doc(userId)
  //   .collection(`${collection}`)
  //   .doc(id)
  //   .update(values);
};

export const deleteTask = async (id, collection, userId) => {
  await refUser.doc(userId).collection(collection).doc(id).delete();
  return true;
};

export const hanldeTaskCompleted = (task, userId) => {
  console.log("handleTaskCompleted", task);
  postTask("taskCompleted", task, userId);
  deleteTask(task.id, "task", userId);
};

export const handleTaskincomplete = (task, userId) => {
  postTask("task", task, userId);
  deleteTask(task.id, "taskCompleted", userId);
};
