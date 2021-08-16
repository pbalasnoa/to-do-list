import "../styles/animation.css";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";

import { Link } from "react-router-dom";

import { putTaskDate, toggleTask } from "../api/services/firestoreTask";

import handleDate from "../api/handleDate";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);

const Task = (props) => {
  const { user } = useContext(AuthContext);
  const { tasks, isCompleted, showTaskIncompleted } = props;
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [taskId, setTaskId] = useState();
  const [data, setData] = useState();
  const [activateAnimation, setActivateAnimation] = useState();
  const RefDate = useRef(null);
  const RefTask = useRef([]);

  const openDatePicker = (date, task) => {
    date.stopPropagation();
    setTaskId(task.id);
    RefDate.current.setOpen(true);
  };

  const handleChangeDate = (e) => {
    setDatePickerValue(e);
    putTaskDate(taskId, "task", user.id, e);
  };

  useEffect(() => {
    if (activateAnimation) {
      RefTask.current[activateAnimation].classList.add("fadeInAnimation");
    } else if (activateAnimation === 0) {
      RefTask.current[0].classList.add("fadeInAnimation");
    }
  }, [activateAnimation]);

  useEffect(() => {
    if (data && data.length > 0)
      toggleTask(data[0].id, data[1], data[0], user.id);
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
      {tasks?.map((task, index) => (
        <article
          ref={(el) => (RefTask.current[index] = el)}
          key={task.id}
          className={`w-1 align-center-box  p-1 shadow-effect ${
            showTaskIncompleted ? "--hide" : ""
          } `}
          onAnimationEnd={() =>
            isCompleted
              ? setData([task, "task"])
              : setData([task, "taskCompleted"])
          }
        >
          {isCompleted ? (
            <input
              type="checkbox"
              className="mr-1 radio-button-unchecked done"
              onTransitionEnd={() => setActivateAnimation(index)}
            />
          ) : (
            <input
              type="checkbox"
              className="mr-1 radio-button-unchecked"
              onTransitionEnd={() => setActivateAnimation(index)}
            />
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
