export const getRandomIntNumber = (min, max) => {
  if (min <= max) {
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new Error('Минимальное значение должно быть меньше или рано максимальному');
};

export const updateItem = (items, update) => {
  const index = items.forEach((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
