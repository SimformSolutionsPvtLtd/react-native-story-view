export const getDateWithNow = (date: string | number | Date) => {
  const startDate = new Date(date);
  const endDate = new Date();
  const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  let current: string;
  if (days >= 1) {
    current = days === 1 ? 'day' : 'days';
    return Math.trunc(days) + ' ' + current;
  } else if (hours > 1) {
    current = days === 1 ? 'hour' : 'hours';
    return Math.trunc(hours) + ' ' + current;
  } else {
    current = minutes === 1 ? 'minute' : 'minutes';
    return Math.trunc(hours) + ' ' + current;
  }
};
