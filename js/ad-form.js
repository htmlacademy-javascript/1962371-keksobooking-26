import { toggleForm, getWordAfterNum, setAddress } from './utils.js';
import { offerType, RoomToGuests, MAX_PRICE, DEFAULT_LOCATION } from './const.js';
import { createSlider } from './slider.js';
import { resetMap } from './map.js';
import { postDataServer } from './api.js';
import { toggleFiltersElement, clearFilters } from './map-filters.js';
import { clearImages } from './avatar.js';

const PRICE_PRIORITY = 1000;
const DISABLED_CLASS_NAME = 'ad-form--disabled';
const formElement = document.querySelector('.ad-form');
const submitElement = formElement.querySelector('.ad-form__submit');
const roomsFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');
const timeinFieldElement = formElement.querySelector('[name="timein"]');
const timeoutFieldElement = formElement.querySelector('[name="timeout"]');
const typeFieldElement = formElement.querySelector('[name="type"]');
const priceFieldElement = formElement.querySelector('[name="price"]');
const sliderElement = formElement.querySelector('.ad-form__slider');
const addressElement = formElement.querySelector('[name="address"]');

addressElement.value = setAddress(DEFAULT_LOCATION);

const initialType = typeFieldElement.value;

const toggleFormElement = (isActive) => {
  toggleForm(isActive, formElement, DISABLED_CLASS_NAME);
};

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

// Валидация кол-во комнат и кол-во гостей
const validateCapacity = () => RoomToGuests[roomsFieldElement.value].includes(capacityFieldElement.value);
const getCapacityErrorMessage = () => {
  const { value } = roomsFieldElement;
  const rooms = `${value} ${getWordAfterNum(value, ['комнаты', 'комнат'])}`;
  const validGuests = RoomToGuests[value];
  return `Для ${rooms} допустимо гостей: ${validGuests.join(', ')}`;
};

pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityErrorMessage);
roomsFieldElement.addEventListener('change', () => pristine.validate(capacityFieldElement));

// Валидация тип жилья и цена за ночь
const setPriceAttributes = (type) => {
  const minPrice = offerType[type].min;
  priceFieldElement.min = minPrice;
  priceFieldElement.placeholder = minPrice;
};
setPriceAttributes(initialType);

const priceUiSlider = createSlider(sliderElement, parseInt(priceFieldElement.min, 10), () => {
  priceFieldElement.value = priceUiSlider.get();

  pristine.validate(priceFieldElement);
});

const changeType = (type = typeFieldElement.value) => {
  setPriceAttributes(type);

  const min = parseInt(priceFieldElement.min, 10);

  priceUiSlider.updateOptions({
    range: {
      min,
      max: MAX_PRICE
    }
  });

  if (!priceFieldElement.value) {
    priceUiSlider.set(min);
  }
};

priceFieldElement.addEventListener('input', () => {
  if (pristine.validate(priceFieldElement)) {
    priceUiSlider.set(parseInt(priceFieldElement.value, 10));
  }
});

const validatePrice = (value) => {
  const price = parseInt(value || 0, 10);
  const inRange = price >= parseInt(priceFieldElement.min, 10) && price <= MAX_PRICE;
  return /^\d+$/.test(value) && inRange;
};

const getPriceErrorMessage = () => `Выберите число между ${priceFieldElement.min} и ${MAX_PRICE}`;

pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage, PRICE_PRIORITY, true);

typeFieldElement.addEventListener('change', () => {
  changeType();

  // Чтобы при смене типа сразу подсветило, если значение стало невалидным
  pristine.validate(priceFieldElement);
});

// Валидация время заезда и время выезда
timeinFieldElement.addEventListener('change', () => {
  timeoutFieldElement.value = timeinFieldElement.value;
});
timeoutFieldElement.addEventListener('change', () => {
  timeinFieldElement.value = timeoutFieldElement.value;
});

submitElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  submitElement.disabled = true;
  const offerData = new FormData(formElement);
  toggleFormElement(false);
  toggleFiltersElement(false);
  postDataServer(offerData, () => {
    formElement.reset();
    submitElement.disabled = false;
  });
});

formElement.addEventListener('reset', () => {
  changeType(initialType);
  clearFilters();
  resetMap();
  clearImages();
  priceUiSlider.set(parseInt(priceFieldElement.min, 10));
  pristine.reset();
});

export { addressElement, toggleFormElement };
