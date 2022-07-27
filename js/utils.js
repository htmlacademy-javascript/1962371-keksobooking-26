import { COORD_AMOUNT } from './const.js';

const PLURAL_THRESHOLD = 5;
const DEBOUNCE_TIMEOUT = 500;

//Создает функцию генерирующую DOM-узел, заполненный контентом
const getElementFiller = (template) => {
  const fillElement = (selector, data = '', createChildElement) => {
    const element = template.querySelector(selector);
    const content = data.toString();

    if (Array.isArray(data) && data.length) {
      if (typeof createChildElement === 'function') {
        element.innerHTML = '';
        data.forEach((item) => {
          element.append(createChildElement(item));
        });
      } else {
        element.textContent = data.join(', ');
      }
    } else if (content) {
      element.textContent = content;
    } else {
      element.remove();
    }
  };
  return fillElement;
};

// Выбор словоформы по значению числа
const getWordAfterNum = (num, [form1, form2 = form1, form3 = form2]) => {
  const lastDigit = num % 10;

  if ((num % 100) - lastDigit === 10 || lastDigit >= PLURAL_THRESHOLD) {
    return form3;
  }

  if (lastDigit === 1) {
    return form1;
  }

  return form2;
};

// Функция активации и деактивации
const toggleForm = (active, formElement, disabledClassName) => {
  const classMethod = active ? 'remove' : 'add';
  formElement.classList[classMethod](disabledClassName);

  formElement.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = !active;
  });
};

// Функция, для устранения дребезга
const debounce = (callback, timeoutDelay = DEBOUNCE_TIMEOUT) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const setAddress = ({ lat, lng }) => `${lat.toFixed(COORD_AMOUNT)} ${lng.toFixed(COORD_AMOUNT)}`;

export { getElementFiller, getWordAfterNum, toggleForm, debounce, setAddress };
