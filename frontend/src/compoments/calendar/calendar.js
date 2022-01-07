import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calendar.css'
import {
  useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Sun, Umbrella, CloudRain, CloudLightning, CloudSnow, Trash2 } from 'react-feather';

function Calendar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let reminders = useSelector(state => state)
  const [month, setMonth] = useState(moment(new Date()).month());
  const [year, setYear] = useState(moment(new Date()).year());
  const [daysInMonth, setDaysInMonth] = useState(moment().daysInMonth(month));
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  function handleMonth(inc) {
    if (month + inc > 11) {
      setMonth(0)
      setYear(year + 1)
    } else if (month + inc < 0) {
      setMonth(11)
      setYear(year - 1)
    } else
      setMonth(month + inc)
  }

  function getIcon(forecast) {
    switch (forecast) {
      case 'cloud':
      case 'cloudly_day':
      case 'cloudly_night':
        return <CloudRain size={12} />
      case 'storm':
        return <CloudLightning size={12} />
      case 'snow':
      case 'hail':
        return <CloudSnow size={12} />
      case 'rain':
      case 'fog':
        return <Umbrella size={12} />
      case 'clear_day':
      case 'clear_night':
        return <Sun size={12} />
      default:
        break
    }
  }

  function handleReminders(day) {
    let filteredReminders = reminders
      .filter(reminder => reminder.date.format('YYYY-MM-DD') == day.format('YYYY-MM-DD'))
    return <React.Fragment>
      {

        filteredReminders
          .map(reminder => {
            return <li className='reminder'>
              <span onClick={() => navigate(`/reminder/${reminder.id}`)} style={{ backgroundColor: reminder.color.hex }}>
                {reminder.title} {getIcon(reminder.forecast)}
              </span>
            </li>
          })
      }
      {
        filteredReminders.length > 0 && <Trash2 color="brown" size={15} className='delete-day' onClick={() => dispatch({
          type: 'DELETEBYDAY', param: day
        })} />
      }
    </React.Fragment>
  }
  function getDaysOfMonth(month) {
    if (daysInMonth > 0) {
      let daysOfMonth = [];
      for (let i = 0; i < daysInMonth; i++) {
        daysOfMonth.push(moment(`${year}-${month + 1}-${i + 1}`))
      }
      return daysOfMonth
    }
  }

  useEffect(() => {
    setDaysInMonth(moment(`${year}-${month + 1}-${1}`).daysInMonth())
  }, [month, year]);

  useEffect(() => {
    setDaysOfMonth(getDaysOfMonth(month))
  }, [daysInMonth, month, year]);

  return <React.Fragment>
    <div className='action-panel'>
      <div className='change-date'>
        <span> Year </span>
        <span onClick={() => setYear(year - 1)}> &lt;&lt; </span>
        <h2>{moment(`${year}-${month + 1}-1`).format('YYYY')}</h2>
        <span onClick={() => setYear(year + 1)}> &gt;&gt; </span>
      </div>
      <div className='change-date'>
        <span> Month </span>
        <span onClick={() => handleMonth(-1)}> &lt;&lt; </span>
        <h2>{moment(`${year}-${month + 1}-1`).format('MMMM')}</h2>
        <span onClick={() => handleMonth(1)}> &gt;&gt; </span>
      </div>
      <div onClick={() => navigate('/reminder')} className='change-date cursor-pointer'>
        <span className='new-reminder'> New Reminder </span>
      </div>
    </div>
    <ul className='week-days'>
      {
        daysOfWeek.map((day, index) => <li key={`week-day-${index}`} className='week-day'>
          <h3>{day}</h3>
          {daysOfMonth && daysOfMonth.length > 0 &&
            <ul className='month-days'>

              {daysOfMonth.filter(day => day.weekday() == index).map((day, indexMonth) => {

                return <React.Fragment>
                  {indexMonth == 0 && day.date() > 1 && daysOfMonth[0].weekday() > day.weekday()
                    && <li className='month-day not-month'></li>}
                  <li className={`month-day add ${[0, 6].includes(day.weekday()) && 'weekend'}`} key={`month-day-${indexMonth}`}>
                    <span className={`day-of-month`}>
                      {day.format('DD')}
                    </span>
                    <ul className='reminders-list'>
                      {handleReminders(day)}
                    </ul>
                  </li>
                </React.Fragment>
              })}
            </ul>
          }
        </li>)
      }
    </ul>
  </React.Fragment>
}

export default Calendar;