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
  const [forecast, setForecast] = useState('');

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
      setForecast(reminder.forecast)
    }
  }, [reminder]);

  function createReminder() {
    return {
      title, color: color, date: moment(date), city, id: id || Math.random(), time
    };
  }

  function deleteReminder() {
    if (id) {
      dispatch({
        type: 'DELETE', param: id
      })
      navigate('/')
    }
  }

  function saveReminder() {
    // axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=16&appid=dea6343c2b0c8532caaa0a5814866aa3`)
    //   .then(res => {
    //     console.log(res);
    //   })

    if (id) {
      dispatch({
        type: 'EDIT', param: createReminder()
      })
    } else {

      dispatch({
        type: 'INSERT', param: createReminder()
      })
    }
    navigate('/')
  }



  return (
    <div className='reminder-panel'>
      <div className='fields' style={{ backgroundColor: color.hex }}>

        <h2>{id ? "Edit Reminder" : "New Reminder"}</h2>
        <label>Description</label>
        <Input onChange={(event) => setTitle(event.target.value)} value={title} placeholder="Reminder's description" />
        <label>City</label>
        <Input onChange={(event) => setCity(event.target.value)} value={city} placeholder="Reminder's city" />
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

        <button className='button back-button' onClick={() => navigate('/')}>Back to Calendar</button>
        <button className='button save-button' onClick={saveReminder} >Save Reminder</button>
        {id &&
          <button className='button delete-button' onClick={deleteReminder} >Delete Reminder</button>
        }
      </div>
    </div>
  );
}

export default Reminder;


