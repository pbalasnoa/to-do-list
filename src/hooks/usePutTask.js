import { db } from "../services/firebase";

const usePutTask = () => {
  const handlePutTask = async (id, collection, values) => {
    if (id) {
      const data = await db.collection(`${collection}`).doc(id).update(values);
      return data;
    }
    const data = await db.collection(`${collection}`).doc().set(values);
    return data;
  };

  return { handlePutTask };
};

export default usePutTask;
