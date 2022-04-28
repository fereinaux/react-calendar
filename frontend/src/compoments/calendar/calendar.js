import React from 'react';
import "./calendar.css";
import WeekDays from './days/weekDays';
import Buttons from './buttons/buttons';

function Calendar() { 
  return (
    <React.Fragment>
      <Buttons/>
      <WeekDays/>
    </React.Fragment>
  );
}

export default Calendar;



