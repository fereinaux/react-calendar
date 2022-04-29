import moment from 'moment';
import { getReminder, checkReminder } from './functions';

describe('Handling Reminder', () => {
  it('should return Reminder', () => {
    const date = new Date();
    const time = moment(new Date(), 'HH:mm');
    const reminder = getReminder('Jobsity Test', 'Recife', '#a52a2a', date, undefined, time);
    expect(reminder.title).toBe('Jobsity Test');
    expect(reminder.city).toBe('Recife');
    expect(reminder.color).toBe('#a52a2a');
    expect(reminder.date).toStrictEqual(moment(date));
    expect(typeof (reminder.id)).toBe('number');
    expect(reminder.time).toBe(time);
  });

  it('should return no errors', () => {
    const errors = checkReminder('Jobsity Test', 'Recife');
    expect(errors.length).toBe(0);
  });

  it('should return title required', () => {
    const errors = checkReminder('', 'Recife');
    expect(errors.length).toBe(1);
    expect(errors[0].field).toBe('title');
    expect(errors[0].error).toBe('Title is Required');
  });

  it('should return title exceds size limit', () => {
    const errors = checkReminder('Jobsity Test Greater Than 30 characters', 'Recife');
    expect(errors.length).toBe(1);
    expect(errors[0].field).toBe('title');
    expect(errors[0].error).toBe('Size limit exced(30 characters)');
  });

  it('should return city required', () => {
    const errors = checkReminder('Jobsity Test', '');
    expect(errors.length).toBe(1);
    expect(errors[0].field).toBe('city');
    expect(errors[0].error).toBe('City is Required');
  });
});
