import { getRandomOffers } from './offers.js';
import { generateCard } from './offer-card.js';

const OFFERS_COUNT = 10;
getRandomOffers(OFFERS_COUNT).forEach((offer) => {
  document.querySelector('#map-canvas').append(generateCard(offer));
});

