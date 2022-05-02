import React from 'react';
import { useSelector } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import Day from './day';
import './body.css';

export default function Body() {
  const weeks = useSelector((state) => {
    const lDaysOfMonth = state.calendar.daysOfMonth;
    let week = lDaysOfMonth[0].format('w');
    let index = 0;
    const lWeeks = [];
    lWeeks[index] = [];
    for (let i = 0; i < lDaysOfMonth.length; i += 1) {
      const day = lDaysOfMonth[i];
      if (!(week === day.format('w'))) {
        if (index === 0 && lWeeks[0].length < 7) {
          const missingDays = 7 - lWeeks[0].length;
          for (let z = 0; z < missingDays; z += 1) {
            const initialDay = moment(lWeeks[0][0]);
            const dayToInsert = moment(initialDay.subtract(1, 'days').format());
            lWeeks[0].unshift(moment(dayToInsert));
          }
        }
        index += 1;
        week = day.format('w');
        lWeeks[index] = [];
      }
      lWeeks[index].push(day);
    }

    return lWeeks;
  });

  return (
    <TableBody>
      {weeks.map((week, index) => (
        <TableRow key={Math.random()}>
          {
            week.map(
              (day) => (
                <TableCell
                  className="reminders"
                  key={Math.random()}
                  align="center"
                >
                  <Day indexMonth={index} day={day} />
                </TableCell>
              ),
            )
          }
        </TableRow>
      ))}
    </TableBody>
  );
}
