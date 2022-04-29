import React from 'react';
import './buttons.css';
import YearButton from './year';
import MonthButton from './month';
import ReminderButton from './reminder';

export default function ButtonsPanel() {
  return (
    <div className="action-panel">
      <YearButton />
      <MonthButton />
      <ReminderButton />
    </div>
  );
}
