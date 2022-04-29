import React from 'react';
import { useSelector } from 'react-redux';
import MonthDay from './monthDay';
import './weekDay.css';

export default function WeekDay({ index, day }) {
  const { daysOfMonth } = useSelector((state) => state.calendar);
  return (
    <li key={`week-day-${index}`} className="week-day">
      <h3>{day}</h3>
      {daysOfMonth && daysOfMonth.length > 0 && (
      <ul className="month-days">
        {daysOfMonth
          .filter((lDay) => lDay.weekday() === index)
          .map((lDay, indexMonth) => <MonthDay key={`month-day${lDay}`} day={lDay} indexMonth={indexMonth} />)}
      </ul>
      )}
    </li>
  );
}
