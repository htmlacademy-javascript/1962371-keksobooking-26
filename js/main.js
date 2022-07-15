import { getRandomOffers } from './offers.js';
import { generateCard } from './offer-card.js';
import { toggleFormElement } from './ad-form.js';
import { toggleFiltersMap } from './map-filters.js';

const WAIT_TIME = 1000;
const OFFERS_COUNT = 1;

toggleFormElement();
toggleFiltersMap();

setTimeout(() => {
  getRandomOffers(OFFERS_COUNT).forEach((offer) => {
    document.querySelector('#map-canvas').append(generateCard(offer));
  });

  toggleFormElement(true);
  toggleFiltersMap(true);
}, WAIT_TIME);
