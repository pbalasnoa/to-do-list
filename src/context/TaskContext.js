import { createContext, useState, useEffect } from "react";

import { watcherTask } from "../services/firestoreTask";
import { watcherUser } from "../services/auth";

const Context = createContext({});

export function TaskContextProvider({ children }) {
  const [dataTask, setDataTask] = useState(null);
  const [dataTaskCompleted, setDataTaskCompleted] = useState([]);
  const [isSetUp, setIsSetUp] = useState(false);

  useEffect(() => {
    watcherUser((user) => {
      if (user && !isSetUp) {
        setIsSetUp(true);
        watcherTask(
          (task) => {
            setDataTask(task);
          },
          "task",
          user.id
        );
        watcherTask(
          (taskCompleted) => {
            setDataTaskCompleted(taskCompleted);
          },
          "taskCompleted",
          user.id
        );
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{ dataTask, setDataTask, dataTaskCompleted, setDataTaskCompleted }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
