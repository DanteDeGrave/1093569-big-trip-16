import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const MIN_COUNT = 1;
const MAX_COUNT = 5;
const wayPointTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const destinationInfoOptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const cities = ['Paris', 'Amsterdam', 'Rome', 'Barcelona', 'Prague', 'Helsinki', 'Reykjavik'];
const offerOptionTitles = ['Switch to comfort', 'Eat', 'Journal to read', 'One bottle water', 'Carry luggage'];

const getRandomIntNumber = (min, max) => {
  if (min <= max) {
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new Error('Минимальное значение должно быть меньше или рано максимальному');
};

const generateDate = () => {
  const MAX_DATE_GAP = 7;
  const daysGap = getRandomIntNumber(-MAX_DATE_GAP, MAX_DATE_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateTime = (gap) =>  dayjs().subtract(gap, 'second').toISOString();

const getRandomArrayElement = (array) => array[getRandomIntNumber(0, array.length - 1)];

const getRandomDestinationInfo = (count) => {
  if (destinationInfoOptions.length < count) {
    throw new Error(`Нельзя передавать в функцию getRandomDestinationInfo значение выше, чем ${destinationInfoOptions.length}`);
  }
  const arr = [];
  for (let i = 0; i < count; i++) {
    let option = destinationInfoOptions[getRandomIntNumber(0, destinationInfoOptions.length - 1)];
    while (arr.includes(option)) {
      option = destinationInfoOptions[getRandomIntNumber(0, destinationInfoOptions.length - 1)];
    }
    arr.push(option);
  }
  return arr;
};

const getGenerateOffer = () => {
  let id = 1;
  return () => ({
    id: id++,
    title:offerOptionTitles[getRandomIntNumber(0, offerOptionTitles.length - 1)],
    price: getRandomIntNumber(1, 100),
    isChecked: Boolean(getRandomIntNumber(0, 1)),
  });
};

const getRandomOffers = () => {
  const offer = getGenerateOffer();
  return Array.from({length: getRandomIntNumber(0, MAX_COUNT)}, () => offer());
};

const getRandomPictures = () => Array.from({length: getRandomIntNumber(MIN_COUNT, MAX_COUNT)}, () => `img/photos/${getRandomIntNumber(MIN_COUNT, MAX_COUNT)}.jpg`);

export const generateWaypoint = () => {
  const dueDate = generateDate();
  const type =  getRandomArrayElement(wayPointTypes);
  return {
    id: nanoid(),
    dueDate,
    price: getRandomIntNumber(20, 200),
    wayPointType: type,
    wayPointTypes,
    cities,
    timeStart: generateTime(getRandomIntNumber(0, MAX_COUNT * 10000)),
    timeEnd: generateTime(getRandomIntNumber(-MAX_COUNT * 1000, 0)),
    destination: {
      name: getRandomArrayElement(cities),
      destinationInfo: getRandomDestinationInfo(getRandomIntNumber(MIN_COUNT, MAX_COUNT)),
      pictures: getRandomPictures(),
    },
    offer: {
      type,
      offers: getRandomOffers(),
    },
    isFavorite: Boolean(getRandomIntNumber(0, 1)),
  };
};
