import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getNumberWithZero,
  getRandomElement,
  getRandomArrayPart
} from './utils.js';

import {
  COARD_AMOUNT,
  OFFERS_COUNT,
} from './const.js';

const TITLE = 'Предложения по достуной цене';
const DESCRIPTION = 'Помещение просто супер';

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const PriceRange = {
  MIN: 1000,
  MAX: 100000
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
  MAX: 5
};

const GuestsRange = {
  MIN: 1,
  MAX: 10
};

const createOffer = (_item, i) => {
  const index = i + 1;
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
      features: getRandomArrayPart(FEATURES),
      description: `${DESCRIPTION}`,
      photos: getRandomArrayPart(PHOTOS)
    },
    location: {
      lat,
      lng
    }
  };
};

export const getRandomOffers = (length = OFFERS_COUNT) => Array.from({ length }, createOffer);
