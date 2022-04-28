import React from 'react';
import WeekDay from './weekDay';
import { useSelector } from "react-redux";
import "./weekDays.css";

export default function WeekDays() {
  const { daysOfWeek } = useSelector((state) => state.calendar);
  return <ul className="week-days">
    {daysOfWeek.map((day, index) => WeekDay(index, day))}
  </ul>;
}