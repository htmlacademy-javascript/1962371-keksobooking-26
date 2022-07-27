import { toggleFormElement } from './ad-form.js';
import { toggleFiltersElement } from './map-filters.js';

//Чтобы закрывалось на нажатие клавиши Escape
const ESCAPE_KEY = 'Escape';
const isEscapeKeyPressed = (evt) => evt.key === ESCAPE_KEY;

const PopupMode = {
  SUCCESS_POST: 'SUCCESS_POST',
  ERROR_POST: 'ERROR_POST',
  ERROR_FETCH: 'ERROR_FETCH'
};

// Получаем шаблон попапа
const Template = {
  [PopupMode.SUCCESS_POST]: document.querySelector('#success').content.querySelector('.success'),
  [PopupMode.ERROR_POST]: document.querySelector('#error').content.querySelector('.error')
};
Template[PopupMode.ERROR_FETCH] = Template[PopupMode.ERROR_POST].cloneNode(true);
Template[PopupMode.ERROR_FETCH].querySelector('.error__message').textContent = 'Упс... Произошла ошибка получения объявлений';
Template[PopupMode.ERROR_FETCH].querySelector('.error__button').textContent = 'Добавить объявление';

const createPopup = (popupKey) => {
  const popupElement = Template[popupKey].cloneNode(true);

  toggleFormElement(false);
  toggleFiltersElement(false);
  document.body.append(popupElement);

  const closePopup = () => {
    popupElement.remove();
    document.removeEventListener('keydown', keyCloseHandler);
    toggleFormElement(true);
    toggleFiltersElement(true);
  };

  function keyCloseHandler(evt) {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  popupElement.addEventListener('click', () => closePopup());
  document.addEventListener('keydown', keyCloseHandler);
};

export { createPopup, PopupMode };
