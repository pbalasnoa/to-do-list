import formatDistanceToNow from "date-fns/formatDistanceToNow";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";
import es from "date-fns/locale/es";

const formatDate = (entryDate) => {
  const today = format(new Date(), "yyyy/MM/dd");
  const taskDate = format(new Date(entryDate.seconds * 1000), "yyyy/MM/dd");
  const taskDateWithFormat = format(
    new Date(entryDate.seconds * 1000),
    "eee., dd 'de' MMMM",
    { locale: es }
  );
  const compareDate = compareAsc(new Date(taskDate), new Date(today));
  const distanceToNowDate = formatDistanceToNow(
    new Date(entryDate.seconds * 1000),
    {
      addSuffix: true,
      locale: es,
    }
  );

  return {
    compareDate,
    taskDateWithFormat,
    distanceToNowDate,
  };
};

const handleDate = (entryDate) => {
  const { compareDate, taskDateWithFormat, distanceToNowDate } =
    formatDate(entryDate);

  if (compareDate === -1) return [distanceToNowDate, "dateBefore"];
  if (compareDate === 1) return [taskDateWithFormat, "dateAfter"];
  return ["Hoy", "dateToday"];
};

export default handleDate;
