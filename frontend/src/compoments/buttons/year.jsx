import React from 'react';
import './buttons.css';
import { useDispatch, useSelector } from 'react-redux';

export default function YearButton() {
  const { year } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const setYear = (lYear) => {
    dispatch({
      type: 'YEAR',
      param: lYear,
    });
  };

  const subtractYear = () => {
    setYear(year - 1);
  };

  const addYear = () => {
    setYear(year + 1);
  };
  return (
    <div className="change-date">
      <span> Year </span>
      <span
        role="button"
        onKeyDown={subtractYear}
        tabIndex={0}
        onClick={subtractYear}
      >
        {' '}
        &lt; &lt;
        {' '}
      </span>
      <h2>{year}</h2>
      <span
        role="button"
        onKeyDown={addYear}
        tabIndex={0}
        onClick={addYear}
      >
        {' '}
        &gt; &gt;
        {' '}

      </span>
    </div>
  );
}
