import React from 'react';
import './buttons.css';
import { useNavigate } from 'react-router-dom';

export default function ReminderButton() {
  const navigate = useNavigate();
  const goToReminder = () => {
    navigate('/reminder');
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={goToReminder}
      onClick={goToReminder}
      className="change-date cursor-pointer"
    >
      <span className="new-reminder"> New Reminder </span>
    </div>
  );
}
