import { MAX_PRICE } from './const.js';

const valueElement = document.querySelector('.add-form__value');

const createSlider = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE,
    },
    start: 0,
    step: 500,
    connect: 'lower',
    format: {
      to(value) {
        return value.toFixed(0);
      },
      from(value) {
        return parseFloat(value);
      },
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
  return sliderElement.noUiSlider;
};

export { createSlider };
