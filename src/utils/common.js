import dayjs from 'dayjs';

export const getRandomIntNumber = (min, max) => {
  if (min <= max) {
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new Error('Минимальное значение должно быть меньше или рано максимальному');
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortByDay = (a, b) =>  dayjs().diff(b.dueDate, 'second') - dayjs().diff(a.dueDate, 'second');
export const sortByTime = (a, b) =>  dayjs(b.timeEnd).diff(b.timeStart, 'second') - dayjs(a.timeEnd).diff(a.timeStart, 'second');
export const sortByPrice = (a, b) =>  b.price - a.price;
