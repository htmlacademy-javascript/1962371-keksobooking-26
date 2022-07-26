import { toggleFormElement } from './ad-form.js';
import { toggleFiltersElement } from './map-filters.js';

//Чтобы закрывалось на нажатие клавиши Escape
const isEscapeKeyPressed = (evt) => evt.key === 'Escape';

// Получаем шаблон попапа
const Template = {
  SUCCESS_POST: document.querySelector('#success').content.querySelector('.success'),
  ERROR_POST: document.querySelector('#error').content.querySelector('.error')
};
Template.ERROR_GET = Template.ERROR_POST.cloneNode(true);
Template.ERROR_GET.querySelector('.error__message').textContent = 'Упс... Произошла ошибка получения объявлений';
Template.ERROR_GET.querySelector('.error__button').textContent = 'Добавить объявление';

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

export { createPopup };
