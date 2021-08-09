import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";

import { Link } from "react-router-dom";

import { putTaskDate } from "../services/firestoreTask";

import handleDate from "../hooks/useHandleDate";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);

const Task = (props) => {
  const { user } = useContext(AuthContext);
  const { tasks, toggleTask, isCompleted, showTaskIncompleted } = props;
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [taskId, setTaskId] = useState();
  const RefDate = useRef(null);

  const openDatePicker = (date, task) => {
    date.stopPropagation();
    setTaskId(task.id);
    RefDate.current.setOpen(true);
  };

  const handleChangeDate = (e) => {
    setDatePickerValue(e);
    putTaskDate(taskId, "task", user.id, e);
  };

  return (
    <div className="align-left-column-box">
      <DatePicker
        selected={datePickerValue}
        onChange={handleChangeDate}
        isClearable
        ref={RefDate}
        shouldCloseOnSelect={false}
        locale="es"
        withPortal
      />
      {tasks?.map((task) => (
        <article
          key={task.id}
          className={`w-1 align-center-box  p-1 shadow-effect ${
            showTaskIncompleted ? "--hide" : ""
          }`}
        >
          {isCompleted ? (
            <span className="material-icons icon --blue_500 pr-1">done</span>
          ) : (
            <span
              className="material-icons icon --gray_500 pr-1"
              onClick={() =>
                toggleTask(task.id, "taskCompleted", task, user.id)
              }
            >
              radio_button_unchecked
            </span>
          )}
          <div className="w-1">
            <Link
              className="align-left-column-box"
              to={{
                pathname: `/edit/${task.id}`,
                data: task,
                state: { isCompleted: isCompleted },
              }}
            >
              <p className={` ${isCompleted && "--text-decoration"} `}>
                {task.task}
              </p>
              {task.details && (
                <small className={` ${isCompleted && "--gray_200"} `}>
                  {task.details}
                </small>
              )}
            </Link>
            {isCompleted ||
              (task.date && (
                <div className="align-left-box">
                  <button
                    className={`date-text mt-0_3 small ${
                      handleDate(task.date)[1] === "dateToday"
                        ? "--blue_500"
                        : handleDate(task.date)[1] === "dateBefore"
                        ? "--red_500 "
                        : "--gray_text"
                    }`}
                    onClick={(date) => openDatePicker(date, task)}
                  >
                    {handleDate(task.date)[0]}
                  </button>
                </div>
              ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Task;
