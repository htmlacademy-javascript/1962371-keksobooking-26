import { getDataServer } from './api.js';
import { toggleFormElement } from './ad-form.js';
import { toggleFiltersElement } from './map-filters.js';
toggleFormElement(false);
toggleFiltersElement(false);
getDataServer();
