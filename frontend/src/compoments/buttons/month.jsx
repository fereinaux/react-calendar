import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

export default function MonthButton() {
  const dispatch = useDispatch();
  const { year, month } = useSelector((state) => state.calendar);
  const handleMonth = (inc) => {
    if (month + inc > 11) {
      dispatch({
        type: 'MONTH',
        param: 0,
      });
      dispatch({
        type: 'YEAR',
        param: year + 1,
      });
    } else if (month + inc < 0) {
      dispatch({
        type: 'MONTH',
        param: 11,
      });
      dispatch({
        type: 'YEAR',
        param: year - 1,
      });
    } else {
      dispatch({
        type: 'MONTH',
        param: month + inc,
      });
    }
  };

  const subtractMonth = () => {
    handleMonth(-1);
  };

  const addMonth = () => {
    handleMonth(1);
  };

  return (
    <div className="change-date">
      <span> Month </span>
      <span
        role="button"
        tabIndex={0}
        onKeyDown={subtractMonth}
        onClick={subtractMonth}
      >
        {' '}
        &lt; &lt;
        {' '}

      </span>
      <h2>{moment(`${year}-${month + 1}-1`).format('MMMM')}</h2>
      <span
        role="button"
        tabIndex={0}
        onKeyDown={addMonth}
        onClick={addMonth}
      >
        {' '}
        &gt; &gt;
        {' '}

      </span>
    </div>
  );
}
