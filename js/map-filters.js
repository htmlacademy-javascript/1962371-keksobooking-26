import { toggleForm } from './utils.js';

const FILTERS_DISABLED_CLASS_NAME = 'map__filters--disabled';
const filtersElement = document.querySelector('.map__filters');


export const toggleFiltersMap = (isActive) => {
  toggleForm(isActive, filtersElement, FILTERS_DISABLED_CLASS_NAME);
};
