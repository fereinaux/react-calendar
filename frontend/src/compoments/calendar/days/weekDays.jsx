import React from 'react';
import { useSelector } from 'react-redux';
import WeekDay from './weekDay';
import './weekDays.css';

export default function WeekDays() {
  const { daysOfWeek } = useSelector((state) => state.calendar);
  return (
    <ul className="week-days">
      {daysOfWeek.map((day, index) => <WeekDay key={`week-day${day}`} index={index} day={day} />)}
    </ul>
  );
}
