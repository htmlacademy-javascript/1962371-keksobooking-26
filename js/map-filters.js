import { toggleForm, debounce } from './utils.js';

const DEFAULT_VALUE = 'any';
const DISABLED_CLASS_NAME = 'map__filters--disabled';
const filtersElement = document.querySelector('.map__filters');
const inputElements = filtersElement.querySelectorAll('select, input');

const typeField = filtersElement.querySelector('#housing-type');
const priceField = filtersElement.querySelector('#housing-price');
const roomsField = filtersElement.querySelector('#housing-rooms');
const guestsField = filtersElement.querySelector('#housing-guests');

const housingPrice = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: Infinity
  },
  [DEFAULT_VALUE]: {
    min: 0,
    max: Infinity
  }
};

const checkFeatures = (features) => {
  if (!features) {
    return false;
  }
  const checkedCheckboxes = Array.from(filtersElement.querySelectorAll('[type="checkbox"]:checked'));
  return checkedCheckboxes.every(({ value }) => features.some((feature) => feature === value));
};

const matchCard = ({ offer }) => {
  const typeValue = typeField.value;
  if (typeValue !== offer.type && typeValue !== DEFAULT_VALUE) {
    return false;
  }

  const priceValue = priceField.value;
  const priceLessThanMin = offer.price < housingPrice[priceValue].min;
  const priceMoreThanMax = offer.price >= housingPrice[priceValue].max;
  if (priceLessThanMin || priceMoreThanMax) {
    return false;
  }

  const roomsValue = roomsField.value;
  if (offer.rooms.toString() !== roomsValue && roomsValue !== DEFAULT_VALUE) {
    return false;
  }

  const guestsValue = guestsField.value;
  if (offer.guests.toString() !== guestsValue && guestsValue !== DEFAULT_VALUE) {
    return false;
  }

  return checkFeatures(offer.features);
};

const toggleFiltersElement = (isActive) => {
  toggleForm(isActive, filtersElement, DISABLED_CLASS_NAME);
};

const initFilters = (cards, changeMarkers) => {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener(
      'change',
      debounce(() => {
        changeMarkers(cards.filter(matchCard));
      })
    );
  });
};

const clearFilters = () => {
  inputElements.forEach((filterElement) => {
    if (filterElement.tagName === 'SELECT') {
      filterElement.value = DEFAULT_VALUE;
    } else {
      filterElement.checked = false;
    }
    filterElement.dispatchEvent(new Event('change'));
  });
};

export { toggleFiltersElement, initFilters, clearFilters };
