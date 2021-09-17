export const getDateFormat = (
  dateStr: string | number | Date,
  a: string = '.',
  yearFirst: true | undefined = undefined,
) => {
  const date: Date = new Date(dateStr);

  let month = '';
  month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  let day = '';
  day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  if (yearFirst) {
    return `${date.getFullYear()}${a}${month}${a}${day}`;
  } else {
    return `${day}${a}${month}${a}${date.getFullYear()}`;
  }
  /**
   * zmiana formatu daty
   */
};

export const getHourFormat = (dateStr: string | number, timezone?: number) => {
  const date: Date = new Date(dateStr);
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;

  if (timezone) {
    return `${+hours + timezone}:${minutes}`;
  }
  return `${hours}:${minutes}`;
  /**
   * Zmiana formatu godziny pobranej z daty
   */
};

export const getHourWithSecondsFormat = (dateStr: string) => {
  const date: Date = new Date(dateStr);

  let minutes = '';
  minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  let seconds = '';
  seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

  return `${date.getHours()}:${minutes}:${seconds}`;
  /**
   * Format godziny pobranej z daty z sekundami
   */
};
