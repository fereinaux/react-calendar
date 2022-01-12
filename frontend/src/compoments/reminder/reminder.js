import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DatePicker, TimePicker, Input } from 'antd';
import "react-day-picker/lib/style.css";
import './reminder.css'
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { SketchPicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { checkReminder, getReminder } from './functions'

const Reminder = () => {
  const format = 'HH:mm';
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  let reminders = useSelector(state => state)
  const [reminder, setReminder] = useState({});

  const [date, setDate] = useState(moment(new Date(), 'YYYY-MM-DD'));
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [color, setColor] = useState({ hex: '#a52a2a' });
  const [time, setTime] = useState(moment(new Date(), format));
  const [weather, setWeather] = useState('');
  const [errors, setErrors] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  useEffect(() => {
    setReminder(reminders.find(reminder => reminder.id == id))
  }, [id]);

  useEffect(() => {
    if (reminder && reminder.id) {
      setDate(reminder.date)
      setTitle(reminder.title)
      setCity(reminder.city)
      setColor(reminder.color)
      setTime(moment(reminder.time, format))
      setWeather(reminder.weather)
    }
  }, [reminder]);


  function deleteReminder() {
    setButtonEnabled(false)
    if (id) {
      dispatch({
        type: 'DELETE', param: id
      })
      navigate('/')
    }
    setButtonEnabled(true)
  }

  function handleSave(reminder) {
    dispatch({
      type: reminder.originalId ? 'EDIT' : 'INSERT', param: reminder
    });
    navigate('/');
  }

  function saveReminder() {
    setButtonEnabled(false)
    let errors = checkReminder(title, city)
    if (errors.length > 0) {
      setErrors(errors)
      setButtonEnabled(true)
    } else {
      let reminder = getReminder(title, city, color, date, id, time)

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_ID}`)
        .then(res => {
          if (res.status == 200) {
            reminder.weather = res.data.weather[0].main
          }
          handleSave(reminder);
        })
        .catch(res => {
          handleSave(reminder);
        })

    }
  }

  return (
    <div className='reminder-panel'>
      <div className='fields' style={{ backgroundColor: color.hex }}>

        <h2>{id ? "Edit Reminder" : "New Reminder"}</h2>
        <label>Description</label>
        <Input className={`${errors.find(error => error.field == 'title') && 'error-field'}`} max={30} onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Reminder's description" />
        {errors.find(error => error.field == 'title') &&
          <span>{errors.find(error => error.field == 'title').error}</span>}
        <label>City</label>
        <Input className={`${errors.find(error => error.field == 'city') && 'error-field'}`} onChange={(event) => setCity(event.target.value)} value={city} placeholder="Reminder's city" />
        {errors.find(error => error.field == 'city') &&
          <span>{errors.find(error => error.field == 'city').error}</span>}
        {
          weather && <span>Weather: {reminder.weather}</span>
        }
        <label>Date</label>
        <DatePicker onChange={(date) => setDate(date)} value={date} />
        <TimePicker value={time} format={format} onChange={(time) => setTime(time)} />

        <label>Color</label>
        <SketchPicker
          color={color}
          onChangeComplete={(color) => { setColor(color) }}
        />
      </div>
      <div className='buttons-panel'>

        <button disabled={!buttonEnabled} className='button back-button' onClick={() => navigate('/')}>Back to Calendar</button>
        <button disabled={!buttonEnabled} className='button save-button' onClick={saveReminder} >Save Reminder</button>
        {id &&
          <button disabled={!buttonEnabled} className='button delete-button' onClick={deleteReminder} >Delete Reminder</button>
        }
      </div>
    </div>
  );
}

export default Reminder;


