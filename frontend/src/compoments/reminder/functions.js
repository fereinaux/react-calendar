import moment from 'moment';

export function checkReminder(title, city) {
  let errors = [
  ]

  if (!title) {
    errors.push({ error: 'Title is Required', field: 'title' })
  }

  if (title.length > 30) {
    errors.push({ error: 'Size limit exced(30 characters)', field: 'title' })
  }

  if (!city) {
    errors.push({ error: 'City is Required', field: 'city' })
  }

  return errors
}

export function getReminder(title, city, color, date, id, time) {
  return {
    title, color: color, date: moment(date), city, id: id || Math.random(), originalId:id, time
  };
}