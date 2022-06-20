//Функция, возвращающая случайное целое число из переданного диапазона включительно!
const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return getRandomPositiveInteger(Math.abs(min), Math.abs(max));
  }

  if (max < min) {
    return getRandomPositiveInteger(max, min);
  }

  if (max === min) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomPositiveFloat = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    return getRandomPositiveFloat(Math.abs(min), Math.abs(max), digits);
  }

  if (max < min) {
    return getRandomPositiveFloat(max, min, digits);
  }

  if (max === min) {
    return parseFloat(min.toFixed(digits));
  }

  const result = Math.random() * (max - min) + min;
  return result.toFixed(digits);
};

const TITLE = 'Предложения по достуной цене';
const DESCRIPTION = 'Помещение просто супер';

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const PriceRange = {
  MIN: 1000,
  MAX: 100000,
};

const LatRange = {
  MIN: 35.65,
  MAX: 35.7
};

const LngRange = {
  MIN: 139.7,
  MAX: 139.8
};

const RoomsRange = {
  MIN: 1,
  MAX: 5,
};

const GuestsRange = {
  MIN: 1,
  MAX: 10,
};

const createOffer = (_item, i) => {
  const index = i + 1;
  const COARD_AMOUNT = 5;
  //Функция, возвращающая число с ведущий нулем
  const getNumberWithZero = (number) => number < 10 ? `0${number}` : number;
  //Функция, возвращающая рандомный элемент
  const getRandomElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
  const lat = getRandomPositiveFloat(LatRange.MIN, LatRange.MAX, COARD_AMOUNT);
  const lng = getRandomPositiveFloat(LngRange.MIN, LngRange.MAX, COARD_AMOUNT);

  return {
    author: {
      avatar: `img/avatars/user${getNumberWithZero(index)}.png`
    },
    offer: {
      title: `${TITLE}`,
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(PriceRange.MIN, PriceRange.MAX),
      type: getRandomElement(OFFER_TYPE),
      rooms: getRandomPositiveInteger(RoomsRange.MIN, RoomsRange.MAX),
      guests: getRandomPositiveInteger(GuestsRange.MIN, GuestsRange.MAX),
      checkin: getRandomElement(CHECK_TIME),
      checkout: getRandomElement(CHECK_TIME),
      features: getRandomElement(FEATURES),
      description: `${DESCRIPTION}`,
      photos: getRandomElement(PHOTOS),
    },
    location: {
      lat,
      lng
    }
  };
};

const similarOffer = Array.from({length: 10}, createOffer);

similarOffer();
createOffer();
