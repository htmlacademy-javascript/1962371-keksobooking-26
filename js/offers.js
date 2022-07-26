import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getNumberWithZero,
  getRandomElement,
  getRandomArrayPart,
  setAddress
} from './utils.js';

import { OFFERS_COUNT, offerType } from './const.js';

const TITLE = 'Предложения по достуной цене';
const DESCRIPTION = 'Помещение просто супер';

const CHECK_TIME = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
  const lat = getRandomPositiveFloat(LatRange.MIN, LatRange.MAX);
  const lng = getRandomPositiveFloat(LngRange.MIN, LngRange.MAX);
  const location = {
    lat,
    lng
  };

  return {
    author: {
      avatar: `img/avatars/user${getNumberWithZero(index)}.png`
    },
    offer: {
      title: `${TITLE}`,
      address: setAddress(location),
      price: getRandomPositiveInteger(PriceRange.MIN, PriceRange.MAX),
      type: getRandomElement(Object.keys(offerType)),
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
const getRandomOffers = (length = OFFERS_COUNT) => Array.from({ length }, createOffer);

export { getRandomOffers };
