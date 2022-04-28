import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Trash2,
} from "react-feather";
import Reminders from '../reminder/reminders';
import "./monthDay.css";

export default function MonthDay(day, indexMonth) {
  const dispatch = useDispatch();

  const reminders = useSelector((state) => state.reminders.filter(
    (reminder) =>
      reminder.date.format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
  ));

  const { daysOfMonth } = useSelector((state) => state.calendar);

  return <React.Fragment key={`${day.weekday}${indexMonth}`}>
    {indexMonth === 0 &&
      day.date() > 1 &&
      daysOfMonth[0].weekday() > day.weekday() && (
        <li className="month-day not-month"></li>
      )}
    <li
      className={`month-day add ${[0, 6].includes(day.weekday()) && "weekend"}`}
      key={`month-day-${indexMonth}`}
    >
      <span className={`day-of-month`}>
        {day.format("DD")}
      </span>
      {reminders.length > 0 &&
        <React.Fragment>
          <Reminders reminders={reminders} />
          <Trash2
            color="brown"
            size={15}
            className="delete-day"
            onClick={() =>
              dispatch({
                type: "DELETEBYDAY",
                param: day,
              })
            }
          />
        </React.Fragment>
      }
    </li>
  </React.Fragment>;
}