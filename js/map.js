import { toggleFormElement, addressElement } from './ad-form.js';
import { toggleFiltersElement, initFilters } from './map-filters.js';
import { setAddress } from './utils.js';
import { generateCard } from './offer-card.js';
import { DEFAULT_LOCATION, OFFERS_COUNT } from './const.js';

const ZOOM = 13;
const MAIN_PIN_SIZE = 52;
const PIN_SIZE = 40;
const PIN_RATIO = 0.5;

const map = L.map('map-canvas').on('load', () => {
  toggleFormElement(true);
  toggleFiltersElement(true);
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE * PIN_RATIO, MAIN_PIN_SIZE]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const mainPinMarker = L.marker(DEFAULT_LOCATION, {
  draggable: true,
  icon: mainPinIcon
});
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressElement.value = setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const resetMap = () => {
  mainPinMarker.setLatLng(DEFAULT_LOCATION);
  map.closePopup().setView(DEFAULT_LOCATION, ZOOM);
};

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE * PIN_RATIO, PIN_SIZE]
});

const createMarker = (point) => {
  const {
    offer: { title },
    location: { lat, lng }
  } = point;
  const marker = L.marker(
    {
      title,
      lat,
      lng
    },
    {
      pinIcon
    }
  );

  marker.addTo(markerGroup).bindPopup(generateCard(point));
};

const changeMarkers = (cards) => {
  markerGroup.clearLayers();
  cards.slice(0, OFFERS_COUNT).forEach(createMarker);
};

const displayMap = (cards) => {
  changeMarkers(cards);
  map.setView(DEFAULT_LOCATION, ZOOM);
  initFilters(cards, changeMarkers);
};

export { resetMap, displayMap };
