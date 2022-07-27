import { createPopup, PopupMode } from './popup.js';
import { displayMap } from './map.js';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
};

const GET_SERVER = 'https://26.javascript.pages.academy/keksobooking/data';
const POST_SERVER = 'https://26.javascript.pages.academy/keksobooking';

const getError = () => {
  createPopup(PopupMode.ERROR_FETCH);
  return [];
};

const postError = () => {
  createPopup(PopupMode.ERROR_POST);
};

const getDataServer = () => {
  fetch(GET_SERVER, {
    method: HttpMethod.GET,
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
    method: HttpMethod.POST,
    body
  })
    .then((response) => {
      if (response.ok) {
        handleSuccess();
        return createPopup(PopupMode.SUCCESS_POST);
      }
      return postError();
    })
    .catch(postError);

export { getDataServer, postDataServer };
