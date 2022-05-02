import { createStore } from 'redux';
import moment from 'moment';

const month = moment(new Date()).month();
const year = moment(new Date()).year();
const daysInMonth = moment().daysInMonth(month);

const getDaysInMonth = (lYear, lMonth) => moment(`${lYear}-${lMonth + 1}`, 'YYYY-MM').daysInMonth();

const getDaysOfMonth = (lMonth, lYear, lDaysInMonth) => {
  const daysOfMonth = [];
  for (let i = 0; i < lDaysInMonth; i += 1) {
    daysOfMonth.push(moment(`${lYear}-${lMonth + 1}-${i + 1}`));
  }
  return daysOfMonth;
};

const initialState = {
  reminders: [],
  calendar: {
    month,
    year,
    daysInMonth: getDaysInMonth(year, month),
    daysOfMonth: getDaysOfMonth(month, year, daysInMonth),
    daysOfWeek: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
};

function sortState(state) {
  return {
    ...state,
    reminders: state.reminders.sort((a, b) => moment(a.time).format('HHmm') - moment(b.time).format('HHmm')),
  };
}

function calendar(state = initialState, action = { type: '', param: {} }) {
  const { param } = action;
  let lDaysInMonth;
  switch (action.type) {
    case 'MONTH':
      lDaysInMonth = getDaysInMonth(state.calendar.year, param);
      return {
        ...state,
        calendar: {
          ...state.calendar,
          month: param,
          daysInMonth,
          daysOfMonth: getDaysOfMonth(param, state.calendar.year, lDaysInMonth),
        },
      };
    case 'YEAR':
      lDaysInMonth = getDaysInMonth(param, state.calendar.month);
      return {
        ...state,
        calendar: {
          ...state.calendar,
          year: param,
          daysOfMonth: getDaysOfMonth(state.calendar.month, param, lDaysInMonth),
        },
      };
    case 'EDIT': {
      const editIndex = state.reminders.findIndex(
        (reminder) => Number(reminder.id) === Number(param.id),
      );
      state.reminders.splice(editIndex, 1, param);
      return sortState(state);
    }
    case 'INSERT':
      state.reminders.push(param);
      return sortState(state);
    case 'DELETE': {
      const removeIndex = state.reminders.findIndex(
        (reminder) => Number(reminder.id) === Number(param),
      );
      state.reminders.splice(removeIndex, 1);
      return sortState(state);
    }
    case 'DELETEBYDAY':
      return sortState({ ...state, reminders: state.reminders.filter((reminder) => reminder.date.format('YYYYMMDD') !== param.format('YYYYMMDD')) });
    default:
      return sortState(state);
  }
}

const store = createStore(calendar);

export default store;
