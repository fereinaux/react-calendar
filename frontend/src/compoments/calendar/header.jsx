import React from 'react';
import { useSelector } from 'react-redux';
import './header.css';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Header() {
  const { daysOfWeek } = useSelector((state) => state.calendar);
  return (
    <TableHead>
      <TableRow>
        {daysOfWeek.map(
          (day) => (
            <TableCell
              className="table-header"
              align="center"
              key={`week-day${day}`}
              day={day}
            >
              {day}
            </TableCell>
          ),
        )}

      </TableRow>
    </TableHead>
  );
}
