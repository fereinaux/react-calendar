import { createStore } from 'redux';
import moment from 'moment';

const month = moment(new Date()).month()
const year = moment(new Date()).year()
const daysInMonth = moment().daysInMonth(month)

const getDaysInMonth = (year, month) => {
  return moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth()
}

const getDaysOfMonth = (month, year, daysInMonth) => {
  let daysOfMonth = [];
  for (let i = 0; i < daysInMonth; i++) {
    daysOfMonth.push(moment(`${year}-${month + 1}-${i + 1}`));
  }
  return daysOfMonth;
}

const initialState = {
  reminders: [], calendar: {
    month: month,
    year: year,
    daysInMonth: getDaysInMonth(year, month),
    daysOfMonth: getDaysOfMonth(month, year, daysInMonth),
    daysOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
  }
}

function sortState(state) {
  return {
    ...state, reminders: state.reminders.sort((a, b) => {
      return moment(a.time).format('HHmm') - moment(b.time).format('HHmm')
    })
  }
}

function calendar(state = initialState, action) {
  let param = action.param;
  let daysInMonth;
  switch (action.type) {
    case 'MONTH':
      daysInMonth = getDaysInMonth(state.calendar.year, action.param);
      return {
        ...state,
        calendar: {
          ...state.calendar,
          month: action.param,
          daysInMonth: daysInMonth,
          daysOfMonth: getDaysOfMonth(action.param, state.calendar.year, daysInMonth)
        }
      }
    case 'YEAR':
      daysInMonth = getDaysInMonth(action.param, state.calendar.month);
      return {
        ...state,
        calendar: {
          ...state.calendar,
          year: action.param,
          daysOfMonth: getDaysOfMonth(state.calendar.month, action.param, daysInMonth)
        }
      }
    case 'EDIT':
      let editIndex = state.reminders.findIndex(reminder => reminder.id === param.id)
      state.reminders[editIndex] = param
      return sortState(state)
    case 'INSERT':
      state.reminders.push(param)
      return sortState(state)
    case 'DELETE':
      let removeIndex = state.reminders.findIndex(reminder => reminder.id === param)
      state.reminders.splice(removeIndex, 1)
      return sortState(state)
    case 'DELETEBYDAY':
      return sortState({ ...state, reminders: state.reminders.filter(reminder => reminder.date.format('YYYYMMDD') !== param.format('YYYYMMDD')) })
    default:
      return sortState(state)
  }
}

const store = createStore(calendar);

export default store;