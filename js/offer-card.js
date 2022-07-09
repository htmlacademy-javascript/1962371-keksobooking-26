import { getElementFiller, getWordAfterNum } from './utils.js';
import { offerType } from './const.js';


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const photoTemplate = cardTemplate.querySelector('.popup__photo');

export const generateCard = ({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const fillElement = getElementFiller(cardElement);
  // Заголовок объявления
  fillElement('.popup__title', offer.title);
  // Адресс объявления
  fillElement('.popup__text--address', offer.address);
  // Цена объявления
  fillElement('.popup__text--price', `${offer.price} ₽/ночь`);
  // Тип жилья
  fillElement('.popup__type', offerType[offer.type]);
  // Количество гостей и комнат
  const rooms = `${offer.rooms} ${getWordAfterNum(offer.rooms, ['комната','комнаты','комнат'])}`;
  const guests = `${offer.guests} ${getWordAfterNum(offer.guests, ['гостя','гостей'])}`;
  fillElement('.popup__text--capacity', `${rooms} для ${guests}`);
  // Время заезда и выезда
  fillElement('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  // Все доступные удобства в объявлении
  fillElement('.popup__features', offer.features, (feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);

    return featureElement;
  });
  // Описание объекта недвижимости
  fillElement('.popup__description', offer.description);
  // Фотографии объекта недвижимости
  fillElement('.popup__photos', offer.photos, (photo) => {
    const photoElement = photoTemplate.cloneNode();
    photoElement.src = photo;

    return photoElement;
  });
  // Аватарка пользователя
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};
