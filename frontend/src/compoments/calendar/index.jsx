import React from 'react';
import './calendar.css';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Header from './header';
import Body from './body';
import Buttons from '../buttons/buttons';

function Calendar() {
  return (
    <>
      <Buttons />
      <div className="week-days">
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <Header />
            <Body />
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Calendar;
