import { createContext, useState, useEffect } from "react";

import { watcherTask } from "../api/services/firestoreTask";
import { watcherUser } from "../api/services/auth";

const Context = createContext({});

export function TaskContextProvider({ children }) {
  const [dataTask, setDataTask] = useState(null);
  const [dataTaskCompleted, setDataTaskCompleted] = useState([]);
  const [isSetUp, setIsSetUp] = useState(false);
  const [orderByTask, setOrderByTask] = useState({
    isOrder: false,
    orderBy: "createdAt",
  });

  useEffect(() => {
    watcherUser((user) => {
      if ((user && !isSetUp) || (user && orderByTask.isOrder)) {
        setIsSetUp(true);
        watcherTask(
          (task) => {
            setDataTask(task);
          },
          user.id,
          false,
          orderByTask.orderBy
        );
        watcherTask(
          (taskCompleted) => {
            setDataTaskCompleted(taskCompleted);
          },
          user.id,
          true,
          orderByTask.orderBy
        );
      }
    });
  }, [isSetUp, orderByTask]);

  return (
    <Context.Provider
      value={{
        dataTask,
        setDataTask,
        dataTaskCompleted,
        setDataTaskCompleted,
        orderByTask,
        setOrderByTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
