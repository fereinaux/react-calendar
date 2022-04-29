import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DatePicker, TimePicker, Input } from 'antd';
import 'react-day-picker/lib/style.css';
import './createReminder.css';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { getWeahter } from '../../utils/api';
import { checkReminder, getReminder } from '../../utils/functions';

export default function CreateReminder() {
  const format = 'HH:mm';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reminder = useSelector(
    (state) => state.reminders.find(
      (lReminder) => Number(lReminder.id) === Number(id),
    ),
  );
  const [date, setDate] = useState(moment(new Date(), 'YYYY-MM-DD'));
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [color, setColor] = useState({ hex: '#a52a2a' });
  const [time, setTime] = useState(moment(new Date(), format));
  const [weather, setWeather] = useState('');
  const [errors, setErrors] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  useEffect(() => {
    if (reminder && reminder.id) {
      setDate(reminder.date);
      setTitle(reminder.title);
      setCity(reminder.city);
      setColor(reminder.color);
      setTime(moment(reminder.time, format));
      setWeather(reminder.weather);
    }
  }, [reminder]);

  function deleteReminder() {
    setButtonEnabled(false);
    if (id) {
      dispatch({
        type: 'DELETE', param: id,
      });
      navigate('/');
    }
    setButtonEnabled(true);
  }

  function handleSave(lReminder) {
    dispatch({
      type: lReminder.originalId ? 'EDIT' : 'INSERT', param: lReminder,
    });
    navigate('/');
  }

  async function saveReminder() {
    setButtonEnabled(false);
    const lErrors = checkReminder(title, city);
    if (lErrors.length > 0) {
      setErrors(lErrors);
      setButtonEnabled(true);
    } else {
      const lReminder = getReminder(title, city, color, date, id, time);

      const wheatherResult = await getWeahter(city);

      if (wheatherResult.succes) {
        lReminder.weather = wheatherResult.weather;
      }
      handleSave(lReminder);
    }
  }

  return (
    <div className="reminder-panel">
      <div className="fields" style={{ backgroundColor: color.hex }}>

        <h2>{id ? 'Edit Reminder' : 'New Reminder'}</h2>
        <label htmlFor="title">Description</label>
        <Input id="title" className={`${errors.find((error) => error.field === 'title') && 'error-field'}`} max={30} onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Reminder's description" />
        {errors.find((error) => error.field === 'title')
          && <span>{errors.find((error) => error.field === 'title').error}</span>}
        <label htmlFor="city">City</label>
        <Input id="city" className={`${errors.find((error) => error.field === 'city') && 'error-field'}`} onChange={(event) => setCity(event.target.value)} value={city} placeholder="Reminder's city" />
        {errors.find((error) => error.field === 'city')
          && <span>{errors.find((error) => error.field === 'city').error}</span>}
        {
          weather && (
            <span>
              Weather:
              {weather}
            </span>
          )
        }
        <label htmlFor="date">Date</label>
        <DatePicker id="date" onChange={(lDate) => setDate(lDate)} value={date} />
        <TimePicker value={time} format={format} onChange={(lTime) => setTime(lTime)} />

        <label htmlFor="color">Color</label>
        <SketchPicker
          color={color}
          id="color"
          onChangeComplete={(lColor) => { setColor(lColor); }}
        />
      </div>
      <div className="buttons-panel">

        <button type="button" disabled={!buttonEnabled} className="button back-button" onClick={() => navigate('/')}>Back to Calendar</button>
        <button type="button" disabled={!buttonEnabled} className="button save-button" onClick={saveReminder}>Save Reminder</button>
        {id
          && <button type="button" disabled={!buttonEnabled} className="button delete-button" onClick={deleteReminder}>Delete Reminder</button>}
      </div>
    </div>
  );
}
