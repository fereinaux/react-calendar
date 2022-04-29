import React from 'react';
import './calendar.css';
import WeekDays from './days/weekDays';
import Buttons from './buttons/buttons';

function Calendar() {
  return (
    <>
      <Buttons />
      <WeekDays />
    </>
  );
}

export default Calendar;
