import React from 'react';
import Reminder from './reminder';

export default function Reminders({ reminders }) {
  return (
    <ul className="reminders-list">
      {reminders.map((reminder) => <Reminder key={`reminder${reminder.id}`} reminder={reminder} />)}
    </ul>
  );
}
