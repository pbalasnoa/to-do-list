import { createContext, useState, useEffect } from "react";

import { watcherTask } from "../api/services/firestoreTask";
import { watcherUser } from "../api/services/auth";

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
          user.id,
          false
        );
        watcherTask(
          (taskCompleted) => {
            setDataTaskCompleted(taskCompleted);
          },
          user.id,
          true
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
