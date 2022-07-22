import { MAX_PRICE } from './const.js';

const createSlider = (sliderElement, min, valueElement ) => {
  noUiSlider.create(sliderElement, {
    range: {
      min,
      max: MAX_PRICE,
    },
    start: min,
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
  sliderElement.noUiSlider.on('slide', valueElement, () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
  return sliderElement.noUiSlider;
};

export { createSlider };
