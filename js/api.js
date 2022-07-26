import { createPopup } from './popup.js';
import { displayMap } from './map.js';

const GET_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const POST_SERVER = 'https://26.javascript.pages.academy/keksobooking';

const getError = () => {
  createPopup('ERROR_GET');
  return [];
};

const postError = () => {
  createPopup('ERROR_POST');
};

const getDataServer = () => {
  fetch(GET_SERVER, {
    method: 'GET'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return getError();
    })
    .then((cards) => {
      displayMap(cards);
    })
    .catch(getError);
};

const postDataServer = (body, handleSuccess) =>
  fetch(POST_SERVER, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        handleSuccess();
        return createPopup('SUCCESS_POST');
      }
      return postError();
    })
    .catch(postError);

export { getDataServer, postDataServer };
