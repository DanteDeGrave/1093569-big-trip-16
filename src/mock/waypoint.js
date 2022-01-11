import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomIntNumber} from '../utils/common';

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

const generateDate = () => {
  const MAX_DATE_GAP = 7;
  const daysGap = getRandomIntNumber(-MAX_DATE_GAP, MAX_DATE_GAP);
  return dayjs().add(daysGap, 'day');
};

const generateTime = (date) =>  date.add(getRandomIntNumber(0, 788645), 'second').toDate();

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

const getGenerateOffer = (editOffer) => {
  let id = 1;
  return () => ({
    id: id++,
    title:offerOptionTitles[getRandomIntNumber(0, offerOptionTitles.length - 1)],
    price: getRandomIntNumber(1, 100),
    isChecked: editOffer? false : Boolean(getRandomIntNumber(0, 1)),
  });
};

const getRandomOffers = (editOffer) => Array.from({length: getRandomIntNumber(0, MAX_COUNT)}, getGenerateOffer(editOffer));

const getRandomPictures = () => Array.from({length: getRandomIntNumber(MIN_COUNT, MAX_COUNT)}, () => `img/photos/${getRandomIntNumber(MIN_COUNT, MAX_COUNT)}.jpg`);

const getDestinationsList = () => cities.map((element) => ({
  name: element,
  destinationInfo: getRandomDestinationInfo(getRandomIntNumber(MIN_COUNT, MAX_COUNT)),
  pictures: getRandomPictures(),
}));

export const generateOffersList = () => wayPointTypes.map((element) => ({
  type: element,
  offers: getRandomOffers(true),
}));

export const generateWaypoint = () => {
  const type = getRandomArrayElement(wayPointTypes);
  const timeStart = generateDate();
  return {
    id: nanoid(),
    price: getRandomIntNumber(20, 200),
    cities,
    timeStart: timeStart.toISOString(),
    timeEnd: generateTime(timeStart).toISOString(),
    destination: {
      name: getRandomArrayElement(cities),
      description: getRandomDestinationInfo(getRandomIntNumber(MIN_COUNT, MAX_COUNT)),
      pictures: getRandomPictures(),
    },
    destinationsList: getDestinationsList(),
    type,
    offer: {
      type,
      offers: getRandomOffers(),
    },
    offersList: generateOffersList(),
    isFavorite: Boolean(getRandomIntNumber(0, 1)),
  };
};
