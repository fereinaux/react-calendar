import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Trash2,
} from 'react-feather';
import Reminders from '../reminder/reminders';
import './day.css';

export default function Day({ day, indexMonth }) {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.filter(
    (reminder) => reminder.date.format('YYYY-MM-DD') === day.format('YYYY-MM-DD'),
  ));

  const { daysOfMonth } = useSelector((state) => state.calendar);

  return (
    <div
      className={
            `month-day add 
            ${indexMonth === 0
            && day.date() > 1
            && daysOfMonth[0].weekday() > day.weekday()
            && 'not-month'} 
            ${[0, 6].includes(day.weekday())
            && 'weekend'}`
          }
      key={`month-day-${indexMonth}`}
    >
      <span className="day-of-month">
        {day.format('DD')}
      </span>
      {reminders.length > 0
          && (
            <>
              <Reminders reminders={reminders} />
              <Trash2
                color="brown"
                size={15}
                className="delete-day"
                onClick={() => dispatch({
                  type: 'DELETEBYDAY',
                  param: day,
                })}
              />
            </>
          )}
    </div>
  );
}
