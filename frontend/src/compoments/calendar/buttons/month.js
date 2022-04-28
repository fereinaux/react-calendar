import React from 'react';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export default function MonthButton() {
  const dispatch = useDispatch();
  let { year, month } = useSelector((state) => state.calendar);
  function handleMonth(inc) {
    if (month + inc > 11) {
      dispatch({
        type: "MONTH",
        param: 0,
      });
      dispatch({
        type: "YEAR",
        param: year + 1,
      });
    } else if (month + inc < 0) {
      dispatch({
        type: "MONTH",
        param: 11,
      });
      dispatch({
        type: "YEAR",
        param: year - 1,
      });
    } else
      dispatch({
        type: "MONTH",
        param: month + inc,
      });
  }

  return <div className="change-date">
    <span> Month </span>
    <span onClick={() => handleMonth(-1)}> &lt; &lt; </span>
    <h2>{moment(`${year}-${month + 1}-1`).format("MMMM")}</h2>
    <span onClick={() => handleMonth(1)}> &gt; &gt; </span>
  </div>;
}