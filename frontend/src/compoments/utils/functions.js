import moment from 'moment';

export function checkReminder(title, city) {
  const errors = [
  ];

  if (!title) {
    errors.push({ error: 'Title is Required', field: 'title' });
  }

  if (title.length > 30) {
    errors.push({ error: 'Size limit exced(30 characters)', field: 'title' });
  }

  if (!city) {
    errors.push({ error: 'City is Required', field: 'city' });
  }

  return errors;
}

export function getReminder(title, city, color, date, id, time) {
  return {
    title,
    color,
    date: moment(date),
    city,
    id: id || Math.floor(Math.random() * 1000),
    originalId: id,
    time,
  };
}
