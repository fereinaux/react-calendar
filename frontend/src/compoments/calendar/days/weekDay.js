import React from 'react';
import MonthDay from './monthDay';
import { useSelector } from "react-redux";
import "./weekDay.css";

export default function WeekDay(index, day) {
  const { daysOfMonth } = useSelector((state) => state.calendar);
  return <li key={`week-day-${index}`} className="week-day">
    <h3>{day}</h3>
    {daysOfMonth && daysOfMonth.length > 0 && (
      <ul className="month-days">
        {daysOfMonth
          .filter((day) => day.weekday() === index)
          .map((day, indexMonth) => MonthDay(day, indexMonth))}
      </ul>
    )}
  </li>;
}