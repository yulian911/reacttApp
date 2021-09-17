export const sortByDate = (arrayWithObjects: any[], direction: string) => {
  const result = arrayWithObjects.sort((a, b) => {
    // console.log('a', a)
    // console.log('b', b)
    let first = {date: ''};
    let second = {date: ''};

    if (direction === 'descending') {
      first = a;
      second = b;
    }
    if (direction === 'ascending') {
      first = b;
      second = a;
    }
    const aDate = new Date(first.date).getTime();
    const bDate = new Date(second.date).getTime();
    if (aDate === bDate) {
      return (
        new Date(`${first.date}`).getTime() -
        new Date(`${second.date}`).getTime()
      );
    }
    return aDate - bDate;
  });
  return result;
  /**
   * Sortowanie obiektów po dacie
   */
};
