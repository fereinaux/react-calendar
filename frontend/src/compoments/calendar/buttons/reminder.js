import React from 'react';
import "./buttons.css";
import { useNavigate } from "react-router-dom";

export default function ReminderButton() {
  const navigate = useNavigate();
  return <div
    onClick={() => navigate("/reminder")}
    className="change-date cursor-pointer"
  >
    <span className="new-reminder"> New Reminder </span>
  </div>;
}