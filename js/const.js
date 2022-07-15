export const OFFERS_COUNT = 10;
export const COORD_AMOUNT = 5;
export const MAX_PRICE = 100000;
export const offerType = {
  palace: {
    title: 'Дворец',
    min: 10000,
  },
  flat: {
    title: 'Квартира',
    min: 1000,
  },
  house: {
    title: 'Дом',
    min: 5000,
  },
  bungalow: {
    title: 'Бунгало',
    min: 0,
  },
  hotel: {
    title: 'Отель',
    min: 3000,
  },
};

export const RoomToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
