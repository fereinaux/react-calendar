import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
} from 'react-feather';

export default function Reminder({ reminder }) {
  const navigate = useNavigate();
  const getIcon = (weather) => {
    switch (weather) {
      case 'Clouds':
        return <Cloud size={12} />;
      case 'Thunderstorm':
        return <CloudLightning size={12} />;
      case 'Snow':
        return <CloudSnow size={12} />;
      case 'Rain':
      case 'Drizzle':
        return <CloudRain size={12} />;
      case 'Clear':
        return <Sun size={12} />;
      default:
        return null;
    }
  };
  const goToReminder = () => {
    navigate(`/reminder/${reminder.id}`);
  };
  return (
    <li key={reminder.id} className="reminder">
      <span
        role="button"
        tabIndex={0}
        onKeyDown={goToReminder}
        onClick={goToReminder}
        style={{ backgroundColor: reminder.color.hex }}
      >
        {reminder.title}
        {' '}
        {getIcon(reminder.weather)}
      </span>
    </li>
  );
}
