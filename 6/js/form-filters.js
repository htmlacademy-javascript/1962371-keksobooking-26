import { toggleForm } from './utils.js';

const FILTERS_DISABLED_CLASS_NAME = 'ad-form--disabled';
const filtersElement = document.querySelector('.ad-form');


export const toggleFilters = (isActive) => {
  toggleForm(isActive, filtersElement, FILTERS_DISABLED_CLASS_NAME);
};
