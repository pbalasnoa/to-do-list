import "../styles/animation.css";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";

import { Link } from "react-router-dom";

import { putTaskDate, putTaskState } from "../api/services/firestoreTask";

import handleDate from "../api/handleDate";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);

const Task = (props) => {
  const { user } = useContext(AuthContext);
  const { tasks, showTaskIncompleted } = props;
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [taskId, setTaskId] = useState();
  const [data, setData] = useState();
  const RefDate = useRef(null);

  const openDatePicker = (date, task) => {
    date.stopPropagation();
    setTaskId(task.id);
    RefDate.current.setOpen(true);
  };

  const handleChangeDate = (e) => {
    setDatePickerValue(e);
    putTaskDate(taskId, user.id, e);
  };

  useEffect(() => {
    if (data) putTaskState(data.id, user.id, !data.isCompleted);
  }, [data]);

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
          } `}
        >
          <input
            type="checkbox"
            className={`mr-1 radio-button-unchecked ${
              task.isCompleted && "done"
            }`}
            onTransitionEnd={() => setData(task)}
          />

          <div className="w-1">
            <Link
              className="align-left-column-box"
              to={{
                pathname: `/edit/${task.id}`,
                data: task,
              }}
            >
              <p className={` ${task.isCompleted && "--text-decoration"} `}>
                {task.task}
              </p>
              {task.details && (
                <small className={` ${task.isCompleted && "--gray_200"} `}>
                  {task.details}
                </small>
              )}
            </Link>
            {task.isCompleted ||
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
