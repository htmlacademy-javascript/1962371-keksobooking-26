import { getRandomOffers } from './offers.js';
import { generateCard } from './offer-card.js';
import { toggleFilters } from './form-filters.js';
import { toggleFiltersMap } from './map-filters.js';

const OFFERS_COUNT = 1;
getRandomOffers(OFFERS_COUNT).forEach((offer) => {
  document.querySelector('#map-canvas').append(generateCard(offer));
});


toggleFilters();
toggleFiltersMap();
