import React from 'react';
import './buttons.css';
import { useDispatch, useSelector } from 'react-redux';

export default function YearButton() {
  const { year } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  function setYear(lYear) {
    dispatch({
      type: 'YEAR',
      param: lYear,
    });
  }
  return (
    <div className="change-date">
      <span> Year </span>
      <span role="button" onKeyDown={() => setYear(year - 1)} tabIndex={0} onClick={() => setYear(year - 1)}> &lt; &lt; </span>
      <h2>{year}</h2>
      <span role="button" onKeyDown={() => setYear(year + 1)} tabIndex={0} onClick={() => setYear(year + 1)}> &gt; &gt; </span>
    </div>
  );
}
