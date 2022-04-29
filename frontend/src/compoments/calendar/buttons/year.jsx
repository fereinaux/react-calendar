import React from 'react';
import './buttons.css';
import { useDispatch, useSelector } from 'react-redux';

export default function YearButton() {
  const { year } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  function setYear(year) {
    dispatch({
      type: 'YEAR',
      param: year,
    });
  }
  return (
    <div className="change-date">
      <span> Year </span>
      <span onClick={() => setYear(year - 1)}> &lt; &lt; </span>
      <h2>{year}</h2>
      <span onClick={() => setYear(year + 1)}> &gt; &gt; </span>
    </div>
  );
}
